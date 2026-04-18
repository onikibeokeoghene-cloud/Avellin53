import { useState, useEffect } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import {
  ChevronDown,
  Grid,
  List as ListIcon,
  X,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal
} from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { motion, AnimatePresence } from 'framer-motion';

// Mock Data
const ALL_PRODUCTS = [
  { id: '1', name: 'Lagos Silk Kaftan', slug: 'lagos-silk-kaftan', category: "Men's Fashion", subcategory: "traditional-wear", price: 45000, compare_at_price: 55000, image: 'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?q=80&w=500&auto=format&fit=crop', rating: 5, reviewsCount: 12, stock_quantity: 10, colors: ['white', 'gold', 'blue'], sizes: ['M', 'L', 'XL'] },
  { id: '2', name: 'Zaria Linen Dress', slug: 'zaria-linen-dress', category: "Women's Fashion", subcategory: "dresses", price: 32000, image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=500&auto=format&fit=crop', rating: 4, reviewsCount: 8, stock_quantity: 5, colors: ['cream', 'tan'], sizes: ['S', 'M', 'L'] },
  { id: '3', name: 'Glow Vit-C Serum', slug: 'glow-vit-c-serum', category: 'Skincare', subcategory: "serums", price: 18500, compare_at_price: 22000, image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=500&auto=format&fit=crop', rating: 5, reviewsCount: 45, stock_quantity: 50, sizes: ['100ml', '200ml'] },
  { id: '4', name: 'Abuja Velvet Agbada', slug: 'abuja-velvet-agbada', category: "Men's Fashion", subcategory: "traditional-wear", price: 85000, image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=500&auto=format&fit=crop', rating: 5, reviewsCount: 6, stock_quantity: 0, colors: ['black', 'purple'], sizes: ['L', 'XL', 'XXL'] },
  { id: '5', name: 'Savannah Breeze Wrap', slug: 'savannah-breeze-wrap', category: "Women's Fashion", subcategory: "tops", price: 28000, image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=500&auto=format&fit=crop', rating: 4, reviewsCount: 15, stock_quantity: 12, sizes: ['XS', 'S', 'M'] },
  { id: '6', name: 'Midnight Hydrate Cream', slug: 'midnight-hydrate-cream', category: 'Skincare', subcategory: "moisturizers", price: 15000, image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=500&auto=format&fit=crop', rating: 5, reviewsCount: 28, stock_quantity: 20, sizes: ['250ml'] },
  { id: '7', name: 'Royal Indigo Tunic', slug: 'royal-indigo-tunic', category: "Men's Fashion", subcategory: "shirts", price: 42000, compare_at_price: 48000, image: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?q=80&w=500&auto=format&fit=crop', rating: 4, reviewsCount: 10, stock_quantity: 8, sizes: ['M', 'L'] },
  { id: '8', name: 'Gold Coast Sunshade', slug: 'gold-coast-sunshade', category: 'Accessories', subcategory: "accessories", price: 12500, image: 'https://images.unsplash.com/photo-1511499767390-90342f5b89a8?q=80&w=500&auto=format&fit=crop', rating: 5, reviewsCount: 22, stock_quantity: 15, colors: ['gold', 'black'] },
];

const Shop = () => {
  const { categorySlug, subcategorySlug } = useParams();
  const [,] = useSearchParams();
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [viewType, setViewType] = useState<'grid' | 'list'>('grid');
  const [priceRange, setPriceRange] = useState([0, 500000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  // Sync category state with URL
  useEffect(() => {
    if (categorySlug) {
      const formatted = categorySlug === 'men' ? "Men's Fashion" :
        categorySlug === 'women' ? "Women's Fashion" :
          categorySlug === 'skincare' ? "Skincare" : "";
      setSelectedCategories(formatted ? [formatted] : []);
    } else {
      setSelectedCategories([]);
    }
  }, [categorySlug]);

  const filteredProducts = ALL_PRODUCTS.filter(product => {
    // Collection Filters (from URL)
    if (location.pathname === '/is_new_arrival' && !(product as any).is_new_arrival) return false;
    if (location.pathname === '/sale' && !(product.compare_at_price && product.compare_at_price > product.price)) return false;

    // Category Filter (sidebar + URL)
    if (selectedCategories.length > 0) {
      const isMatch = selectedCategories.some(cat => {
        const normalizedProductCat = product.category.replace("'s Fashion", "").toLowerCase();
        const normalizedSelectedCat = cat.replace("'s Fashion", "").toLowerCase();
        return normalizedProductCat === normalizedSelectedCat;
      });
      if (!isMatch) return false;
    }

    // Subcategory Filter (URL)
    if (subcategorySlug) {
      const formattedSub = subcategorySlug.split('-').join(' ').toLowerCase();
      // Mock subcategory check: in a real app this would be a field like product.subcategory
      const productSub = (product as any).subcategory?.toLowerCase() || "";
      if (productSub !== formattedSub && !product.name.toLowerCase().includes(formattedSub)) {
        return false;
      }
    }

    // Price Filter
    if (product.price < priceRange[0] || product.price > priceRange[1]) return false;

    // Size Filter
    if (selectedSizes.length > 0) {
      const hasSize = product.sizes?.some(s => selectedSizes.includes(s));
      if (!hasSize) return false;
    }

    // Rating Filter
    if (selectedRating && product.rating < selectedRating) return false;

    return true;
  });

  const toggleCategory = (cat: string) => {
    setSelectedCategories(prev => prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]);
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedSizes([]);
    setSelectedRating(null);
    setPriceRange([0, 500000]);
  };

  const activeFilters = [
    ...selectedCategories.map(c => ({ id: `cat-${c}`, label: c, type: 'category' })),
    ...selectedSizes.map(s => ({ id: `size-${s}`, label: s, type: 'size' })),
    ...(selectedRating ? [{ id: 'rating', label: `${selectedRating}+ Stars`, type: 'rating' }] : []),
    ...(priceRange[1] < 500000 ? [{ id: 'price', label: `Under ₦${priceRange[1].toLocaleString()}`, type: 'price' }] : []),
  ];

  const removeFilter = (id: string) => {
    if (id.startsWith('cat-')) setSelectedCategories(prev => prev.filter(c => `cat-${c}` !== id));
    if (id.startsWith('size-')) setSelectedSizes(prev => prev.filter(s => `size-${s}` !== id));
    if (id === 'rating') setSelectedRating(null);
    if (id === 'price') setPriceRange([0, 500000]);
  };

  const formatTitle = (slug?: string) => {
    if (!slug) return '';
    return slug.split('-').map(s => s === 't' ? 'T' : s.charAt(0).toUpperCase() + s.slice(1)).join('-').replace('-Shirts', '-Shirts');
  };

  return (
    <div className="bg-bg-light min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Breadcrumb & Title */}
        <div className="mb-12">
          <nav className="flex items-center gap-2 text-[10px] text-text-light uppercase tracking-[0.2em] mb-4 font-bold">
            <Link to="/" className="hover:text-secondary transition-colors">Home</Link>
            <span className="opacity-30">/</span>
            <Link to="/shop" className={`${!categorySlug ? 'text-secondary' : 'hover:text-secondary'} transition-colors`}>Shop</Link>
            {categorySlug && (
              <>
                <span className="opacity-30">/</span>
                <Link to={`/category/${categorySlug}`} className={`${!subcategorySlug ? 'text-secondary' : 'hover:text-secondary'} transition-colors`}>
                  {categorySlug === 'men' ? "Men" : categorySlug === 'women' ? "Women" : categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1)}
                </Link>
              </>
            )}
            {subcategorySlug && (
              <>
                <span className="opacity-30">/</span>
                <span className="text-secondary">{formatTitle(subcategorySlug)}</span>
              </>
            )}
          </nav>

          <h1 className="text-6xl font-heading text-primary leading-tight">
            {subcategorySlug ? formatTitle(subcategorySlug) : (categorySlug ? (categorySlug === 'men' ? "Men's Collection" : categorySlug === 'women' ? "Women's Collection" : categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1)) : 'Shop All Collections')}
          </h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">

          {/* Sidebar Filter - Desktop */}
          <aside className="hidden lg:block w-72 flex-shrink-0 space-y-10">
            {/* Category */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-6 border-b border-accent pb-4 text-primary">Category</h3>
              <div className="space-y-4">
                {["Men's Fashion", "Women's Fashion", "Skincare"].map(cat => (
                  <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(cat)}
                        onChange={() => toggleCategory(cat)}
                        className="peer h-5 w-5 appearance-none border border-accent bg-white checked:bg-primary checked:border-primary transition-all"
                      />
                      <X className="absolute h-3 w-3 text-white opacity-0 peer-checked:opacity-100 left-1 pointer-events-none" />
                    </div>
                    <span className="text-sm text-text-dark group-hover:text-secondary transition-colors font-medium">{cat}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-6 border-b border-accent pb-4 text-primary">Price Range</h3>
              <div className="space-y-6">
                <input
                  type="range"
                  min="0"
                  max="500000"
                  step="5000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full h-1 bg-accent appearance-none cursor-pointer accent-secondary"
                />
                <div className="flex items-center gap-4">
                  <div className="relative flex-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] text-text-light font-bold">₦</span>
                    <input
                      type="number"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                      className="w-full pl-7 pr-3 py-3 text-xs border border-accent bg-white focus:outline-none focus:border-secondary font-bold"
                      placeholder="Min"
                    />
                  </div>
                  <span className="text-text-light">—</span>
                  <div className="relative flex-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] text-text-light font-bold">₦</span>
                    <input
                      type="number"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 0])}
                      className="w-full pl-7 pr-3 py-3 text-xs border border-accent bg-white focus:outline-none focus:border-secondary font-bold"
                      placeholder="Max"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Sizes */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider mb-4 border-b border-accent pb-2">Size</h3>
              <div className="grid grid-cols-3 gap-2">
                {['XS', 'S', 'M', 'L', 'XL', 'XXL', '100ml', '200ml', '500ml'].map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSizes(prev => prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size])}
                    className={`text-[10px] py-2 border transition-all ${selectedSizes.includes(size) ? 'bg-primary text-white border-primary' : 'bg-white text-text-dark border-accent hover:border-secondary'
                      }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Rating */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider mb-4 border-b border-accent pb-2">Rating</h3>
              <div className="space-y-2">
                {[4, 3].map(rating => (
                  <button
                    key={rating}
                    onClick={() => setSelectedRating(selectedRating === rating ? null : rating)}
                    className={`flex items-center gap-2 text-sm w-full transition-colors ${selectedRating === rating ? 'text-secondary' : 'text-text-dark hover:text-secondary'}`}
                  >
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={`text-xs ${i < rating ? 'text-secondary' : 'text-gray-200'}`}>★</span>
                      ))}
                    </div>
                    & Above
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={clearFilters}
              className="w-full py-3 text-xs uppercase tracking-widest border border-primary text-primary hover:bg-primary hover:text-white transition-all font-bold"
            >
              Clear All Filters
            </button>
          </aside>

          {/* Main Content */}
          <main className="flex-1">

            {/* Top Bar */}
            <div className="bg-white border border-accent p-4 flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
              <div className="text-xs text-text-light font-medium">
                Showing <span className="text-primary font-bold">{filteredProducts.length}</span> of <span className="text-primary font-bold">{ALL_PRODUCTS.length}</span> products
              </div>

              <div className="flex items-center gap-4 w-full md:w-auto">
                {/* Mobile Filter Trigger */}
                <button
                  onClick={() => setIsFilterDrawerOpen(true)}
                  className="lg:hidden flex items-center gap-2 text-xs uppercase tracking-widest font-bold border border-accent px-4 py-2 hover:bg-accent transition-colors"
                >
                  <SlidersHorizontal className="h-4 w-4" /> Filters
                </button>

                <div className="relative flex-1 md:flex-none">
                  <select className="appearance-none w-full md:w-48 bg-white border border-accent px-4 py-2 text-xs uppercase tracking-widest font-bold focus:outline-none focus:border-secondary">
                    <option>Sort By: Newest First</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Most Popular</option>
                    <option>Highest Rated</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-light pointer-events-none" />
                </div>

                <div className="hidden sm:flex border border-accent">
                  <button
                    onClick={() => setViewType('grid')}
                    className={`p-2 transition-colors ${viewType === 'grid' ? 'bg-primary text-white' : 'hover:bg-accent'}`}
                  >
                    <Grid className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewType('list')}
                    className={`p-2 transition-colors ${viewType === 'list' ? 'bg-primary text-white' : 'hover:bg-accent'}`}
                  >
                    <ListIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Active Filter Tags */}
            {activeFilters.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {activeFilters.map(filter => (
                  <span
                    key={filter.id}
                    className="flex items-center gap-2 bg-accent/50 border border-accent px-3 py-1.5 text-[10px] uppercase tracking-widest font-bold text-primary"
                  >
                    {filter.label}
                    <button onClick={() => removeFilter(filter.id)} className="hover:text-secondary transition-colors">
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
                <button onClick={clearFilters} className="text-[10px] uppercase tracking-widest font-bold text-secondary hover:underline ml-2">Clear All</button>
              </div>
            )}

            {/* Product Grid */}
            <div className={viewType === 'grid' ? 'grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 'flex flex-col gap-6'}>
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} viewType={viewType} />
              ))}
              {filteredProducts.length === 0 && (
                <div className="col-span-full py-20 text-center">
                  <p className="text-xl text-text-light">No products found matching your filters.</p>
                  <button onClick={clearFilters} className="mt-4 text-secondary font-bold uppercase tracking-widest text-sm hover:underline">Clear all filters</button>
                </div>
              )}
            </div>

            {/* Pagination */}
            <div className="mt-16 flex items-center justify-center gap-2">
              <button className="p-2 border border-accent hover:bg-accent transition-colors disabled:opacity-50" disabled>
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button className="w-10 h-10 flex items-center justify-center text-xs font-bold bg-primary text-white border border-primary">1</button>
              <button className="w-10 h-10 flex items-center justify-center text-xs font-bold border border-accent hover:border-primary transition-colors">2</button>
              <button className="w-10 h-10 flex items-center justify-center text-xs font-bold border border-accent hover:border-primary transition-colors">3</button>
              <span className="px-2">...</span>
              <button className="w-10 h-10 flex items-center justify-center text-xs font-bold border border-accent hover:border-primary transition-colors">12</button>
              <button className="p-2 border border-accent hover:bg-accent transition-colors">
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </main>
        </div>
      </div>

      {/* Mobile Filter Drawer Overlay */}
      <AnimatePresence>
        {isFilterDrawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-50 lg:hidden"
              onClick={() => setIsFilterDrawerOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed inset-y-0 left-0 w-[85%] max-w-sm bg-white z-[60] lg:hidden p-6 overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-8 border-b border-accent pb-4">
                <h2 className="text-xl font-heading">Filters</h2>
                <button onClick={() => setIsFilterDrawerOpen(false)}><X className="h-6 w-6" /></button>
              </div>

              <div className="space-y-8 pb-10">
                {/* Categories */}
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider mb-4">Category</h3>
                  <div className="space-y-3">
                    {["Men's Fashion", "Women's Fashion", "Skincare"].map(cat => (
                      <label key={cat} className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(cat)}
                          onChange={() => toggleCategory(cat)}
                          className="w-5 h-5 accent-secondary"
                        />
                        <span className="text-sm">{cat}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Sizes */}
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider mb-4">Size</h3>
                  <div className="flex flex-wrap gap-2">
                    {['XS', 'S', 'M', 'L', 'XL', 'XXL', '100ml', '200ml'].map(size => (
                      <button
                        key={size}
                        onClick={() => setSelectedSizes(prev => prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size])}
                        className={`px-4 py-2 text-xs border transition-all ${selectedSizes.includes(size) ? 'bg-primary text-white' : 'bg-white border-accent'
                          }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price */}
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider mb-4">Price</h3>
                  <div className="flex items-center gap-4">
                    <input type="number" value={priceRange[0]} className="w-full px-4 py-3 text-sm border border-accent" placeholder="Min" />
                    <input type="number" value={priceRange[1]} className="w-full px-4 py-3 text-sm border border-accent" placeholder="Max" />
                  </div>
                </div>
              </div>

              <div className="sticky bottom-0 left-0 right-0 bg-white pt-4 border-t border-accent flex gap-4">
                <button onClick={clearFilters} className="flex-1 py-4 text-xs uppercase tracking-widest font-bold border border-accent">Clear</button>
                <button onClick={() => setIsFilterDrawerOpen(false)} className="flex-1 py-4 text-xs uppercase tracking-widest font-bold bg-primary text-white">Apply</button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Shop;
