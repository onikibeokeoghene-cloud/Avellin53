import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const NotFound = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-bg-light px-4">
      <Helmet>
        <title>404 Page Not Found — AVELLIN</title>
      </Helmet>
      
      <div className="text-center max-w-lg space-y-8">
        <h1 className="text-9xl font-heading text-secondary/20 select-none">404</h1>
        <div className="space-y-4">
          <h2 className="text-4xl font-heading text-primary uppercase tracking-tighter">Lost in Style?</h2>
          <p className="text-text-light text-lg">
            The page you're looking for doesn't exist or has been moved to a new collection.
          </p>
        </div>
        
        <div className="pt-6">
          <Link 
            to="/" 
            className="inline-flex items-center gap-3 bg-primary text-white px-10 py-5 font-bold uppercase tracking-widest hover:bg-secondary transition-all duration-300 shadow-xl"
          >
            <Home className="h-5 w-5" /> Return Home
          </Link>
        </div>
        
        <div className="flex flex-wrap justify-center gap-6 pt-10 border-t border-accent">
          <Link to="/shop" className="text-xs uppercase tracking-[0.2em] font-bold text-primary hover:text-secondary transition-colors">Shop All</Link>
          <Link to="/category/men" className="text-xs uppercase tracking-[0.2em] font-bold text-primary hover:text-secondary transition-colors">Men</Link>
          <Link to="/category/women" className="text-xs uppercase tracking-[0.2em] font-bold text-primary hover:text-secondary transition-colors">Women</Link>
          <Link to="/category/skincare" className="text-xs uppercase tracking-[0.2em] font-bold text-primary hover:text-secondary transition-colors">Skincare</Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
