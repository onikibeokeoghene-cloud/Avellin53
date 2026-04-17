import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Heart, ShoppingBag, User, Menu, X, Trash2, Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '../store/useCartStore';
import { useWishlistStore } from '../store/useWishlistStore';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);
  const location = useLocation();

  // Real store state
  const { items: cartItems, getSubtotal } = useCartStore();
  const { items: wishlistItems } = useWishlistStore();
  const cartCount = cartItems.length;
  const wishlistCount = wishlistItems.length;
  const isLoggedIn = false;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close drawers on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setCartOpen(false);
    setSearchOpen(false);
    setActiveMegaMenu(null);
    setAccountDropdownOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'New Arrivals', path: '/new-arrivals' },
    { name: 'Men', path: '/category/men', hasMegaMenu: true },
    { name: 'Women', path: '/category/women', hasMegaMenu: true },
    { name: 'Skincare', path: '/category/skincare', hasMegaMenu: true },
    { name: 'Sale', path: '/sale' },
  ];

  const megaMenuItems = {
    Men: ['Shirts', 'T-Shirts', 'Trousers', 'Traditional Wear', 'Shoes', 'Accessories'],
    Women: ['Dresses', 'Tops', 'Skirts', 'Traditional Wear', 'Bags', 'Jewelry'],
    Skincare: ['Cleansers', 'Moisturizers', 'Serums', 'Sunscreen', 'Body Care', 'Sets']
  };

  return (
    <>
      {/* Top Bar Marquee */}
      <div className="bg-primary text-bg-light text-xs py-2 overflow-hidden whitespace-nowrap relative">
        <div className="flex animate-marquee">
          <div className="flex-shrink-0 flex items-center">
            <span className="mx-8">Free delivery on orders above ₦50,000</span>
            <span className="mx-8">Premium Nigerian Fashion & Skincare</span>
            <span className="mx-8">New Arrivals: Luxury Traditional Wear</span>
            <span className="mx-8">Secure Payments via Paystack</span>
          </div>
          <div className="flex-shrink-0 flex items-center">
            <span className="mx-8">Free delivery on orders above ₦50,000</span>
            <span className="mx-8">Premium Nigerian Fashion & Skincare</span>
            <span className="mx-8">New Arrivals: Luxury Traditional Wear</span>
            <span className="mx-8">Secure Payments via Paystack</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header 
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          isScrolled ? 'bg-bg-light shadow-md py-3' : 'bg-bg-light py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden text-primary p-1"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center">
            <span className="font-heading text-3xl font-bold text-secondary tracking-widest">AVELLIN</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <div 
                key={link.name} 
                className="relative"
                onMouseEnter={() => link.hasMegaMenu && setActiveMegaMenu(link.name)}
                onMouseLeave={() => setActiveMegaMenu(null)}
              >
                <Link 
                  to={link.path}
                  className={`text-sm font-medium tracking-wide hover:text-secondary transition-colors ${
                    location.pathname.includes(link.path) ? 'text-secondary' : 'text-primary'
                  }`}
                >
                  {link.name}
                </Link>

                {/* Mega Menu Dropdown */}
                {link.hasMegaMenu && activeMegaMenu === link.name && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-6 w-48">
                    <div className="bg-bg-light shadow-lg border border-accent p-4 flex flex-col space-y-3">
                      {megaMenuItems[link.name as keyof typeof megaMenuItems].map((item) => (
                        <Link 
                          key={item} 
                          to={`${link.path}/${item.toLowerCase().replace(' ', '-')}`}
                          className="text-sm text-text-light hover:text-secondary transition-colors"
                        >
                          {item}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right Icons */}
          <div className="flex items-center space-x-4 lg:space-x-6">
            <button onClick={() => setSearchOpen(true)} className="text-primary hover:text-secondary transition-colors">
              <Search className="w-5 h-5" />
            </button>
            
            <Link to="/wishlist" className="relative text-primary hover:text-secondary transition-colors hidden sm:block">
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-secondary text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <button onClick={() => setCartOpen(true)} className="relative text-primary hover:text-secondary transition-colors">
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-secondary text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            <div className="relative">
              <button 
                onClick={() => setAccountDropdownOpen(!accountDropdownOpen)}
                className="text-primary hover:text-secondary transition-colors hidden sm:flex items-center"
              >
                <User className="w-5 h-5" />
              </button>
              
              {accountDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-bg-light shadow-md border border-accent py-2 z-50">
                  {isLoggedIn ? (
                    <>
                      <Link to="/profile" className="block px-4 py-2 text-sm text-primary hover:bg-accent">My Profile</Link>
                      <Link to="/orders" className="block px-4 py-2 text-sm text-primary hover:bg-accent">My Orders</Link>
                      <button className="block w-full text-left px-4 py-2 text-sm text-primary hover:bg-accent">Logout</button>
                    </>
                  ) : (
                    <>
                      <Link to="/login" className="block px-4 py-2 text-sm text-primary hover:bg-accent">Login</Link>
                      <Link to="/register" className="block px-4 py-2 text-sm text-primary hover:bg-accent">Register</Link>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Search Overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[60] bg-bg-light flex flex-col p-8"
          >
            <div className="flex justify-end">
              <button onClick={() => setSearchOpen(false)} className="text-primary">
                <X className="w-8 h-8" />
              </button>
            </div>
            <div className="flex-1 flex items-center justify-center">
              <div className="w-full max-w-3xl relative">
                <input 
                  type="text" 
                  placeholder="Search products, categories..." 
                  className="w-full border-b-2 border-primary bg-transparent text-3xl font-heading py-4 pr-12 focus:outline-none placeholder:text-text-light"
                  autoFocus
                />
                <button className="absolute right-0 top-1/2 -translate-y-1/2 text-primary">
                  <Search className="w-8 h-8" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-primary z-[60]"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed inset-y-0 left-0 w-4/5 max-w-sm bg-bg-light z-[70] shadow-2xl flex flex-col"
            >
              <div className="p-4 border-b border-accent flex justify-between items-center">
                <span className="font-heading text-2xl font-bold text-secondary tracking-widest">AVELLIN</span>
                <button onClick={() => setMobileMenuOpen(false)} className="text-primary p-2">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-4 flex flex-col space-y-6">
                {navLinks.map(link => (
                  <div key={link.name}>
                    <Link 
                      to={link.path}
                      className="text-lg font-heading tracking-wide block py-2 border-b border-accent"
                    >
                      {link.name}
                    </Link>
                  </div>
                ))}
                
                <div className="pt-8 flex flex-col space-y-4">
                  <Link to="/wishlist" className="flex items-center text-primary text-lg font-heading border-b border-accent py-2">
                    <Heart className="w-5 h-5 mr-3" /> Wishlist ({wishlistCount})
                  </Link>
                  {isLoggedIn ? (
                    <>
                      <Link to="/profile" className="flex items-center text-primary text-lg font-heading border-b border-accent py-2">
                        <User className="w-5 h-5 mr-3" /> My Profile
                      </Link>
                      <button className="flex items-center text-primary text-lg font-heading py-2">
                        Logout
                      </button>
                    </>
                  ) : (
                    <Link to="/login" className="flex items-center text-primary text-lg font-heading border-b border-accent py-2">
                      <User className="w-5 h-5 mr-3" /> Login / Register
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Cart Drawer */}
      <AnimatePresence>
        {cartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-primary z-[60]"
              onClick={() => setCartOpen(false)}
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed inset-y-0 right-0 w-full sm:w-[400px] bg-bg-light z-[70] shadow-2xl flex flex-col"
            >
              <div className="p-4 border-b border-accent flex justify-between items-center">
                <h2 className="font-heading text-xl font-bold">Shopping Cart ({cartCount})</h2>
                <button onClick={() => setCartOpen(false)} className="text-primary p-2">
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4 flex flex-col space-y-4">
                {cartItems.length > 0 ? (
                  cartItems.map((item) => (
                    <div key={`${item.id}-${item.size}-${item.color}`} className="flex border-b border-accent pb-4 group">
                      <div className="w-20 h-24 bg-accent flex-shrink-0 overflow-hidden">
                        <img 
                          src={item.image || 'https://via.placeholder.com/200x250?text=AVELLIN'} 
                          alt={item.name} 
                          className="w-full h-full object-cover transition-transform group-hover:scale-110" 
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/200x250?text=AVELLIN';
                          }}
                        />
                      </div>
                      <div className="flex-1 flex flex-col justify-between ml-4">
                        <div>
                          <div className="flex justify-between items-start">
                            <h3 className="font-medium text-sm line-clamp-1">{item.name}</h3>
                            <button 
                              onClick={() => useCartStore.getState().removeItem(item.id, item.size, item.color)}
                              className="text-text-light hover:text-red-500 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          <p className="text-[10px] text-text-light mt-1 uppercase tracking-widest">
                            {item.size} | {item.color}
                          </p>
                        </div>
                        <div className="flex justify-between items-end mt-2">
                          <div className="flex items-center border border-accent">
                            <button 
                              onClick={() => useCartStore.getState().updateQuantity(item.id, item.size, item.color, item.quantity - 1)}
                              className="px-2 py-1 text-text-light hover:bg-accent transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-3 py-1 text-xs font-bold">{item.quantity}</span>
                            <button 
                              onClick={() => useCartStore.getState().updateQuantity(item.id, item.size, item.color, item.quantity + 1)}
                              className="px-2 py-1 text-text-light hover:bg-accent transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <span className="font-bold text-sm">₦{(item.price * item.quantity).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center space-y-4">
                    <ShoppingBag className="w-12 h-12 text-accent" />
                    <p className="text-text-light">Your cart is empty</p>
                    <button 
                      onClick={() => setCartOpen(false)}
                      className="text-secondary font-bold uppercase tracking-widest text-xs hover:underline"
                    >
                      Start Shopping
                    </button>
                  </div>
                )}
              </div>

              <div className="p-6 border-t border-accent bg-bg-light">
                <div className="flex justify-between items-center mb-4 text-lg">
                  <span className="font-heading font-bold">Subtotal</span>
                  <span className="font-heading font-bold">₦{getSubtotal().toLocaleString()}</span>
                </div>
                <p className="text-xs text-text-light mb-6 text-center italic">Free delivery on orders above ₦50,000</p>
                <Link to="/checkout" className="block w-full bg-primary text-white text-center py-4 uppercase tracking-widest text-sm font-bold hover:bg-secondary transition-all shadow-xl">
                  Checkout
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
