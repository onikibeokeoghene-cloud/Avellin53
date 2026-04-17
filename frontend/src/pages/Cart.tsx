import { Link } from 'react-router-dom';
import { 
  Minus, 
  Plus, 
  Trash2, 
  Heart, 
  ShoppingBag, 
  ShieldCheck, 
  RotateCcw, 
  Star,
  ArrowLeft,
  AlertCircle
} from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';

const Cart = () => {
  const { items, updateQuantity, removeItem, getSubtotal, getDeliveryFee, getTotal } = useCartStore();

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 0 }).format(amount);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4">
        <div className="w-24 h-24 bg-accent/30 rounded-full flex items-center justify-center mb-6">
          <ShoppingBag className="h-10 w-10 text-text-light" />
        </div>
        <h2 className="text-3xl font-heading text-primary mb-2">Your cart is empty</h2>
        <p className="text-text-light mb-8 max-w-xs text-center">Looks like you haven't added anything to your cart yet.</p>
        <Link 
          to="/shop" 
          className="bg-primary text-white px-10 py-4 uppercase tracking-widest font-bold text-xs hover:bg-secondary transition-colors"
        >
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-bg-light min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-heading text-primary mb-10">Shopping Cart</h1>
        
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left Column: Cart Items */}
          <div className="lg:w-[65%] space-y-6">
            <AnimatePresence>
              {items.map((item) => (
                <motion.div 
                  key={`${item.id}-${item.size}-${item.color}`}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  className="bg-white border border-accent p-6 flex gap-6 relative"
                >
                  <div className="w-24 sm:w-32 aspect-[3/4] flex-shrink-0 bg-accent overflow-hidden">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div>
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-[10px] uppercase tracking-widest text-text-light font-bold">{item.category}</p>
                          <h3 className="text-lg font-heading text-primary mt-1">{item.name}</h3>
                          <div className="flex gap-4 mt-2 text-xs text-text-light">
                            <p>Size: <span className="text-primary font-bold">{item.size}</span></p>
                            <p>Color: <span className="text-primary font-bold">{item.color}</span></p>
                          </div>
                        </div>
                        <p className="text-sm font-bold text-primary">{formatPrice(item.price)}</p>
                      </div>

                      {item.stock_quantity === 0 && (
                        <div className="flex items-center gap-2 text-red-500 mt-4 text-[10px] font-bold uppercase tracking-widest">
                          <AlertCircle className="h-4 w-4" /> Out of Stock
                        </div>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-4 mt-6">
                      <div className="flex items-center border border-accent">
                        <button 
                          onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity - 1)}
                          className="p-2 text-text-light hover:text-primary transition-colors"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-10 text-center text-xs font-bold">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity + 1)}
                          className="p-2 text-text-light hover:text-primary transition-colors"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>

                      <div className="flex items-center gap-6">
                        <button 
                          onClick={() => {
                            toast.success('Saved to wishlist');
                          }}
                          className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-bold text-text-light hover:text-secondary transition-colors"
                        >
                          <Heart className="h-3.5 w-3.5" /> Save
                        </button>
                        <button 
                          onClick={() => removeItem(item.id, item.size, item.color)}
                          className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-bold text-red-400 hover:text-red-600 transition-colors"
                        >
                          <Trash2 className="h-3.5 w-3.5" /> Remove
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="absolute top-6 right-6 hidden sm:block">
                    <p className="text-sm font-bold text-primary">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            <Link to="/shop" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-text-light hover:text-secondary transition-colors mt-4">
              <ArrowLeft className="h-4 w-4" /> Continue Shopping
            </Link>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:w-[35%]">
            <div className="bg-white border border-accent p-8 space-y-8 sticky top-32">
              <h2 className="text-xl font-heading text-primary border-b border-accent pb-4">Order Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-text-light">Subtotal</span>
                  <span className="text-primary font-bold">{formatPrice(getSubtotal())}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-light">Delivery Fee</span>
                  <span className="text-primary font-bold">{getDeliveryFee() === 0 ? 'FREE' : formatPrice(getDeliveryFee())}</span>
                </div>
                {getDeliveryFee() > 0 && (
                  <p className="text-[10px] text-secondary font-bold text-right">Spend {formatPrice(50000 - getSubtotal())} more for FREE delivery</p>
                )}
                <div className="pt-4 border-t border-accent flex justify-between">
                  <span className="text-lg font-bold">Total</span>
                  <span className="text-2xl font-bold text-primary">{formatPrice(getTotal())}</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="Promo Code" 
                    className="flex-1 border border-accent px-4 py-3 text-sm focus:outline-none focus:border-secondary" 
                  />
                  <button className="bg-primary text-white px-6 py-3 text-xs uppercase tracking-widest font-bold hover:bg-secondary transition-colors">Apply</button>
                </div>
                
                <Link 
                  to="/checkout"
                  className="block w-full bg-secondary text-primary py-5 text-center uppercase tracking-widest font-bold text-sm hover:bg-white border border-secondary transition-all shadow-xl"
                >
                  Proceed to Checkout
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="pt-8 grid grid-cols-3 gap-4 border-t border-accent">
                <div className="flex flex-col items-center text-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-secondary" />
                  <span className="text-[8px] uppercase tracking-tighter font-bold">Secure Checkout</span>
                </div>
                <div className="flex flex-col items-center text-center gap-2">
                  <RotateCcw className="h-5 w-5 text-secondary" />
                  <span className="text-[8px] uppercase tracking-tighter font-bold">Free Returns</span>
                </div>
                <div className="flex flex-col items-center text-center gap-2">
                  <Star className="h-5 w-5 text-secondary" />
                  <span className="text-[8px] uppercase tracking-tighter font-bold">Verified Brand</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
