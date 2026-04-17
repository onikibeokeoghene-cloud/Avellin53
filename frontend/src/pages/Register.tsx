import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuthStore } from '../store/useAuthStore';
import { toast } from 'react-hot-toast';

const Register = () => {
  const navigate = useNavigate();
  const loginUser = useAuthStore(state => state.login);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const [passwordStrength, setPasswordStrength] = useState(0);

  useEffect(() => {
    let strength = 0;
    if (formData.password.length > 5) strength += 1;
    if (formData.password.match(/[a-z]/) && formData.password.match(/[A-Z]/)) strength += 1;
    if (formData.password.match(/[0-9]/)) strength += 1;
    if (formData.password.match(/[^a-zA-Z0-9]/)) strength += 1;
    setPasswordStrength(strength);
  }, [formData.password]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      return toast.error("Passwords don't match");
    }

    // Mock registration
    const user = {
      id: Math.random().toString(36).substr(2, 9),
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      role: 'customer' as const
    };

    loginUser(user);
    toast.success(`Welcome to AVELLIN, ${formData.fullName}!`, {
      style: { background: '#0A0A0A', color: '#F5F0E8', borderRadius: '0px' }
    });
    navigate('/');
  };

  const strengthLabels = ['Weak', 'Fair', 'Strong', 'Very Strong'];
  const strengthColors = ['bg-red-400', 'bg-yellow-400', 'bg-blue-400', 'bg-green-500'];

  return (
    <div className="bg-bg-light min-h-screen py-20 flex items-center justify-center px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white border border-accent p-10 shadow-xl"
      >
        <div className="text-center mb-10">
          <h1 className="text-4xl font-heading text-primary mb-2">Create Account</h1>
          <p className="text-sm text-text-light italic">Join the AVELLIN community</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest font-bold">Full Name</label>
            <div className="relative">
              <input 
                required
                type="text" 
                className="w-full border border-accent px-4 py-4 pl-12 text-sm focus:border-secondary outline-none transition-all"
                placeholder="Adebayo Tunde"
                value={formData.fullName}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
              />
              <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-text-light" />
            </div>
          </div>

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
            <label className="text-[10px] uppercase tracking-widest font-bold">Phone Number</label>
            <div className="relative">
              <input 
                required
                type="tel" 
                className="w-full border border-accent px-4 py-4 pl-12 text-sm focus:border-secondary outline-none transition-all"
                placeholder="08012345678"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-text-light" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest font-bold">Password</label>
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
            
            {/* Strength Indicator */}
            {formData.password && (
              <div className="space-y-1.5 pt-1">
                <div className="flex justify-between items-center text-[8px] uppercase tracking-tighter font-bold">
                  <span>Strength: {strengthLabels[passwordStrength - 1] || 'None'}</span>
                  <span>{passwordStrength}/4</span>
                </div>
                <div className="flex gap-1 h-1">
                  {[1, 2, 3, 4].map((i) => (
                    <div 
                      key={i} 
                      className={`flex-1 transition-all duration-500 ${
                        i <= passwordStrength ? strengthColors[passwordStrength - 1] : 'bg-accent/50'
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest font-bold">Confirm Password</label>
            <div className="relative">
              <input 
                required
                type="password" 
                className="w-full border border-accent px-4 py-4 pl-12 text-sm focus:border-secondary outline-none transition-all"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              />
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-text-light" />
            </div>
          </div>

          <div className="flex items-start gap-3 py-2">
            <input required type="checkbox" className="mt-1 accent-secondary" id="terms" />
            <label htmlFor="terms" className="text-xs text-text-light leading-relaxed">
              I agree to the <Link to="/terms" className="text-secondary font-bold hover:underline">Terms & Conditions</Link> and <Link to="/privacy" className="text-secondary font-bold hover:underline">Privacy Policy</Link>.
            </label>
          </div>

          <button 
            type="submit"
            className="w-full bg-primary text-white py-5 uppercase tracking-widest font-bold text-xs hover:bg-secondary transition-all shadow-xl"
          >
            Create Account
          </button>
        </form>

        <div className="mt-10 pt-10 border-t border-accent text-center">
          <p className="text-sm text-text-light">
            Already have an account? <Link to="/login" className="text-secondary font-bold hover:underline">Login</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
