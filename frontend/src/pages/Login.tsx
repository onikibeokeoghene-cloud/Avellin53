import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, LogIn, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuthStore } from '../store/useAuthStore';
import { toast } from 'react-hot-toast';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const loginUser = useAuthStore(state => state.login);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock login logic
    if (formData.email && formData.password) {
      const isAdmin = formData.email.includes('admin');
      const user = {
        id: '1',
        fullName: isAdmin ? 'AVELLIN Admin' : 'John Doe',
        email: formData.email,
        phone: '08012345678',
        role: (isAdmin ? 'admin' : 'customer') as 'admin' | 'customer'
      };

      loginUser(user);
      toast.success(`Welcome back, ${user.fullName}!`, {
        style: { background: '#0A0A0A', color: '#F5F0E8', borderRadius: '0px' }
      });
      
      const from = (location.state as any)?.from?.pathname || (isAdmin ? '/admin' : '/');
      navigate(from, { replace: true });
    }
  };

  return (
    <div className="bg-bg-light min-h-screen py-20 flex items-center justify-center px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white border border-accent p-10 shadow-xl"
      >
        <div className="text-center mb-10">
          <h1 className="text-4xl font-heading text-primary mb-2">Login</h1>
          <p className="text-sm text-text-light italic">Welcome back to AVELLIN</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest font-bold">Email Address</label>
            <div className="relative">
              <input 
                required
                type="email" 
                className="w-full border border-accent px-4 py-4 pl-12 text-sm focus:border-secondary outline-none transition-all"
                placeholder="example@mail.com"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-text-light" />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="text-[10px] uppercase tracking-widest font-bold">Password</label>
              <Link to="/forgot-password" title="Coming soon" className="text-[10px] uppercase tracking-widest font-bold text-secondary hover:underline">Forgot?</Link>
            </div>
            <div className="relative">
              <input 
                required
                type={showPassword ? "text" : "password"} 
                className="w-full border border-accent px-4 py-4 pl-12 pr-12 text-sm focus:border-secondary outline-none transition-all"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-text-light" />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-text-light hover:text-primary"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-2">
              <input 
                type="checkbox" 
                id="remember" 
                className="accent-secondary" 
                checked={formData.rememberMe}
                onChange={(e) => setFormData({...formData, rememberMe: e.target.checked})}
              />
              <label htmlFor="remember" className="text-xs text-text-light">Remember me</label>
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-primary text-white py-5 uppercase tracking-widest font-bold text-xs hover:bg-secondary transition-all shadow-xl flex items-center justify-center gap-3"
          >
            <LogIn className="h-4 w-4" /> Login
          </button>
        </form>

        <div className="mt-10 pt-10 border-t border-accent text-center">
          <p className="text-sm text-text-light">
            New to AVELLIN? <Link to="/register" className="text-secondary font-bold hover:underline">Create Account</Link>
          </p>
        </div>
        
        <div className="mt-6 flex items-center justify-center gap-2 text-green-600">
          <ShieldCheck className="h-4 w-4" />
          <span className="text-[10px] uppercase font-bold tracking-widest">Secure encrypted login</span>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
