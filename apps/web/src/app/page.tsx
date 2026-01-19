'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { generatePlan } from '@/lib/api';
import { Utensils, Clock, Leaf, Loader2 } from 'lucide-react';

const DIET_TAGS = [
  { id: 'vegetarian', label: 'Vegetarian', icon: '🥬' },
  { id: 'high-protein', label: 'High Protein', icon: '💪' },
  { id: 'healthy', label: 'Healthy', icon: '🥗' },
  { id: 'quick', label: 'Quick Meals', icon: '⚡' },
  { id: 'comfort', label: 'Comfort Food', icon: '🍝' },
];

const DAYS_OPTIONS = [3, 5, 7];

export default function HomePage() {
  const router = useRouter();
  const [days, setDays] = useState(5);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [excludeIngredients, setExcludeIngredients] = useState('');
  const [maxCookTime, setMaxCookTime] = useState(60);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const toggleTag = (tagId: string) => {
    setSelectedTags((prev) =>
      prev.includes(tagId) ? prev.filter((t) => t !== tagId) : [...prev, tagId]
    );
  };

  const handleGenerate = async () => {
    setLoading(true);
    setError('');
    try {
      const result = await generatePlan({
        days,
        tagsInclude: selectedTags.length > 0 ? selectedTags : undefined,
        excludeIngredients: excludeIngredients
          ? excludeIngredients.split(',').map((s) => s.trim())
          : undefined,
        maxCookTimeMins: maxCookTime < 60 ? maxCookTime : undefined,
      });
      router.push(`/plan/${result.shareCode}`);
    } catch (err) {
      setError('Failed to generate plan. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-500 rounded-2xl mb-4">
            <Utensils className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">MealPlan Pro</h1>
          <p className="text-gray-600">
            Generate personalized meal plans with smart grocery lists
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 space-y-8">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              How many days?
            </label>
            <div className="flex gap-3">
              {DAYS_OPTIONS.map((d) => (
                <button
                  key={d}
                  onClick={() => setDays(d)}
                  className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${
                    days === d
                      ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-200'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {d} Days
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Dietary preferences
            </label>
            <div className="flex flex-wrap gap-2">
              {DIET_TAGS.map((tag) => (
                <button
                  key={tag.id}
                  onClick={() => toggleTag(tag.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedTags.includes(tag.id)
                      ? 'bg-emerald-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {tag.icon} {tag.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              <Clock className="w-4 h-4 inline mr-1" />
              Max cooking time: {maxCookTime === 60 ? 'Any' : `${maxCookTime} min`}
            </label>
            <input
              type="range"
              min="10"
              max="60"
              step="5"
              value={maxCookTime}
              onChange={(e) => setMaxCookTime(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>10 min</span>
              <span>Any</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              <Leaf className="w-4 h-4 inline mr-1" />
              Exclude ingredients (comma-separated)
            </label>
            <input
              type="text"
              value={excludeIngredients}
              onChange={(e) => setExcludeIngredients(e.target.value)}
              placeholder="e.g., peanuts, shellfish, dairy"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
            />
          </div>

          {error && (
            <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm">
              {error}
            </div>
          )}

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl shadow-lg shadow-emerald-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Generating...
              </>
            ) : (
              'Generate My Meal Plan'
            )}
          </button>
        </div>

        <p className="text-center text-gray-500 text-sm mt-6">
          Plans include breakfast, lunch, and dinner for each day
        </p>
      </div>
    </main>
  );
}
