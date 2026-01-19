'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { getGroceryList, GroceryList, GroceryItem } from '@/lib/api';
import { 
  ArrowLeft, 
  Check, 
  Loader2, 
  Search,
  ShoppingCart,
  Apple,
  Beef,
  Milk,
  Package,
  Sparkles
} from 'lucide-react';

const CATEGORY_CONFIG: Record<string, { label: string; icon: React.ReactNode; color: string }> = {
  produce: { label: 'Produce', icon: <Apple className="w-5 h-5" />, color: 'bg-green-500' },
  protein: { label: 'Proteins', icon: <Beef className="w-5 h-5" />, color: 'bg-red-500' },
  dairy: { label: 'Dairy', icon: <Milk className="w-5 h-5" />, color: 'bg-blue-500' },
  pantry: { label: 'Pantry', icon: <Package className="w-5 h-5" />, color: 'bg-amber-500' },
  spices: { label: 'Spices', icon: <Sparkles className="w-5 h-5" />, color: 'bg-purple-500' },
  other: { label: 'Other', icon: <ShoppingCart className="w-5 h-5" />, color: 'bg-gray-500' },
};

const CATEGORY_ORDER = ['produce', 'protein', 'dairy', 'pantry', 'spices', 'other'];

export default function GroceryPage() {
  const params = useParams();
  const shareCode = params.shareCode as string;

  const [groceryList, setGroceryList] = useState<GroceryList | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function fetchGroceryList() {
      try {
        const data = await getGroceryList(shareCode);
        setGroceryList(data);
        
        // Load checked items from localStorage
        const stored = localStorage.getItem(`grocery-${shareCode}`);
        if (stored) {
          setCheckedItems(new Set(JSON.parse(stored)));
        }
      } catch (err) {
        setError('Failed to load grocery list');
      } finally {
        setLoading(false);
      }
    }
    fetchGroceryList();
  }, [shareCode]);

  const toggleItem = (itemId: string) => {
    setCheckedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      // Save to localStorage
      localStorage.setItem(`grocery-${shareCode}`, JSON.stringify([...newSet]));
      return newSet;
    });
  };

  const formatQuantity = (item: GroceryItem) => {
    return item.quantities
      .map((q) => `${Math.round(q.quantity * 10) / 10} ${q.unit}`)
      .join(' + ');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
      </div>
    );
  }

  if (error || !groceryList) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">{error || 'Grocery list not found'}</p>
          <Link href="/" className="text-emerald-500 hover:underline">
            Create a new plan
          </Link>
        </div>
      </div>
    );
  }

  // Calculate totals
  const allItems = Object.values(groceryList.categories).flat();
  const totalItems = allItems.length;
  const checkedCount = allItems.filter((item) => checkedItems.has(item.id)).length;
  const progress = totalItems > 0 ? (checkedCount / totalItems) * 100 : 0;

  // Filter items by search
  const filterItems = (items: GroceryItem[]) => {
    if (!searchQuery) return items;
    return items.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 pb-24">
      <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm shadow-sm">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <Link
              href={`/plan/${shareCode}`}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden sm:inline">Back to Plan</span>
            </Link>
            <div className="text-right">
              <span className="text-2xl font-bold text-emerald-600">{checkedCount}</span>
              <span className="text-gray-500">/{totalItems}</span>
            </div>
          </div>

          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search items..."
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
            />
          </div>

          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {CATEGORY_ORDER.map((category) => {
          const items = filterItems(groceryList.categories[category] || []);
          if (items.length === 0) return null;

          const config = CATEGORY_CONFIG[category];

          return (
            <div key={category} className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className={`${config.color} px-4 py-3 flex items-center gap-3`}>
                <div className="text-white">{config.icon}</div>
                <h2 className="text-white font-semibold">{config.label}</h2>
                <span className="ml-auto text-white/80 text-sm">
                  {items.filter((i) => checkedItems.has(i.id)).length}/{items.length}
                </span>
              </div>
              <div className="divide-y divide-gray-100">
                {items.map((item) => {
                  const isChecked = checkedItems.has(item.id);
                  return (
                    <button
                      key={item.id}
                      onClick={() => toggleItem(item.id)}
                      className={`w-full flex items-center gap-4 p-4 text-left transition-all ${
                        isChecked ? 'bg-gray-50' : 'hover:bg-gray-50'
                      }`}
                    >
                      <div
                        className={`flex-shrink-0 w-7 h-7 rounded-lg border-2 flex items-center justify-center transition-all ${
                          isChecked
                            ? 'bg-emerald-500 border-emerald-500'
                            : 'border-gray-300'
                        }`}
                      >
                        {isChecked && <Check className="w-4 h-4 text-white" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p
                          className={`font-medium transition-all ${
                            isChecked ? 'text-gray-400 line-through' : 'text-gray-900'
                          }`}
                        >
                          {item.name}
                        </p>
                        <p className="text-sm text-gray-500">{formatQuantity(item)}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {checkedCount === totalItems && totalItems > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 px-6 py-3 bg-emerald-500 text-white font-semibold rounded-full shadow-lg shadow-emerald-200 animate-bounce">
          🎉 All done! Happy cooking!
        </div>
      )}
    </main>
  );
}
