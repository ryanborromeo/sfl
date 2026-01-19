import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RecipesService } from '../recipes/recipes.service';
import { nanoid } from 'nanoid';

interface GeneratePlanDto {
  days: number;
  tagsInclude?: string[];
  tagsExclude?: string[];
  excludeIngredients?: string[];
  maxCookTimeMins?: number;
}

@Injectable()
export class PlansService {
  constructor(
    private prisma: PrismaService,
    private recipesService: RecipesService,
  ) {}

  async generate(dto: GeneratePlanDto) {
    // Get filtered recipes
    let recipes = await this.recipesService.findAll({
      tags: dto.tagsInclude,
      maxCookTimeMins: dto.maxCookTimeMins,
      excludeIngredients: dto.excludeIngredients,
    });

    // Exclude recipes with excluded tags
    if (dto.tagsExclude && dto.tagsExclude.length > 0) {
      recipes = recipes.filter((recipe) => {
        const recipeTags = recipe.tags.split(',');
        return !dto.tagsExclude!.some((tag) => recipeTags.includes(tag));
      });
    }

    // Shuffle recipes for variety
    const shuffled = [...recipes].sort(() => Math.random() - 0.5);

    // Calculate total meals needed
    const mealsPerDay = 3;
    const totalMeals = dto.days * mealsPerDay;

    // Select recipes without repetition (cycle if not enough)
    const selectedRecipes: typeof recipes = [];
    for (let i = 0; i < totalMeals; i++) {
      selectedRecipes.push(shuffled[i % shuffled.length]);
    }

    // Create plan with unique share code
    const shareCode = nanoid(8);

    const plan = await this.prisma.plan.create({
      data: {
        shareCode,
        days: dto.days,
        constraints: JSON.stringify(dto),
        meals: {
          create: selectedRecipes.map((recipe, index) => ({
            dayIndex: Math.floor(index / mealsPerDay),
            mealType: ['breakfast', 'lunch', 'dinner'][index % mealsPerDay],
            recipeId: recipe.id,
          })),
        },
      },
    });

    return { shareCode: plan.shareCode };
  }

  async findByShareCode(shareCode: string) {
    const plan = await this.prisma.plan.findUnique({
      where: { shareCode },
      include: {
        meals: {
          include: {
            recipe: {
              include: {
                ingredients: {
                  include: {
                    ingredient: true,
                  },
                },
              },
            },
          },
          orderBy: [{ dayIndex: 'asc' }, { mealType: 'asc' }],
        },
      },
    });

    if (!plan) {
      throw new NotFoundException('Plan not found');
    }

    return plan;
  }

  async getGroceryList(shareCode: string) {
    const plan = await this.findByShareCode(shareCode);

    // Aggregate ingredients
    const ingredientMap = new Map<
      string,
      {
        id: string;
        name: string;
        category: string;
        quantities: { quantity: number; unit: string }[];
      }
    >();

    for (const meal of plan.meals) {
      for (const ri of meal.recipe.ingredients) {
        const existing = ingredientMap.get(ri.ingredient.id);
        if (existing) {
          // Check if same unit exists
          const sameUnit = existing.quantities.find((q) => q.unit === ri.unit);
          if (sameUnit) {
            sameUnit.quantity += ri.quantity;
          } else {
            existing.quantities.push({ quantity: ri.quantity, unit: ri.unit });
          }
        } else {
          ingredientMap.set(ri.ingredient.id, {
            id: ri.ingredient.id,
            name: ri.ingredient.name,
            category: ri.ingredient.category,
            quantities: [{ quantity: ri.quantity, unit: ri.unit }],
          });
        }
      }
    }

    // Group by category
    const categories = ['produce', 'protein', 'dairy', 'pantry', 'spices', 'other'];
    const grouped: Record<string, typeof ingredientMap extends Map<string, infer V> ? V[] : never> = {};

    for (const cat of categories) {
      grouped[cat] = [];
    }

    for (const item of ingredientMap.values()) {
      const cat = categories.includes(item.category) ? item.category : 'other';
      grouped[cat].push(item);
    }

    // Sort items within each category
    for (const cat of categories) {
      grouped[cat].sort((a, b) => a.name.localeCompare(b.name));
    }

    return { planId: plan.id, shareCode, categories: grouped };
  }
}
