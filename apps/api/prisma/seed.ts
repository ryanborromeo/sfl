import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const ingredients = [
  { name: 'chicken breast', category: 'protein' },
  { name: 'salmon fillet', category: 'protein' },
  { name: 'ground beef', category: 'protein' },
  { name: 'eggs', category: 'protein' },
  { name: 'tofu', category: 'protein' },
  { name: 'shrimp', category: 'protein' },
  { name: 'bacon', category: 'protein' },
  { name: 'rice', category: 'pantry' },
  { name: 'pasta', category: 'pantry' },
  { name: 'bread', category: 'pantry' },
  { name: 'olive oil', category: 'pantry' },
  { name: 'soy sauce', category: 'pantry' },
  { name: 'flour', category: 'pantry' },
  { name: 'oats', category: 'pantry' },
  { name: 'honey', category: 'pantry' },
  { name: 'broccoli', category: 'produce' },
  { name: 'spinach', category: 'produce' },
  { name: 'tomatoes', category: 'produce' },
  { name: 'onion', category: 'produce' },
  { name: 'garlic', category: 'produce' },
  { name: 'bell pepper', category: 'produce' },
  { name: 'carrots', category: 'produce' },
  { name: 'avocado', category: 'produce' },
  { name: 'lemon', category: 'produce' },
  { name: 'banana', category: 'produce' },
  { name: 'berries', category: 'produce' },
  { name: 'milk', category: 'dairy' },
  { name: 'cheese', category: 'dairy' },
  { name: 'butter', category: 'dairy' },
  { name: 'greek yogurt', category: 'dairy' },
  { name: 'parmesan', category: 'dairy' },
  { name: 'salt', category: 'spices' },
  { name: 'black pepper', category: 'spices' },
  { name: 'paprika', category: 'spices' },
  { name: 'cumin', category: 'spices' },
  { name: 'oregano', category: 'spices' },
  { name: 'basil', category: 'spices' },
  { name: 'cinnamon', category: 'spices' },
];

const recipes = [
  {
    title: 'Grilled Chicken Salad',
    tags: 'high-protein,low-carb,healthy',
    cookTimeMins: 25,
    servings: 2,
    ingredients: [
      { name: 'chicken breast', quantity: 300, unit: 'g' },
      { name: 'spinach', quantity: 100, unit: 'g' },
      { name: 'tomatoes', quantity: 2, unit: 'pcs' },
      { name: 'olive oil', quantity: 2, unit: 'tbsp' },
      { name: 'lemon', quantity: 1, unit: 'pcs' },
      { name: 'salt', quantity: 1, unit: 'tsp' },
    ],
  },
  {
    title: 'Salmon with Vegetables',
    tags: 'high-protein,healthy,pescatarian',
    cookTimeMins: 30,
    servings: 2,
    ingredients: [
      { name: 'salmon fillet', quantity: 400, unit: 'g' },
      { name: 'broccoli', quantity: 200, unit: 'g' },
      { name: 'carrots', quantity: 150, unit: 'g' },
      { name: 'olive oil', quantity: 2, unit: 'tbsp' },
      { name: 'garlic', quantity: 3, unit: 'cloves' },
      { name: 'lemon', quantity: 1, unit: 'pcs' },
    ],
  },
  {
    title: 'Vegetable Stir Fry',
    tags: 'vegetarian,quick,healthy',
    cookTimeMins: 15,
    servings: 2,
    ingredients: [
      { name: 'tofu', quantity: 200, unit: 'g' },
      { name: 'broccoli', quantity: 150, unit: 'g' },
      { name: 'bell pepper', quantity: 2, unit: 'pcs' },
      { name: 'carrots', quantity: 100, unit: 'g' },
      { name: 'soy sauce', quantity: 3, unit: 'tbsp' },
      { name: 'garlic', quantity: 2, unit: 'cloves' },
    ],
  },
  {
    title: 'Classic Omelette',
    tags: 'breakfast,quick,vegetarian',
    cookTimeMins: 10,
    servings: 1,
    ingredients: [
      { name: 'eggs', quantity: 3, unit: 'pcs' },
      { name: 'cheese', quantity: 50, unit: 'g' },
      { name: 'butter', quantity: 1, unit: 'tbsp' },
      { name: 'salt', quantity: 0.5, unit: 'tsp' },
      { name: 'black pepper', quantity: 0.25, unit: 'tsp' },
    ],
  },
  {
    title: 'Beef Tacos',
    tags: 'high-protein,quick',
    cookTimeMins: 20,
    servings: 4,
    ingredients: [
      { name: 'ground beef', quantity: 500, unit: 'g' },
      { name: 'onion', quantity: 1, unit: 'pcs' },
      { name: 'tomatoes', quantity: 2, unit: 'pcs' },
      { name: 'cheese', quantity: 100, unit: 'g' },
      { name: 'cumin', quantity: 1, unit: 'tsp' },
      { name: 'paprika', quantity: 1, unit: 'tsp' },
    ],
  },
  {
    title: 'Pasta Primavera',
    tags: 'vegetarian,comfort',
    cookTimeMins: 25,
    servings: 4,
    ingredients: [
      { name: 'pasta', quantity: 400, unit: 'g' },
      { name: 'broccoli', quantity: 150, unit: 'g' },
      { name: 'bell pepper', quantity: 1, unit: 'pcs' },
      { name: 'tomatoes', quantity: 3, unit: 'pcs' },
      { name: 'parmesan', quantity: 50, unit: 'g' },
      { name: 'olive oil', quantity: 3, unit: 'tbsp' },
      { name: 'garlic', quantity: 3, unit: 'cloves' },
    ],
  },
  {
    title: 'Overnight Oats',
    tags: 'breakfast,vegetarian,meal-prep',
    cookTimeMins: 5,
    servings: 1,
    ingredients: [
      { name: 'oats', quantity: 50, unit: 'g' },
      { name: 'milk', quantity: 150, unit: 'ml' },
      { name: 'greek yogurt', quantity: 100, unit: 'g' },
      { name: 'honey', quantity: 1, unit: 'tbsp' },
      { name: 'berries', quantity: 50, unit: 'g' },
      { name: 'banana', quantity: 1, unit: 'pcs' },
    ],
  },
  {
    title: 'Garlic Shrimp',
    tags: 'high-protein,quick,pescatarian',
    cookTimeMins: 15,
    servings: 2,
    ingredients: [
      { name: 'shrimp', quantity: 400, unit: 'g' },
      { name: 'garlic', quantity: 5, unit: 'cloves' },
      { name: 'butter', quantity: 3, unit: 'tbsp' },
      { name: 'lemon', quantity: 1, unit: 'pcs' },
      { name: 'parsley', quantity: 2, unit: 'tbsp' },
    ],
  },
  {
    title: 'Avocado Toast',
    tags: 'breakfast,vegetarian,quick',
    cookTimeMins: 10,
    servings: 2,
    ingredients: [
      { name: 'bread', quantity: 4, unit: 'slices' },
      { name: 'avocado', quantity: 2, unit: 'pcs' },
      { name: 'eggs', quantity: 2, unit: 'pcs' },
      { name: 'salt', quantity: 0.5, unit: 'tsp' },
      { name: 'black pepper', quantity: 0.25, unit: 'tsp' },
      { name: 'lemon', quantity: 0.5, unit: 'pcs' },
    ],
  },
  {
    title: 'Chicken Fried Rice',
    tags: 'high-protein,comfort,quick',
    cookTimeMins: 20,
    servings: 4,
    ingredients: [
      { name: 'chicken breast', quantity: 300, unit: 'g' },
      { name: 'rice', quantity: 300, unit: 'g' },
      { name: 'eggs', quantity: 2, unit: 'pcs' },
      { name: 'carrots', quantity: 100, unit: 'g' },
      { name: 'soy sauce', quantity: 3, unit: 'tbsp' },
      { name: 'onion', quantity: 1, unit: 'pcs' },
    ],
  },
  {
    title: 'Greek Yogurt Parfait',
    tags: 'breakfast,vegetarian,healthy',
    cookTimeMins: 5,
    servings: 1,
    ingredients: [
      { name: 'greek yogurt', quantity: 200, unit: 'g' },
      { name: 'berries', quantity: 100, unit: 'g' },
      { name: 'honey', quantity: 2, unit: 'tbsp' },
      { name: 'oats', quantity: 30, unit: 'g' },
    ],
  },
  {
    title: 'Spinach Scramble',
    tags: 'breakfast,vegetarian,quick,healthy',
    cookTimeMins: 10,
    servings: 2,
    ingredients: [
      { name: 'eggs', quantity: 4, unit: 'pcs' },
      { name: 'spinach', quantity: 100, unit: 'g' },
      { name: 'cheese', quantity: 50, unit: 'g' },
      { name: 'butter', quantity: 1, unit: 'tbsp' },
      { name: 'salt', quantity: 0.5, unit: 'tsp' },
    ],
  },
  {
    title: 'Teriyaki Salmon Bowl',
    tags: 'high-protein,healthy,pescatarian',
    cookTimeMins: 25,
    servings: 2,
    ingredients: [
      { name: 'salmon fillet', quantity: 300, unit: 'g' },
      { name: 'rice', quantity: 200, unit: 'g' },
      { name: 'broccoli', quantity: 150, unit: 'g' },
      { name: 'soy sauce', quantity: 3, unit: 'tbsp' },
      { name: 'honey', quantity: 2, unit: 'tbsp' },
      { name: 'garlic', quantity: 2, unit: 'cloves' },
    ],
  },
  {
    title: 'Veggie Wrap',
    tags: 'vegetarian,quick,healthy',
    cookTimeMins: 10,
    servings: 2,
    ingredients: [
      { name: 'bread', quantity: 2, unit: 'pcs' },
      { name: 'avocado', quantity: 1, unit: 'pcs' },
      { name: 'spinach', quantity: 50, unit: 'g' },
      { name: 'tomatoes', quantity: 1, unit: 'pcs' },
      { name: 'cheese', quantity: 50, unit: 'g' },
    ],
  },
  {
    title: 'Bacon and Eggs',
    tags: 'breakfast,high-protein,quick',
    cookTimeMins: 15,
    servings: 2,
    ingredients: [
      { name: 'bacon', quantity: 6, unit: 'strips' },
      { name: 'eggs', quantity: 4, unit: 'pcs' },
      { name: 'butter', quantity: 1, unit: 'tbsp' },
      { name: 'salt', quantity: 0.5, unit: 'tsp' },
      { name: 'black pepper', quantity: 0.25, unit: 'tsp' },
    ],
  },
  {
    title: 'Tofu Buddha Bowl',
    tags: 'vegetarian,healthy,high-protein',
    cookTimeMins: 30,
    servings: 2,
    ingredients: [
      { name: 'tofu', quantity: 300, unit: 'g' },
      { name: 'rice', quantity: 200, unit: 'g' },
      { name: 'avocado', quantity: 1, unit: 'pcs' },
      { name: 'carrots', quantity: 100, unit: 'g' },
      { name: 'spinach', quantity: 100, unit: 'g' },
      { name: 'soy sauce', quantity: 2, unit: 'tbsp' },
    ],
  },
  {
    title: 'Cheesy Pasta Bake',
    tags: 'vegetarian,comfort',
    cookTimeMins: 35,
    servings: 4,
    ingredients: [
      { name: 'pasta', quantity: 400, unit: 'g' },
      { name: 'cheese', quantity: 200, unit: 'g' },
      { name: 'milk', quantity: 200, unit: 'ml' },
      { name: 'butter', quantity: 2, unit: 'tbsp' },
      { name: 'flour', quantity: 2, unit: 'tbsp' },
      { name: 'salt', quantity: 1, unit: 'tsp' },
    ],
  },
  {
    title: 'Grilled Chicken Wrap',
    tags: 'high-protein,quick,healthy',
    cookTimeMins: 20,
    servings: 2,
    ingredients: [
      { name: 'chicken breast', quantity: 250, unit: 'g' },
      { name: 'bread', quantity: 2, unit: 'pcs' },
      { name: 'spinach', quantity: 50, unit: 'g' },
      { name: 'tomatoes', quantity: 1, unit: 'pcs' },
      { name: 'cheese', quantity: 50, unit: 'g' },
      { name: 'olive oil', quantity: 1, unit: 'tbsp' },
    ],
  },
  {
    title: 'Banana Pancakes',
    tags: 'breakfast,vegetarian',
    cookTimeMins: 20,
    servings: 2,
    ingredients: [
      { name: 'banana', quantity: 2, unit: 'pcs' },
      { name: 'eggs', quantity: 2, unit: 'pcs' },
      { name: 'flour', quantity: 100, unit: 'g' },
      { name: 'milk', quantity: 100, unit: 'ml' },
      { name: 'honey', quantity: 2, unit: 'tbsp' },
      { name: 'butter', quantity: 1, unit: 'tbsp' },
    ],
  },
  {
    title: 'Beef Stir Fry',
    tags: 'high-protein,quick',
    cookTimeMins: 20,
    servings: 4,
    ingredients: [
      { name: 'ground beef', quantity: 400, unit: 'g' },
      { name: 'broccoli', quantity: 200, unit: 'g' },
      { name: 'bell pepper', quantity: 2, unit: 'pcs' },
      { name: 'soy sauce', quantity: 3, unit: 'tbsp' },
      { name: 'garlic', quantity: 3, unit: 'cloves' },
      { name: 'onion', quantity: 1, unit: 'pcs' },
    ],
  },
];

async function main() {
  console.log('Seeding database...');

  // Create ingredients
  const ingredientMap = new Map<string, string>();
  for (const ing of ingredients) {
    const created = await prisma.ingredient.upsert({
      where: { name: ing.name },
      update: {},
      create: ing,
    });
    ingredientMap.set(ing.name, created.id);
  }
  console.log(`Created ${ingredients.length} ingredients`);

  // Create recipes with ingredients
  for (const recipe of recipes) {
    const createdRecipe = await prisma.recipe.create({
      data: {
        title: recipe.title,
        tags: recipe.tags,
        cookTimeMins: recipe.cookTimeMins,
        servings: recipe.servings,
      },
    });

    for (const ing of recipe.ingredients) {
      const ingredientId = ingredientMap.get(ing.name);
      if (ingredientId) {
        await prisma.recipeIngredient.create({
          data: {
            recipeId: createdRecipe.id,
            ingredientId,
            quantity: ing.quantity,
            unit: ing.unit,
          },
        });
      }
    }
  }
  console.log(`Created ${recipes.length} recipes`);

  console.log('Seeding complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
