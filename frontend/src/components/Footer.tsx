import { Link } from 'react-router-dom';
import { MessageCircle, Lock, RefreshCw, ShieldCheck, MapPin } from 'lucide-react';

// Using MessageCircle as TikTok alternative and MapPin as Nigerian Brand alternative for lucide-react standard icons

const Footer = () => {
  return (
    <footer className="bg-primary text-bg-light pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Newsletter Section */}
        <div className="flex flex-col md:flex-row justify-between items-center border-b border-gray-800 pb-12 mb-12">
          <div className="mb-6 md:mb-0 md:w-1/2">
            <h3 className="font-heading text-4xl font-semibold mb-3">Join AVELLIN</h3>
            <p className="text-gray-400 text-sm max-w-sm">Get 10% off your first order and exclusive access to new luxury drops.</p>
          </div>
          <div className="w-full md:w-1/2 max-w-md flex group">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="w-full bg-gray-900/50 border border-gray-700 px-6 py-4 text-sm focus:outline-none focus:border-secondary text-white transition-all"
            />
            <button className="bg-secondary text-primary font-bold px-8 py-4 text-xs hover:bg-white transition-all uppercase tracking-[0.2em]">
              Subscribe
            </button>
          </div>
        </div>

        {/* 4 Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div>
            <h4 className="font-heading text-2xl font-bold text-secondary tracking-[0.3em] mb-8">AVELLIN</h4>
            <p className="text-gray-400 text-sm leading-relaxed">
              Premium fashion and clinical skincare curated for the modern Nigerian. Merging global luxury aesthetics with local sensibilities since 2024.
            </p>
          </div>
          
          <div>
            <h4 className="font-heading text-lg font-semibold mb-8 border-b border-gray-800 pb-2">Shop</h4>
            <ul className="space-y-4">
              <li><Link to="/new-arrivals" className="text-gray-400 hover:text-secondary text-sm transition-colors">New Arrivals</Link></li>
              <li><Link to="/category/men" className="text-gray-400 hover:text-secondary text-sm transition-colors">Men's Collection</Link></li>
              <li><Link to="/category/women" className="text-gray-400 hover:text-secondary text-sm transition-colors">Women's Collection</Link></li>
              <li><Link to="/category/skincare" className="text-gray-400 hover:text-secondary text-sm transition-colors">Premium Skincare</Link></li>
              <li><Link to="/sale" className="text-gray-400 hover:text-secondary text-sm transition-colors">Sale</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-lg font-semibold mb-8 border-b border-gray-800 pb-2">Customer Service</h4>
            <ul className="space-y-4">
              <li><Link to="/faq" className="text-gray-400 hover:text-secondary text-sm transition-colors">FAQ</Link></li>
              <li><Link to="/returns-exchanges" className="text-gray-400 hover:text-secondary text-sm transition-colors">Returns & Exchanges</Link></li>
              <li><Link to="/track-order" className="text-gray-400 hover:text-secondary text-sm transition-colors">Track Order</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-secondary text-sm transition-colors">Contact Us</Link></li>
              <li><Link to="/shipping" className="text-gray-400 hover:text-secondary text-sm transition-colors">Shipping Information</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-lg font-semibold mb-8 border-b border-gray-800 pb-2">Connect</h4>
            <div className="flex space-x-4 mb-8">
              <a href="https://instagram.com/avellin" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-gray-900 flex items-center justify-center text-white hover:bg-secondary hover:text-primary transition-all font-bold border border-gray-800">
                IG
              </a>
              <a href="https://tiktok.com/@avellin" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-gray-900 flex items-center justify-center text-white hover:bg-secondary hover:text-primary transition-all font-bold border border-gray-800">
                <span className="font-bold">t</span>
              </a>
              <a href="https://wa.me/2348100000000" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-gray-900 flex items-center justify-center text-white hover:bg-secondary hover:text-primary transition-all border border-gray-800">
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
            <p className="text-gray-400 text-sm italic font-heading">Lekki Phase 1, Lagos, Nigeria</p>
          </div>
        </div>

        {/* Trust Badges Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-t border-b border-gray-800 mb-8">
          <div className="flex flex-col items-center text-center">
            <Lock className="w-6 h-6 text-secondary mb-3" />
            <span className="text-sm font-medium">Secure Checkout</span>
          </div>
          <div className="flex flex-col items-center text-center">
            <RefreshCw className="w-6 h-6 text-secondary mb-3" />
            <span className="text-sm font-medium">Free Returns</span>
          </div>
          <div className="flex flex-col items-center text-center">
            <ShieldCheck className="w-6 h-6 text-secondary mb-3" />
            <span className="text-sm font-medium">Verified Products</span>
          </div>
          <div className="flex flex-col items-center text-center">
            <MapPin className="w-6 h-6 text-secondary mb-3" />
            <span className="text-sm font-medium">Nigerian Brand</span>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>&copy; 2025 AVELLIN. All rights reserved.</p>
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <span className="border-l border-gray-700 pl-6">Prices in NGN (₦)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
