import { useState } from 'react';
import { Heart, ShoppingBag, Star } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { useWishlistStore } from '../store/useWishlistStore';
import { useCartStore } from '../store/useCartStore';

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
}

interface ProductCardProps {
  product: Product;
  viewType?: 'grid' | 'list';
}

const ProductCard = ({ product, viewType = 'grid' }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { addItem: addToCartStore } = useCartStore();
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlistStore();

  const isOutOfStock = product.stock_quantity === 0;
  const isSale = product.compare_at_price && product.compare_at_price > product.price;
  const inWishlist = isInWishlist(product.id);

  const addToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isOutOfStock) return;

    addToCartStore({
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      image: product.image,
      category: product.category,
      size: 'M',
      color: 'Standard',
      quantity: 1,
      stock_quantity: product.stock_quantity
    });

    toast.success(`${product.name} added to cart!`, {
      style: { background: '#0A0A0A', color: '#F5F0E8', borderRadius: '0px' },
    });
  };

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    if (inWishlist) {
      removeFromWishlist(product.id);
      toast.success('Item removed from wishlist.', {
        style: { background: '#0A0A0A', color: '#F5F0E8', borderRadius: '0px' },
      });
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        slug: product.slug,
        price: product.price,
        image: product.image,
        category: product.category,
        stock_quantity: product.stock_quantity
      });
      toast.success('Added to wishlist', {
        icon: '❤️',
        style: { background: '#0A0A0A', color: '#F5F0E8', borderRadius: '0px' },
      });
    }
  };

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  if (viewType === 'list') {
    return (
      <Link
        to={`/product/${product.slug}`}
        className="flex flex-col sm:flex-row bg-white border border-accent group overflow-hidden"
      >
        <div className="relative w-full sm:w-48 lg:w-64 aspect-[3/4] overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {isOutOfStock && (
            <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
              <span className="bg-primary text-white text-[10px] px-3 py-1 uppercase tracking-widest font-bold">Sold Out</span>
            </div>
          )}
          {isSale && !isOutOfStock && (
            <div className="absolute top-4 left-4 bg-secondary text-white text-[10px] px-3 py-1 uppercase tracking-widest font-bold">
              Sale
            </div>
          )}
        </div>

        <div className="flex-1 p-6 flex flex-col justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-text-light font-bold mb-2 block">{product.category}</span>
            <h3 className="font-heading text-2xl text-primary mb-2 group-hover:text-secondary transition-colors">{product.name}</h3>
            <div className="flex items-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`h-3 w-3 ${i < product.rating ? 'fill-secondary text-secondary' : 'text-gray-200'}`} />
              ))}
              <span className="text-xs text-text-light ml-2">({product.reviewsCount} reviews)</span>
            </div>
            <div className="flex items-center gap-3 mb-6">
              {isSale ? (
                <>
                  <span className="text-xl font-bold text-secondary">{formatPrice(product.price)}</span>
                  <span className="text-sm text-text-light line-through">{formatPrice(product.compare_at_price!)}</span>
                </>
              ) : (
                <span className="text-xl font-bold text-primary">{formatPrice(product.price)}</span>
              )}
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={addToCart}
              disabled={isOutOfStock}
              className={`flex-1 py-4 text-xs uppercase tracking-widest font-bold transition-all flex items-center justify-center gap-2 ${isOutOfStock ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-primary text-white hover:bg-secondary shadow-lg'
                }`}
            >
              <ShoppingBag className="h-4 w-4" />
              {isOutOfStock ? 'Sold Out' : 'Add to Cart'}
            </button>
            <button
              onClick={toggleWishlist}
              className={`p-4 border transition-colors ${inWishlist ? 'text-red-500 bg-red-50 border-red-200' : 'border-accent hover:border-secondary hover:text-secondary'}`}
            >
              <Heart className={`h-5 w-5 ${inWishlist ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={`/product/${product.slug}`}
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[3/4] bg-accent overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {isOutOfStock && (
          <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px] flex items-center justify-center">
            <span className="bg-primary text-white text-[10px] px-3 py-1 uppercase tracking-widest font-bold">Sold Out</span>
          </div>
        )}

        {isSale && !isOutOfStock && (
          <div className="absolute top-4 left-4 bg-secondary text-white text-[10px] px-3 py-1 uppercase tracking-widest font-bold">
            Sale
          </div>
        )}

        <button
          onClick={toggleWishlist}
          className={`absolute right-4 top-4 z-10 p-2.5 rounded-full transition-all duration-300 shadow-sm ${inWishlist
              ? 'bg-white text-red-500'
              : 'bg-white/80 backdrop-blur-sm text-primary hover:bg-white hover:text-secondary'
            }`}
        >
          <Heart className={`h-4 w-4 ${inWishlist ? 'fill-current' : ''}`} />
        </button>

        <div className={`absolute inset-x-0 bottom-0 p-4 transition-transform duration-500 ${isHovered ? 'translate-y-0' : 'translate-y-full'}`}>
          <button
            onClick={addToCart}
            disabled={isOutOfStock}
            className={`w-full py-4 text-[10px] uppercase tracking-[0.2em] font-bold transition-all flex items-center justify-center gap-2 ${isOutOfStock
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-primary text-white hover:bg-secondary shadow-xl'
              }`}
          >
            <ShoppingBag className="h-4 w-4" />
            {isOutOfStock ? 'Sold Out' : 'Add to Cart'}
          </button>
        </div>
      </div>

      <div className="mt-5 text-center px-2">
        <p className="text-[10px] text-text-light uppercase tracking-[0.2em] mb-1.5 font-bold">{product.category}</p>
        <h3 className="font-heading text-lg text-primary line-clamp-1 group-hover:text-secondary transition-colors duration-300">{product.name}</h3>
        <div className="flex items-center justify-center gap-3 mt-2">
          {isSale ? (
            <>
              <span className="font-bold text-secondary">{formatPrice(product.price)}</span>
              <span className="text-xs text-text-light line-through decoration-red-400/50">{formatPrice(product.compare_at_price!)}</span>
            </>
          ) : (
            <span className="font-bold text-primary">{formatPrice(product.price)}</span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
