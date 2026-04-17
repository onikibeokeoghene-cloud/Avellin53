import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface ViewHistoryItem {
  productId: string;
  category: string;
  slug: string;
  viewedAt: number;
}

interface ProductState {
  viewHistory: ViewHistoryItem[];
  addToViewHistory: (product: { id: string; category: string; slug: string }) => void;
  getRecommendedCategory: () => string | null;
  clearHistory: () => void;
}

export const useProductStore = create<ProductState>()(
  persist(
    (set, get) => ({
      viewHistory: [],
      
      addToViewHistory: (product) => {
        const history = get().viewHistory;
        const newItem: ViewHistoryItem = {
          productId: product.id,
          category: product.category,
          slug: product.slug,
          viewedAt: Date.now()
        };

        // Remove existing entry for same product to bring it to front
        const filteredHistory = history.filter(item => item.productId !== product.id);
        
        // Add new item to start and keep last 20
        const updatedHistory = [newItem, ...filteredHistory].slice(0, 20);
        
        set({ viewHistory: updatedHistory });
      },

      getRecommendedCategory: () => {
        const history = get().viewHistory;
        if (history.length === 0) return null;

        // Count frequencies of each category
        const counts: Record<string, number> = {};
        history.forEach(item => {
          counts[item.category] = (counts[item.category] || 0) + 1;
        });

        // Find category with max count
        let maxCount = 0;
        let recommendedCategory = null;

        for (const [category, count] of Object.entries(counts)) {
          if (count > maxCount) {
            maxCount = count;
            recommendedCategory = category;
          }
        }

        return recommendedCategory;
      },

      clearHistory: () => set({ viewHistory: [] })
    }),
    {
      name: 'avellin-product-storage',
    }
  )
);
