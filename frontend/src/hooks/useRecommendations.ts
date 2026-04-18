import { useState, useEffect } from 'react';
import { useProductStore } from '../store/useProductStore';

interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  price: number;
  compare_at_price?: number;
  image: string;
  rating: number;
  reviewsCount: number;
  stock_quantity: number;
  is_new_arrival?: boolean;
is_featured?: boolean;
}

export const useRecommendations = (currentProductId?: string, category?: string) => {
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const getRecommendedCategory = useProductStore(state => state.getRecommendedCategory);

  useEffect(() => {
    const fetchRecommendations = async () => {
      setLoading(true);
      try {
        const targetCategory = category || getRecommendedCategory();
        
        // Mocking the API call for now. In a real app, this would be:
        // const response = await fetch(`/api/recommendations?category=${targetCategory}&exclude=${currentProductId}`);
        // const data = await response.json();
        
        // Mock data logic based on category
        const mockProducts: Product[] = [
          { id: '101', name: 'Zaria Linen Dress', slug: 'zaria-linen-dress', category: 'womens-fashion', price: 32000, image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=500', rating: 4, reviewsCount: 8, stock_quantity: 5 },
          { id: '102', name: 'Savannah Breeze Wrap', slug: 'savannah-breeze-wrap', category: 'womens-fashion', price: 28000, image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=500', rating: 4, reviewsCount: 15, stock_quantity: 12 },
          { id: '103', name: 'Desert Rose Abaya', slug: 'desert-rose-abaya', category: 'womens-fashion', price: 52000, image: 'https://images.unsplash.com/photo-1561053720-76cd73ff22c3?q=80&w=500', rating: 5, reviewsCount: 18, stock_quantity: 4 },
          { id: '104', name: 'Calabar Print Maxi', slug: 'calabar-print-maxi', category: 'womens-fashion', price: 24000, image: 'https://images.unsplash.com/photo-1561053720-76cd73ff22c3?q=80&w=500', rating: 4, reviewsCount: 6, stock_quantity: 9 },
        ];

        // If no history and no category, fetch featured (mocking that too)
        if (!targetCategory) {
          // fetch('/api/products?is_featured=true&limit=4')
        }

        setRecommendations(mockProducts);
      } catch (error) {
        console.error('Error fetching recommendations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [category, currentProductId, getRecommendedCategory]);

  return { recommendations, loading };
};
