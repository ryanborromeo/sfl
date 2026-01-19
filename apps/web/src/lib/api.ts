const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export interface Recipe {
  id: string;
  title: string;
  tags: string;
  cookTimeMins: number;
  servings: number;
  ingredients: {
    id: string;
    quantity: number;
    unit: string;
    ingredient: {
      id: string;
      name: string;
      category: string;
    };
  }[];
}

export interface PlanMeal {
  id: string;
  dayIndex: number;
  mealType: string;
  recipe: Recipe;
}

export interface Plan {
  id: string;
  shareCode: string;
  days: number;
  constraints: string;
  meals: PlanMeal[];
  createdAt: string;
}

export interface GroceryItem {
  id: string;
  name: string;
  category: string;
  quantities: { quantity: number; unit: string }[];
}

export interface GroceryList {
  planId: string;
  shareCode: string;
  categories: Record<string, GroceryItem[]>;
}

export async function generatePlan(params: {
  days: number;
  tagsInclude?: string[];
  tagsExclude?: string[];
  excludeIngredients?: string[];
  maxCookTimeMins?: number;
}): Promise<{ shareCode: string }> {
  const res = await fetch(`${API_URL}/plans/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });
  if (!res.ok) throw new Error('Failed to generate plan');
  return res.json();
}

export async function getPlan(shareCode: string): Promise<Plan> {
  const res = await fetch(`${API_URL}/plans/${shareCode}`);
  if (!res.ok) throw new Error('Plan not found');
  return res.json();
}

export async function getGroceryList(shareCode: string): Promise<GroceryList> {
  const res = await fetch(`${API_URL}/plans/${shareCode}/grocery-list`);
  if (!res.ok) throw new Error('Failed to fetch grocery list');
  return res.json();
}
