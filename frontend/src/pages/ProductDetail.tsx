import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Star, 
  Minus, 
  Plus, 
  Heart, 
  ShoppingBag, 
  ChevronDown,
  X,
  Maximize2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { Helmet } from 'react-helmet-async';
import ProductCard from '../components/ProductCard';
import { useProductStore } from '../store/useProductStore';
import { useRecommendations } from '../hooks/useRecommendations';

// Mock Data for a single product
const PRODUCT = {
  id: '1',
  name: 'Lagos Silk Kaftan',
  slug: 'lagos-silk-kaftan',
  category: "womens-fashion", // Updated to match DB categories
  price: 45000,
  compare_at_price: 55000,
  short_description: 'Elevate your evening wear with this exquisite silk kaftan. Handcrafted in Lagos, it features traditional motifs reimagined for the modern silhouette.',
  description: 'Our Lagos Silk Kaftan is a testament to Nigerian craftsmanship. Made from the finest mulberry silk, it offers a fluid drape that flatters every body type. The intricate gold thread embroidery along the neckline and cuffs adds a touch of regal elegance. Perfect for weddings, formal gatherings, or any occasion where you want to make a statement of refined luxury.',
  images: [
    'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?q=80&w=1000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=1000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=1000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=1000&auto=format&fit=crop'
  ],
  sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  colors: [
    { name: 'Royal Gold', hex: '#C9A84C' },
    { name: 'Midnight Black', hex: '#0A0A0A' },
    { name: 'Ivory Cream', hex: '#F5F0E8' }
  ],
  rating: 4.8,
  reviewsCount: 24,
  stock_quantity: 15,
  ingredients: '100% Pure Mulberry Silk, Gold-coated Metallic Thread Embroidery, Organic Dye.'
};

// Recommendations are now dynamic via useRecommendations hook

const ProductDetail = () => {
  const { } = useParams();
  const addToViewHistory = useProductStore(state => state.addToViewHistory);
  const { recommendations, loading: recsLoading } = useRecommendations(PRODUCT.id, PRODUCT.category);

  useEffect(() => {
    addToViewHistory({ id: PRODUCT.id, category: PRODUCT.category, slug: PRODUCT.slug });
  }, [addToViewHistory]);

  const [activeImage, setActiveImage] = useState(PRODUCT.images[0]);
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState(PRODUCT.colors[0].name);
  const [quantity, setQuantity] = useState(1);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [showStickyATC, setShowStickyATC] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState<string | null>('description');

  const atcRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (atcRef.current) {
        const rect = atcRef.current.getBoundingClientRect();
        setShowStickyATC(rect.top < 0);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAddToCart = () => {
    toast.success(`${PRODUCT.name} (${selectedSize}) added to cart!`, {
      style: { background: '#0A0A0A', color: '#F5F0E8', borderRadius: '0px' }
    });
  };

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 0 }).format(amount);
  };

  const toggleAccordion = (id: string) => {
    setActiveAccordion(activeAccordion === id ? null : id);
  };

  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": PRODUCT.name,
    "image": PRODUCT.images,
    "description": PRODUCT.short_description,
    "brand": {
      "@type": "Brand",
      "name": "AVELLIN"
    },
    "offers": {
      "@type": "Offer",
      "priceCurrency": "NGN",
      "price": PRODUCT.price,
      "availability": PRODUCT.stock_quantity > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"
    }
  };

  return (
    <div className="bg-bg-light min-h-screen pb-20">
      <Helmet>
        <title>{PRODUCT.name} — AVELLIN</title>
        <meta name="description" content={PRODUCT.short_description} />
        <meta property="og:title" content={`${PRODUCT.name} — AVELLIN`} />
        <meta property="og:description" content={PRODUCT.short_description} />
        <meta property="og:image" content={PRODUCT.images[0]} />
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      </Helmet>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Breadcrumb */}
        <nav className="mb-8 text-[10px] text-text-light uppercase tracking-[0.2em] flex items-center gap-2 font-bold">
          <Link to="/" className="hover:text-secondary transition-colors">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-secondary transition-colors">Shop</Link>
          <span>/</span>
          <Link to={`/category/${PRODUCT.category.toLowerCase().split("'")[0]}`} className="hover:text-secondary transition-colors">
            {PRODUCT.category}
          </Link>
          <span>/</span>
          <span className="text-secondary">{PRODUCT.name}</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          
          {/* Left Column: Image Gallery */}
          <div className="lg:w-[60%] space-y-4">
            <div 
              className="relative aspect-[4/5] bg-white border border-accent overflow-hidden cursor-zoom-in group"
              onClick={() => setIsZoomOpen(true)}
            >
              <img 
                src={activeImage} 
                alt={PRODUCT.name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
              />
              <button className="absolute bottom-4 right-4 bg-white/80 p-3 backdrop-blur-sm rounded-full shadow-sm">
                <Maximize2 className="h-5 w-5 text-primary" />
              </button>
            </div>
            
            <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
              {PRODUCT.images.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`w-24 h-32 flex-shrink-0 border-2 transition-all ${
                    activeImage === img ? 'border-secondary' : 'border-accent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Product Info */}
          <div className="lg:w-[40%] space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-heading text-primary leading-tight">{PRODUCT.name}</h1>
              <div className="flex items-center gap-4">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-4 w-4 ${i < Math.floor(PRODUCT.rating) ? 'fill-secondary text-secondary' : 'text-gray-200'}`} />
                  ))}
                </div>
                <button onClick={() => document.getElementById('reviews')?.scrollIntoView({ behavior: 'smooth' })} className="text-xs font-bold uppercase tracking-widest text-text-light hover:text-secondary">
                  {PRODUCT.reviewsCount} Reviews
                </button>
              </div>
              <div className="flex items-baseline gap-4">
                <span className="text-3xl font-bold text-text-dark">{formatPrice(PRODUCT.price)}</span>
                {PRODUCT.compare_at_price && (
                  <span className="text-xl text-text-light line-through decoration-secondary/50">{formatPrice(PRODUCT.compare_at_price)}</span>
                )}
              </div>
              <p className="text-text-light leading-relaxed">{PRODUCT.short_description}</p>
            </div>

            {/* Selectors */}
            <div className="space-y-6">
              {/* Size */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="text-xs font-bold uppercase tracking-widest">Select Size: <span className="text-secondary">{selectedSize}</span></h4>
                  <button 
                    onClick={() => setIsSizeGuideOpen(true)}
                    className="text-[10px] font-bold uppercase tracking-widest text-text-light hover:text-secondary underline underline-offset-4"
                  >
                    Size Guide
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {PRODUCT.sizes.map(size => (
                    <button 
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 flex items-center justify-center text-xs font-bold border transition-all ${
                        selectedSize === size ? 'bg-primary text-white border-primary shadow-lg scale-105' : 'bg-white border-accent hover:border-secondary'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-widest">Select Color: <span className="text-secondary">{selectedColor}</span></h4>
                <div className="flex gap-3">
                  {PRODUCT.colors.map(color => (
                    <button 
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      title={color.name}
                      className={`w-10 h-10 rounded-full border-2 p-0.5 transition-all ${
                        selectedColor === color.name ? 'border-secondary scale-110' : 'border-transparent'
                      }`}
                    >
                      <div className="w-full h-full rounded-full" style={{ backgroundColor: color.hex }} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-widest">Quantity</h4>
                <div className="flex items-center w-32 border border-accent">
                  <button 
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="p-3 text-text-light hover:text-primary"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <input 
                    type="number" 
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                    className="w-full text-center text-sm font-bold bg-transparent focus:outline-none" 
                  />
                  <button 
                    onClick={() => setQuantity(q => q + 1)}
                    className="p-3 text-text-light hover:text-primary"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-4">
              <button 
                ref={atcRef}
                onClick={handleAddToCart}
                className="w-full bg-primary text-white py-5 uppercase tracking-widest font-bold text-sm hover:bg-secondary transition-all flex items-center justify-center gap-3 shadow-xl"
              >
                <ShoppingBag className="h-5 w-5" /> Add to Cart
              </button>
              <button className="w-full border border-primary text-primary py-4 uppercase tracking-widest font-bold text-xs hover:bg-primary hover:text-white transition-all flex items-center justify-center gap-2">
                <Heart className="h-4 w-4" /> Add to Wishlist
              </button>
            </div>

            {/* Accordions */}
            <div className="border-t border-accent mt-10">
              {[
                { id: 'description', title: 'Product Description', content: PRODUCT.description },
                { id: 'delivery', title: 'Delivery Info', content: 'Free delivery on orders above ₦50,000. Standard delivery 3-5 business days. Express delivery available in Lagos, Abuja, and Port Harcourt.' },
                { id: 'returns', title: 'Returns Policy', content: '7-day return policy on unworn items with original tags. See our returns page for more details.' },
                { id: 'ingredients', title: 'Ingredients / Materials', content: PRODUCT.ingredients }
              ].map(item => (
                <div key={item.id} className="border-b border-accent">
                  <button 
                    onClick={() => toggleAccordion(item.id)}
                    className="w-full py-4 flex justify-between items-center text-left group"
                  >
                    <span className="text-xs font-bold uppercase tracking-widest group-hover:text-secondary transition-colors">{item.title}</span>
                    <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${activeAccordion === item.id ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {activeAccordion === item.id && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <p className="pb-6 text-sm text-text-light leading-relaxed">{item.content}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <section id="reviews" className="mt-24 pt-24 border-t border-accent">
          <div className="grid lg:grid-cols-3 gap-16">
            <div className="space-y-6">
              <h2 className="text-3xl font-heading text-primary">Customer Reviews</h2>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-4">
                  <span className="text-6xl font-bold text-primary">{PRODUCT.rating}</span>
                  <div>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-4 w-4 ${i < 4 ? 'fill-secondary text-secondary' : 'text-gray-200'}`} />
                      ))}
                    </div>
                    <p className="text-xs text-text-light mt-1">Based on {PRODUCT.reviewsCount} reviews</p>
                  </div>
                </div>
                {/* Bar Chart Mock */}
                <div className="space-y-2 mt-6">
                  {[5, 4, 3, 2, 1].map(stars => (
                    <div key={stars} className="flex items-center gap-4 text-xs">
                      <span className="w-12">{stars} Stars</span>
                      <div className="flex-1 h-2 bg-accent rounded-full overflow-hidden">
                        <div className="h-full bg-secondary" style={{ width: stars === 5 ? '80%' : stars === 4 ? '15%' : '5%' }} />
                      </div>
                      <span className="w-10 text-right">{stars === 5 ? '80%' : stars === 4 ? '15%' : '5%'}</span>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-10 bg-white border border-primary text-primary py-4 uppercase tracking-widest font-bold text-xs hover:bg-primary hover:text-white transition-all">
                  Write a Review
                </button>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-8">
              {[1, 2, 3].map(i => (
                <div key={i} className="pb-8 border-b border-accent space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, j) => (
                            <Star key={j} className={`h-3 w-3 ${j < 5 ? 'fill-secondary text-secondary' : 'text-gray-200'}`} />
                          ))}
                        </div>
                        <span className="text-[10px] bg-secondary/10 text-secondary px-2 py-0.5 rounded-full font-bold uppercase tracking-tighter">Verified Purchase</span>
                      </div>
                      <p className="font-bold text-primary">Tunde Adebayor</p>
                    </div>
                    <span className="text-[10px] text-text-light uppercase tracking-widest">Oct 12, 2025</span>
                  </div>
                  <p className="text-sm text-text-light italic leading-relaxed">"The kaftan exceeded my expectations. The silk is absolutely divine and the gold embroidery is so intricate. Perfect for my cousin's wedding in Abuja. Highly recommend!"</p>
                </div>
              ))}
              <button className="text-xs font-bold uppercase tracking-widest text-secondary hover:underline">View All Reviews</button>
            </div>
          </div>
        </section>

        {/* Recommendations */}
        <section className="mt-24">
          <h2 className="text-3xl font-heading text-primary mb-12 text-center">You Might Also Like</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {recsLoading ? (
              [...Array(4)].map((_, i) => (
                <div key={i} className="animate-pulse space-y-4">
                  <div className="aspect-[3/4] bg-accent" />
                  <div className="h-4 bg-accent w-2/3" />
                  <div className="h-4 bg-accent w-1/3" />
                </div>
              ))
            ) : (
              recommendations.map(p => (
                <ProductCard key={p.id} product={p as any} />
              ))
            )}
          </div>
        </section>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {isZoomOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-10"
          >
            <button onClick={() => setIsZoomOpen(false)} className="absolute top-10 right-10 text-white hover:text-secondary transition-colors">
              <X className="h-8 w-8" />
            </button>
            <img src={activeImage} alt={PRODUCT.name} className="max-w-full max-h-full object-contain" />
          </motion.div>
        )}

        {isSizeGuideOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-primary/40 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setIsSizeGuideOpen(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              className="bg-white p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl rounded-sm"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-8 border-b border-accent pb-4">
                <h3 className="text-2xl font-heading">Size Guide</h3>
                <button onClick={() => setIsSizeGuideOpen(false)}><X className="h-6 w-6" /></button>
              </div>
              
              <div className="space-y-8">
                <p className="text-sm text-text-light">All measurements are in centimeters (cm). For the best fit, we recommend measuring a similar garment you own.</p>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm border-collapse">
                    <thead>
                      <tr className="bg-accent/30">
                        <th className="p-3 border border-accent uppercase tracking-widest text-[10px] font-bold">Size</th>
                        <th className="p-3 border border-accent uppercase tracking-widest text-[10px] font-bold">Chest</th>
                        <th className="p-3 border border-accent uppercase tracking-widest text-[10px] font-bold">Waist</th>
                        <th className="p-3 border border-accent uppercase tracking-widest text-[10px] font-bold">Shoulder</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[['XS', '88-92', '76-80', '42'], ['S', '93-97', '81-85', '43.5'], ['M', '98-102', '86-90', '45'], ['L', '103-107', '91-95', '46.5'], ['XL', '108-112', '96-100', '48']].map(row => (
                        <tr key={row[0]}>
                          <td className="p-3 border border-accent font-bold">{row[0]}</td>
                          <td className="p-3 border border-accent">{row[1]}</td>
                          <td className="p-3 border border-accent">{row[2]}</td>
                          <td className="p-3 border border-accent">{row[3]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Sticky Add to Cart */}
      <AnimatePresence>
        {showStickyATC && (
          <motion.div 
            initial={{ y: 100 }} animate={{ y: 0 }} exit={{ y: 100 }}
            className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-accent p-4 shadow-[0_-10px_20px_rgba(0,0,0,0.05)] lg:hidden"
          >
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <p className="text-[10px] uppercase tracking-widest font-bold text-text-light truncate">{PRODUCT.name}</p>
                <p className="text-sm font-bold text-primary">{formatPrice(PRODUCT.price)}</p>
              </div>
              <button 
                onClick={handleAddToCart}
                className="bg-primary text-white px-8 py-3 text-[10px] uppercase tracking-widest font-bold shadow-lg"
              >
                Add to Cart
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductDetail;
