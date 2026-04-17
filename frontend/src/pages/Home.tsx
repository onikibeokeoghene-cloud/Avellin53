import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, 
  RotateCcw, 
  ShieldCheck, 
  Truck, 
  Star,
  Camera as InstagramIcon
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import ProductCard from '../components/ProductCard';
import { Helmet } from 'react-helmet-async';
import { useRecommendations } from '../hooks/useRecommendations';

// Image paths from generation
const HERO_IMAGE = "/hero_fashion_nigeria_1776446950979.png";
const SKINCARE_IMAGE = "/skincare_spotlight_1776446970490.png";

// Mock Data
const CATEGORIES = [
  { name: "Men's Fashion", image: "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=1000&auto=format&fit=crop", path: "/category/men" },
  { name: "Women's Fashion", image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=1000&auto=format&fit=crop", path: "/category/women" },
  { name: "Skincare", image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=1000&auto=format&fit=crop", path: "/category/skincare" },
];

const FEATURED_PRODUCTS = [
  { id: '1', name: 'Lagos Silk Kaftan', slug: 'lagos-silk-kaftan', category: 'Men', price: 45000, compare_at_price: 55000, image: 'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?q=80&w=500&auto=format&fit=crop', rating: 5, reviewsCount: 12, stock_quantity: 10 },
  { id: '2', name: 'Zaria Linen Dress', slug: 'zaria-linen-dress', category: 'Women', price: 32000, image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=500&auto=format&fit=crop', rating: 4, reviewsCount: 8, stock_quantity: 5 },
  { id: '3', name: 'Glow Vit-C Serum', slug: 'glow-vit-c-serum', category: 'Skincare', price: 18500, compare_at_price: 22000, image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=500&auto=format&fit=crop', rating: 5, reviewsCount: 45, stock_quantity: 50 },
  { id: '4', name: 'Abuja Velvet Agbada', slug: 'abuja-velvet-agbada', category: 'Men', price: 85000, image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=500&auto=format&fit=crop', rating: 5, reviewsCount: 6, stock_quantity: 0 },
  { id: '5', name: 'Savannah Breeze Wrap', slug: 'savannah-breeze-wrap', category: 'Women', price: 28000, image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=500&auto=format&fit=crop', rating: 4, reviewsCount: 15, stock_quantity: 12 },
  { id: '6', name: 'Midnight Hydrate Cream', slug: 'midnight-hydrate-cream', category: 'Skincare', price: 15000, image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=500&auto=format&fit=crop', rating: 5, reviewsCount: 28, stock_quantity: 20 },
  { id: '7', name: 'Royal Indigo Tunic', slug: 'royal-indigo-tunic', category: 'Men', price: 42000, compare_at_price: 48000, image: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?q=80&w=500&auto=format&fit=crop', rating: 4, reviewsCount: 10, stock_quantity: 8 },
  { id: '8', name: 'Gold Coast Sunshade', slug: 'gold-coast-sunshade', category: 'Accessories', price: 12500, image: 'https://images.unsplash.com/photo-1511499767390-90342f5b89a8?q=80&w=500&auto=format&fit=crop', rating: 5, reviewsCount: 22, stock_quantity: 15 },
];

const REVIEWS = [
  { name: 'Olamide B.', rating: 5, text: "The quality of the silk kaftan is unmatched. Truly premium feel and fast delivery to Lekki.", product: 'Lagos Silk Kaftan' },
  { name: 'Chidi E.', rating: 5, text: "Finally a Nigerian brand that gets skincare right for our weather. The Vit-C serum is a game changer.", product: 'Glow Vit-C Serum' },
  { name: 'Amina J.', rating: 4, text: "Beautiful dress, fits perfectly. The packaging was so luxury, felt like unboxing a gift.", product: 'Zaria Linen Dress' },
];

const Home = () => {
  const { recommendations, loading } = useRecommendations();
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    toast.success('Welcome to the family! Check your email for your 10% discount code.', {
      duration: 5000,
      style: {
        background: '#0A0A0A',
        color: '#F5F0E8',
        borderRadius: '0px',
        border: '1px solid #C9A84C'
      }
    });
    setEmail('');
  };

  return (
    <div className="flex flex-col bg-bg-light overflow-x-hidden">
      <Helmet>
        <title>AVELLIN — Premium Fashion & Skincare for Nigeria</title>
        <meta name="description" content="Discover premium fashion and clinical skincare curated for the modern Nigerian. Shop Agbadas, Ankara blazers, and clinical-grade serums." />
        <meta property="og:title" content="AVELLIN — Premium Fashion & Skincare" />
        <meta property="og:description" content="Elevate your style and skin with AVELLIN. Nationwide delivery in Nigeria." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/hero_fashion_nigeria_1776446950979.png" />
      </Helmet>
      
      {/* Section 1: Hero Banner */}
      <section className="relative h-screen lg:h-[90vh] w-full bg-primary overflow-hidden">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <img 
            src={HERO_IMAGE} 
            alt="AVELLIN Premium Fashion" 
            className="h-full w-full object-cover opacity-60"
          />
        </motion.div>
        
        <div className="relative h-full max-w-7xl mx-auto px-4 flex flex-col justify-center items-start">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="max-w-2xl"
          >
            <h1 className="text-6xl md:text-8xl font-heading text-bg-light leading-tight mb-6">
              Dress Your <br />
              <span className="text-secondary italic">Story</span>
            </h1>
            <p className="text-lg md:text-xl text-bg-light/80 mb-10 max-w-lg leading-relaxed">
              Premium fashion and skincare curated for the modern Nigerian. Experience luxury that speaks your language.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-secondary text-primary px-10 py-4 font-bold uppercase tracking-widest hover:bg-white transition-colors duration-300">
                Shop Women
              </button>
              <button className="border-2 border-white text-white px-10 py-4 font-bold uppercase tracking-widest hover:bg-white hover:text-primary transition-colors duration-300">
                Shop Men
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 2: Category Strips */}
      <section className="py-20 max-w-7xl mx-auto px-4 w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CATEGORIES.map((cat, idx) => (
            <motion.div 
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="group relative h-[400px] overflow-hidden cursor-pointer"
            >
              <motion.img 
                src={cat.image} 
                alt={cat.name}
                className="h-full w-full object-cover"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.6 }}
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
              <div className="absolute inset-0 flex flex-col justify-end p-8">
                <h3 className="text-2xl font-bold text-white mb-2 uppercase tracking-wide">{cat.name}</h3>
                <div className="flex items-center text-white text-sm font-medium tracking-widest uppercase group-hover:text-secondary transition-colors">
                  Shop Now <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Section 3: Featured Products */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-12 flex flex-col items-center">
            <h2 className="text-4xl font-heading text-primary mb-2">Featured Picks</h2>
            <div className="h-1 w-20 bg-secondary" />
          </div>
          
          <div className="flex overflow-x-auto lg:grid lg:grid-cols-4 gap-8 pb-8 no-scrollbar">
            {FEATURED_PRODUCTS.map((product) => (
              <div key={product.id} className="min-w-[280px]">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: New Arrivals */}
      <section className="py-20 bg-bg-light">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-12 flex justify-between items-end border-b border-accent pb-4">
            <h2 className="text-4xl font-heading text-primary">New Arrivals</h2>
            <a href="/new-arrivals" className="text-sm font-medium uppercase tracking-widest text-secondary hover:text-primary transition-colors flex items-center">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </div>
          
          <div className="flex overflow-x-auto lg:grid lg:grid-cols-4 gap-8 pb-8 no-scrollbar">
            {FEATURED_PRODUCTS.slice().reverse().map((product) => (
              <div key={product.id} className="min-w-[280px]">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: Trust Banner */}
      <section className="bg-primary py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center space-y-3">
              <RotateCcw className="h-8 w-8 text-secondary" />
              <div className="text-bg-light">
                <p className="font-bold text-sm uppercase tracking-wider">Free Returns</p>
                <p className="text-xs text-bg-light/60">Within 7 Days</p>
              </div>
            </div>
            <div className="flex flex-col items-center text-center space-y-3">
              <ShieldCheck className="h-8 w-8 text-secondary" />
              <div className="text-bg-light">
                <p className="font-bold text-sm uppercase tracking-wider">Secure Payment</p>
                <p className="text-xs text-bg-light/60">100% Encrypted</p>
              </div>
            </div>
            <div className="flex flex-col items-center text-center space-y-3">
              <Star className="h-8 w-8 text-secondary" />
              <div className="text-bg-light">
                <p className="font-bold text-sm uppercase tracking-wider">Verified Products</p>
                <p className="text-xs text-bg-light/60">Authentic Only</p>
              </div>
            </div>
            <div className="flex flex-col items-center text-center space-y-3">
              <Truck className="h-8 w-8 text-secondary" />
              <div className="text-bg-light">
                <p className="font-bold text-sm uppercase tracking-wider">Nationwide Delivery</p>
                <p className="text-xs text-bg-light/60">Across Nigeria</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Skincare Spotlight */}
      <section className="py-0 overflow-hidden bg-accent">
        <div className="flex flex-col lg:flex-row min-h-[600px]">
          <div className="lg:w-1/2 h-[400px] lg:h-auto overflow-hidden">
            <img 
              src={SKINCARE_IMAGE} 
              alt="AVELLIN Skincare" 
              className="h-full w-full object-cover hover:scale-105 transition-transform duration-700" 
            />
          </div>
          <div className="lg:w-1/2 flex flex-col justify-center p-12 lg:p-24 space-y-8 bg-white">
            <h2 className="text-5xl font-heading text-primary leading-tight">Your Skin <br /> Deserves Better</h2>
            <p className="text-text-light leading-relaxed max-w-md">
              Scientifically formulated for the African climate. Our skincare range combines potent natural ingredients with advanced clinical research to deliver a glow that is truly yours.
            </p>
            <button className="self-start bg-primary text-white px-10 py-4 font-bold uppercase tracking-widest hover:bg-secondary transition-colors duration-300">
              Shop Skincare
            </button>
          </div>
        </div>
      </section>

      {/* Section 7: Recommended For You */}
      <section className="py-20 bg-bg-light">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-4xl font-heading text-primary">Recommended For You</h2>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {loading ? (
              [...Array(4)].map((_, i) => (
                <div key={i} className="animate-pulse space-y-4">
                  <div className="aspect-[3/4] bg-accent" />
                  <div className="h-4 bg-accent w-2/3" />
                  <div className="h-4 bg-accent w-1/3" />
                </div>
              ))
            ) : (
              recommendations.map((product: any) => (
                <ProductCard key={product.id} product={product} />
              ))
            )}
          </div>
        </div>
      </section>

      {/* Section 8: Customer Reviews */}
      <section className="py-20 bg-accent/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-4xl font-heading text-primary">What Our Customers Say</h2>
          </div>
          
          <div className="flex overflow-x-auto md:grid md:grid-cols-3 gap-8 pb-4 no-scrollbar">
            {REVIEWS.map((review, idx) => (
              <div key={idx} className="min-w-[300px] bg-white p-8 flex flex-col space-y-4 shadow-sm border border-accent/50">
                <div className="flex gap-1 text-secondary">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'fill-secondary' : 'text-gray-200'}`} />
                  ))}
                </div>
                <p className="text-text-dark italic flex-grow">"{review.text}"</p>
                <div className="pt-4 border-t border-accent">
                  <p className="font-bold text-sm text-primary">{review.name}</p>
                  <p className="text-xs text-text-light uppercase tracking-widest mt-1">Purchased: {review.product}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 9: Instagram Feed Strip */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-2xl font-heading text-primary flex items-center justify-center gap-2">
              <InstagramIcon className="h-5 w-5" /> Follow Our Story @avellin
            </h2>
          </div>
          
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
            {[
              { id: '1', alt: 'Model wearing traditional Agbada', img: 'https://images.unsplash.com/photo-1583394838336-acd977730f9a?auto=format&fit=crop&w=300&h=300' },
              { id: '2', alt: 'Luxury skincare collection display', img: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=300&h=300' },
              { id: '3', alt: 'Elegant Ankara wrap dress detail', img: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=300&h=300' },
              { id: '4', alt: 'Minimalist product shot of Vit-C serum', img: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=300&h=300' },
              { id: '5', alt: 'Behind the scenes at AVELLIN photoshoot', img: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=300&h=300' },
              { id: '6', alt: 'Customer style highlight: Lagos Silk Kaftan', img: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=300&h=300' }
            ].map((post) => (
              <a key={post.id} href="#" className="aspect-square bg-accent overflow-hidden group">
                <img 
                  src={post.img} 
                  alt={post.alt} 
                  className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Section 10: Newsletter Section */}
      <section className="bg-secondary py-20">
        <div className="max-w-7xl mx-auto px-4 text-center flex flex-col items-center">
          <h2 className="text-4xl md:text-5xl font-heading text-primary mb-4">Get 10% Off Your First Order</h2>
          <p className="text-primary/70 mb-10 max-w-lg">
            Subscribe for exclusive deals, new arrivals, and style inspiration curated for your inbox.
          </p>
          <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row w-full max-w-xl gap-0 border-2 border-primary">
            <input 
              type="email" 
              required
              placeholder="Your email address" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-grow px-6 py-4 bg-transparent text-primary placeholder:text-primary/50 focus:outline-none"
            />
            <button 
              type="submit"
              className="bg-primary text-white px-10 py-4 font-bold uppercase tracking-widest hover:bg-primary/90 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;
