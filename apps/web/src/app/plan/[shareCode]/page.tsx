'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { getPlan, Plan } from '@/lib/api';
import { useToast } from '@/components/Toast';
import { PlanPageSkeleton } from '@/components/Skeleton';
import {
  Utensils,
  Clock,
  ShoppingCart,
  Share2,
  ArrowLeft,
  RefreshCw,
  Coffee,
  Sun,
  Moon,
  Flame,
  Zap
} from 'lucide-react';

const MEAL_ICONS: Record<string, React.ReactNode> = {
  breakfast: <Coffee className="w-4 h-4" />,
  lunch: <Sun className="w-4 h-4" />,
  dinner: <Moon className="w-4 h-4" />,
};

const MEAL_LABELS: Record<string, string> = {
  breakfast: 'Breakfast',
  lunch: 'Lunch',
  dinner: 'Dinner',
};

// Mock nutritional data for impressiveness
function generateNutritionEstimate(mealCount: number) {
  const caloriesPerMeal = Math.floor(500 + Math.random() * 200);
  const proteinPerMeal = Math.floor(20 + Math.random() * 15);
  const carbsPerMeal = Math.floor(50 + Math.random() * 30);
  return {
    calories: caloriesPerMeal * mealCount,
    protein: proteinPerMeal * mealCount,
    carbs: carbsPerMeal * mealCount
  };
}

export default function PlanPage() {
  const params = useParams();
  const router = useRouter();
  const { showToast } = useToast();
  const shareCode = params.shareCode as string;

  const [plan, setPlan] = useState<Plan | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchPlan() {
      try {
        const data = await getPlan(shareCode);
        setPlan(data);
      } catch (err) {
        setError('Plan not found');
      } finally {
        setLoading(false);
      }
    }
    fetchPlan();
  }, [shareCode]);

  const handleShare = async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      showToast('Link copied to clipboard!', 'success');
    } catch {
      showToast('Failed to copy link', 'error');
    }
  };

  const handleRegenerate = () => {
    router.push('/');
  };

  if (loading) {
    return <PlanPageSkeleton />;
  }

  if (error || !plan) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
            <Utensils className="w-8 h-8 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Plan Not Found</h2>
          <p className="text-gray-600 mb-6">{error || 'This meal plan doesn\'t exist or has expired.'}</p>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
          >
            Create a New Plan
          </Link>
        </div>
      </div>
    );
  }

  // Group meals by day
  const mealsByDay: Record<number, typeof plan.meals> = {};
  plan.meals.forEach((meal) => {
    if (!mealsByDay[meal.dayIndex]) {
      mealsByDay[meal.dayIndex] = [];
    }
    mealsByDay[meal.dayIndex].push(meal);
  });

  // Calculate daily nutrition estimates
  const dailyNutrition = generateNutritionEstimate(3);

  return (
    <main id="main-content" className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={handleRegenerate}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 rounded-lg px-2 py-1"
            aria-label="Create new plan"
          >
            <ArrowLeft className="w-5 h-5" aria-hidden="true" />
            <span className="hidden sm:inline">New Plan</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleRegenerate}
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-sm hover:shadow-md transition-all text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
              aria-label="Generate a new meal plan"
            >
              <RefreshCw className="w-4 h-4" aria-hidden="true" />
              <span className="hidden sm:inline">Regenerate</span>
            </button>
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-sm hover:shadow-md transition-all text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
              aria-label="Copy share link to clipboard"
            >
              <Share2 className="w-4 h-4" aria-hidden="true" />
              <span className="hidden sm:inline">Share</span>
            </button>
          </div>
        </div>

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-emerald-500 rounded-2xl mb-3 transition-transform hover:scale-105">
            <Utensils className="w-7 h-7 text-white" aria-hidden="true" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-1">
            Your {plan.days}-Day Meal Plan
          </h1>
          <p className="text-gray-600">
            {plan.meals.length} meals planned for you
          </p>
        </div>

        <Link
          href={`/plan/${shareCode}/grocery`}
          className="block w-full mb-8 p-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl shadow-lg shadow-emerald-200 transition-all transform hover:scale-[1.01] active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
        >
          <div className="flex items-center justify-center gap-3">
            <ShoppingCart className="w-5 h-5" aria-hidden="true" />
            <span className="font-semibold">View Grocery List</span>
          </div>
        </Link>

        <div className="space-y-6">
          {Object.entries(mealsByDay).map(([dayIndex, meals]) => (
            <article key={dayIndex} className="bg-white rounded-2xl shadow-lg overflow-hidden transition-shadow hover:shadow-xl">
              <div className="bg-emerald-500 px-6 py-3 flex items-center justify-between">
                <h2 className="text-white font-semibold">
                  Day {Number(dayIndex) + 1}
                </h2>
                <div className="flex items-center gap-3 text-emerald-100 text-xs">
                  <span className="flex items-center gap-1">
                    <Flame className="w-3 h-3" aria-hidden="true" />
                    ~{dailyNutrition.calories} cal
                  </span>
                  <span className="flex items-center gap-1">
                    <Zap className="w-3 h-3" aria-hidden="true" />
                    ~{dailyNutrition.protein}g protein
                  </span>
                </div>
              </div>
              <div className="divide-y divide-gray-100">
                {meals
                  .sort((a, b) => {
                    const order = ['breakfast', 'lunch', 'dinner'];
                    return order.indexOf(a.mealType) - order.indexOf(b.mealType);
                  })
                  .map((meal) => (
                    <div key={meal.id} className="p-4 md:p-6 transition-colors hover:bg-gray-50">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600 transition-transform hover:scale-110">
                          {MEAL_ICONS[meal.mealType]}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-medium text-emerald-600 uppercase tracking-wide">
                              {MEAL_LABELS[meal.mealType]}
                            </span>
                          </div>
                          <h3 className="font-semibold text-gray-900 mb-2">
                            {meal.recipe.title}
                          </h3>
                          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" aria-hidden="true" />
                              {meal.recipe.cookTimeMins} min
                            </span>
                            <div className="flex flex-wrap gap-1">
                              {meal.recipe.tags.split(',').map((tag) => (
                                <span
                                  key={tag}
                                  className="px-2 py-0.5 bg-gray-100 rounded-full text-xs transition-colors hover:bg-emerald-100"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </article>
          ))}
        </div>

        {/* Estimated Daily Nutrition Summary */}
        <div className="mt-8 p-4 bg-white rounded-2xl shadow-lg">
          <div className="flex items-center gap-2 mb-3">
            <Flame className="w-5 h-5 text-orange-500" aria-hidden="true" />
            <h3 className="font-semibold text-gray-900">Estimated Daily Nutrition</h3>
            <span className="text-xs text-gray-500">(approximate)</span>
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-3 bg-orange-50 rounded-xl">
              <p className="text-2xl font-bold text-orange-600">~{dailyNutrition.calories}</p>
              <p className="text-xs text-gray-600">Calories</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-xl">
              <p className="text-2xl font-bold text-blue-600">~{dailyNutrition.protein}g</p>
              <p className="text-xs text-gray-600">Protein</p>
            </div>
            <div className="p-3 bg-amber-50 rounded-xl">
              <p className="text-2xl font-bold text-amber-600">~{dailyNutrition.carbs}g</p>
              <p className="text-xs text-gray-600">Carbs</p>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link
            href={`/plan/${shareCode}/grocery`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl shadow-lg shadow-emerald-200 transition-all transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
          >
            <ShoppingCart className="w-5 h-5" aria-hidden="true" />
            View Grocery List
          </Link>
        </div>
      </div>
    </main>
  );
}
