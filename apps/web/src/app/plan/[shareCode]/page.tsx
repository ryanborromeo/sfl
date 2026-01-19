'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { getPlan, Plan } from '@/lib/api';
import { 
  Utensils, 
  Clock, 
  ShoppingCart, 
  Share2, 
  ArrowLeft,
  Loader2,
  Coffee,
  Sun,
  Moon
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

export default function PlanPage() {
  const params = useParams();
  const router = useRouter();
  const shareCode = params.shareCode as string;

  const [plan, setPlan] = useState<Plan | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

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
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
      </div>
    );
  }

  if (error || !plan) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">{error || 'Plan not found'}</p>
          <Link href="/" className="text-emerald-500 hover:underline">
            Create a new plan
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

  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => router.push('/')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="hidden sm:inline">New Plan</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-sm hover:shadow-md transition-all text-gray-700"
            >
              <Share2 className="w-4 h-4" />
              {copied ? 'Copied!' : 'Share'}
            </button>
          </div>
        </div>

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-emerald-500 rounded-2xl mb-3">
            <Utensils className="w-7 h-7 text-white" />
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
          className="block w-full mb-8 p-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl shadow-lg shadow-emerald-200 transition-all"
        >
          <div className="flex items-center justify-center gap-3">
            <ShoppingCart className="w-5 h-5" />
            <span className="font-semibold">View Grocery List</span>
          </div>
        </Link>

        <div className="space-y-6">
          {Object.entries(mealsByDay).map(([dayIndex, meals]) => (
            <div key={dayIndex} className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-emerald-500 px-6 py-3">
                <h2 className="text-white font-semibold">
                  Day {Number(dayIndex) + 1}
                </h2>
              </div>
              <div className="divide-y divide-gray-100">
                {meals
                  .sort((a, b) => {
                    const order = ['breakfast', 'lunch', 'dinner'];
                    return order.indexOf(a.mealType) - order.indexOf(b.mealType);
                  })
                  .map((meal) => (
                    <div key={meal.id} className="p-4 md:p-6">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600">
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
                              <Clock className="w-4 h-4" />
                              {meal.recipe.cookTimeMins} min
                            </span>
                            <div className="flex flex-wrap gap-1">
                              {meal.recipe.tags.split(',').map((tag) => (
                                <span
                                  key={tag}
                                  className="px-2 py-0.5 bg-gray-100 rounded-full text-xs"
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
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href={`/plan/${shareCode}/grocery`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl shadow-lg shadow-emerald-200 transition-all"
          >
            <ShoppingCart className="w-5 h-5" />
            View Grocery List
          </Link>
        </div>
      </div>
    </main>
  );
}
