import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RecipesService {
  constructor(private prisma: PrismaService) {}

  async findAll(filters?: {
    tags?: string[];
    maxCookTimeMins?: number;
    excludeIngredients?: string[];
  }) {
    const where: any = {};

    if (filters?.maxCookTimeMins) {
      where.cookTimeMins = { lte: filters.maxCookTimeMins };
    }

    let recipes = await this.prisma.recipe.findMany({
      where,
      include: {
        ingredients: {
          include: {
            ingredient: true,
          },
        },
      },
    });

    // Filter by tags (recipe.tags is a comma-separated string)
    if (filters?.tags && filters.tags.length > 0) {
      recipes = recipes.filter((recipe) => {
        const recipeTags = recipe.tags.split(',');
        return filters.tags!.some((tag) => recipeTags.includes(tag));
      });
    }

    // Exclude recipes containing certain ingredients
    if (filters?.excludeIngredients && filters.excludeIngredients.length > 0) {
      const excludeLower = filters.excludeIngredients.map((i) => i.toLowerCase());
      recipes = recipes.filter((recipe) => {
        const ingredientNames = recipe.ingredients.map((ri) =>
          ri.ingredient.name.toLowerCase()
        );
        return !ingredientNames.some((name) =>
          excludeLower.some((exc) => name.includes(exc))
        );
      });
    }

    return recipes;
  }

  async findOne(id: string) {
    return this.prisma.recipe.findUnique({
      where: { id },
      include: {
        ingredients: {
          include: {
            ingredient: true,
          },
        },
      },
    });
  }
}
