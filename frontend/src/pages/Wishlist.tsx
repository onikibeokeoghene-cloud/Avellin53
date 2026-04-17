import { Link } from 'react-router-dom';
import { ShoppingBag, Trash2, Heart } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { useWishlistStore } from '../store/useWishlistStore';
import { useCartStore } from '../store/useCartStore';
import { toast } from 'react-hot-toast';

const Wishlist = () => {
  const { items, removeItem } = useWishlistStore();
  const { addItem: addToCartStore } = useCartStore();

  const handleAddToCart = (item: any) => {
    addToCartStore({
      ...item,
      size: 'M',
      color: 'Standard',
      quantity: 1
    });
    toast.success(`${item.name} added to cart!`);
  };

  const handleRemove = (id: string) => {
    removeItem(id);
    toast.success('Item removed from wishlist.');
  };

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="bg-bg-light min-h-screen py-20">
      <Helmet>
        <title>My Wishlist — AVELLIN</title>
      </Helmet>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-heading text-primary uppercase tracking-[0.3em]">My Wishlist</h1>
          <div className="h-1 w-20 bg-secondary mx-auto mt-6" />
        </div>

        {items.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {items.map((item) => (
              <div key={item.id} className="bg-white border border-accent group flex flex-col">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x500?text=AVELLIN';
                    }}
                  />
                  <button 
                    onClick={() => handleRemove(item.id)}
                    className="absolute top-4 right-4 p-2.5 bg-white/80 backdrop-blur-sm hover:bg-white text-red-500 transition-all shadow-sm rounded-full"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <p className="text-[10px] text-text-light uppercase tracking-widest mb-1.5 font-bold">{item.category}</p>
                  <h3 className="font-heading text-xl text-primary mb-3 line-clamp-1">{item.name}</h3>
                  <p className="font-bold text-primary mb-6">{formatPrice(item.price)}</p>
                  
                  <button 
                    onClick={() => handleAddToCart(item)}
                    disabled={item.stock_quantity === 0}
                    className={`w-full py-4 text-[10px] uppercase tracking-[0.2em] font-bold flex items-center justify-center gap-2 transition-all mt-auto ${
                      item.stock_quantity === 0 
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                        : 'bg-primary text-white hover:bg-secondary shadow-lg'
                    }`}
                  >
                    <ShoppingBag className="w-4 h-4" />
                    {item.stock_quantity === 0 ? 'Sold Out' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="max-w-md mx-auto text-center py-20 space-y-8">
            <div className="relative inline-block">
              <Heart className="w-20 h-20 text-accent mx-auto opacity-20" />
              <Heart className="w-10 h-10 text-secondary mx-auto absolute inset-0 m-auto animate-pulse" />
            </div>
            <div className="space-y-4">
              <p className="text-2xl font-heading text-primary">Your wishlist is empty</p>
              <p className="text-text-light text-sm">Save your favorite luxury pieces here to revisit them anytime.</p>
            </div>
            <Link to="/shop" className="inline-block bg-primary text-white px-12 py-5 uppercase tracking-[0.2em] text-[10px] font-bold hover:bg-secondary transition-all shadow-xl">
              Explore Collections
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
