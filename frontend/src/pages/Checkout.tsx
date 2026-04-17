import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronRight, 
  MapPin, 
  Truck, 
  CreditCard, 
  ShieldCheck, 
  ChevronLeft,
  Loader2
} from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';

const NIGERIAN_STATES = [
  'Lagos', 'Abuja (FCT)', 'Rivers', 'Oyo', 'Anambra', 'Kano', 'Kaduna', 'Edo', 'Delta', 'Ogun',
  'Abia', 'Adamawa', 'Akwa Ibom', 'Bauchi', 'Bayelsa', 'Benue', 'Borno', 'Cross River', 'Ebonyi',
  'Ekiti', 'Enugu', 'Gombe', 'Imo', 'Jigawa', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Nasarawa',
  'Niger', 'Ondo', 'Osun', 'Plateau', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara'
];

const Checkout = () => {
  const navigate = useNavigate();
  const { items, getSubtotal, getDeliveryFee, getTotal, clearCart } = useCartStore();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // Form States
  const [formData, setFormData] = useState({
    fullName: '', email: '', phone: '', address: '', city: '', state: 'Lagos', notes: '',
    deliveryMethod: 'standard',
    cardNumber: '', cardHolder: '', expiry: '', cvc: ''
  });

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) return parts.join(' ');
    return value;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'cardNumber') {
      setFormData(prev => ({ ...prev, [name]: formatCardNumber(value) }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    setIsLoading(false);
    toast.success('Payment Successful!');
    
    // In a real app, we'd save the order here
    const orderNumber = `AVL-${Math.floor(100000 + Math.random() * 900000)}`;
    navigate('/order/confirmation', { state: { orderNumber, email: formData.email, total: getTotal() } });
    clearCart();
  };

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 0 }).format(amount);
  };

  if (items.length === 0 && step !== 4) {
    useEffect(() => { navigate('/cart'); }, []);
    return null;
  }

  const steps = [
    { id: 1, name: 'Delivery', icon: MapPin },
    { id: 2, name: 'Method', icon: Truck },
    { id: 3, name: 'Payment', icon: CreditCard }
  ];

  return (
    <div className="bg-bg-light min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Progress Indicator */}
        <div className="max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 top-1/2 h-0.5 w-full bg-accent -translate-y-1/2 -z-10" />
            <div 
              className="absolute left-0 top-1/2 h-0.5 bg-secondary transition-all duration-500 -translate-y-1/2 -z-10" 
              style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
            />
            {steps.map((s) => (
              <div key={s.id} className="flex flex-col items-center gap-2 bg-bg-light px-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                  step >= s.id ? 'bg-secondary border-secondary text-primary' : 'bg-white border-accent text-text-light'
                }`}>
                  <s.icon className="h-5 w-5" />
                </div>
                <span className={`text-[10px] uppercase tracking-widest font-bold ${step >= s.id ? 'text-primary' : 'text-text-light'}`}>
                  {s.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Form Area */}
          <div className="lg:w-[65%]">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div 
                  key="step1"
                  initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                  className="bg-white border border-accent p-8 space-y-6"
                >
                  <h2 className="text-2xl font-heading text-primary border-b border-accent pb-4">Delivery Details</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold">Full Name</label>
                      <input name="fullName" value={formData.fullName} onChange={handleInputChange} type="text" className="w-full border border-accent px-4 py-3 text-sm focus:border-secondary outline-none" placeholder="John Doe" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold">Email Address</label>
                      <input name="email" value={formData.email} onChange={handleInputChange} type="email" className="w-full border border-accent px-4 py-3 text-sm focus:border-secondary outline-none" placeholder="john@example.com" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold">Phone Number</label>
                      <input name="phone" value={formData.phone} onChange={handleInputChange} type="tel" className="w-full border border-accent px-4 py-3 text-sm focus:border-secondary outline-none" placeholder="080 123 4567" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold">State</label>
                      <select name="state" value={formData.state} onChange={handleInputChange} className="w-full border border-accent px-4 py-3 text-sm focus:border-secondary outline-none appearance-none bg-white">
                        {NIGERIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold">Delivery Address</label>
                      <input name="address" value={formData.address} onChange={handleInputChange} type="text" className="w-full border border-accent px-4 py-3 text-sm focus:border-secondary outline-none" placeholder="Street name and number" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold">City</label>
                      <input name="city" value={formData.city} onChange={handleInputChange} type="text" className="w-full border border-accent px-4 py-3 text-sm focus:border-secondary outline-none" placeholder="Lekki" />
                    </div>
                  </div>
                  <div className="pt-6 border-t border-accent flex justify-end">
                    <button onClick={nextStep} className="bg-primary text-white px-10 py-4 uppercase tracking-widest font-bold text-xs hover:bg-secondary transition-colors flex items-center gap-2">
                      Continue to Shipping <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div 
                  key="step2"
                  initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                  className="bg-white border border-accent p-8 space-y-6"
                >
                  <h2 className="text-2xl font-heading text-primary border-b border-accent pb-4">Shipping Method</h2>
                  <div className="space-y-4">
                    <label className={`flex items-center justify-between p-6 border-2 cursor-pointer transition-all ${
                      formData.deliveryMethod === 'standard' ? 'border-secondary bg-secondary/5' : 'border-accent hover:border-secondary/50'
                    }`}>
                      <div className="flex items-center gap-4">
                        <input type="radio" name="deliveryMethod" checked={formData.deliveryMethod === 'standard'} onChange={() => setFormData(p => ({ ...p, deliveryMethod: 'standard' }))} className="accent-secondary h-5 w-5" />
                        <div>
                          <p className="font-bold text-sm">Standard Delivery</p>
                          <p className="text-xs text-text-light">3-5 business days</p>
                        </div>
                      </div>
                      <span className="font-bold text-sm">{getDeliveryFee() === 0 ? 'FREE' : formatPrice(2500)}</span>
                    </label>

                    <label className={`flex items-center justify-between p-6 border-2 cursor-pointer transition-all ${
                      formData.deliveryMethod === 'express' ? 'border-secondary bg-secondary/5' : 'border-accent hover:border-secondary/50'
                    }`}>
                      <div className="flex items-center gap-4">
                        <input type="radio" name="deliveryMethod" checked={formData.deliveryMethod === 'express'} onChange={() => setFormData(p => ({ ...p, deliveryMethod: 'express' }))} className="accent-secondary h-5 w-5" />
                        <div>
                          <p className="font-bold text-sm">Express Delivery</p>
                          <p className="text-xs text-text-light">1-2 business days (Lagos/Abuja/PH)</p>
                        </div>
                      </div>
                      <span className="font-bold text-sm">{formatPrice(5000)}</span>
                    </label>

                    <div className="flex items-center justify-between p-6 border-2 border-accent opacity-50 bg-accent/10 cursor-not-allowed">
                      <div className="flex items-center gap-4">
                        <div className="w-5 h-5 rounded-full border border-accent" />
                        <div>
                          <p className="font-bold text-sm">Click & Collect</p>
                          <p className="text-xs text-text-light">Coming soon</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="pt-6 border-t border-accent flex justify-between">
                    <button onClick={prevStep} className="text-primary px-6 py-4 uppercase tracking-widest font-bold text-xs flex items-center gap-2">
                      <ChevronLeft className="h-4 w-4" /> Back
                    </button>
                    <button onClick={nextStep} className="bg-primary text-white px-10 py-4 uppercase tracking-widest font-bold text-xs hover:bg-secondary transition-colors flex items-center gap-2">
                      Continue to Payment <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div 
                  key="step3"
                  initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                  className="bg-white border border-accent p-8 space-y-6"
                >
                  <h2 className="text-2xl font-heading text-primary border-b border-accent pb-4">Payment Method</h2>
                  <form onSubmit={handlePayment} className="space-y-6">
                    <div className="bg-accent/20 p-6 space-y-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-[10px] uppercase tracking-widest font-bold">Credit / Debit Card</span>
                        <div className="flex gap-2">
                          <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" className="h-4" alt="Visa" />
                          <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className="h-4" alt="Mastercard" />
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-[10px] uppercase tracking-widest font-bold">Card Number</label>
                          <div className="relative">
                            <input 
                              name="cardNumber" 
                              required
                              maxLength={19}
                              value={formData.cardNumber} 
                              onChange={handleInputChange} 
                              type="text" 
                              className="w-full border border-accent px-4 py-3 text-sm focus:border-secondary outline-none pr-12" 
                              placeholder="0000 0000 0000 0000" 
                            />
                            <CreditCard className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-text-light" />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest font-bold">Expiry (MM/YY)</label>
                            <input name="expiry" required maxLength={5} value={formData.expiry} onChange={handleInputChange} type="text" className="w-full border border-accent px-4 py-3 text-sm focus:border-secondary outline-none" placeholder="12/26" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest font-bold">CVV</label>
                            <input name="cvc" required maxLength={3} value={formData.cvc} onChange={handleInputChange} type="password" className="w-full border border-accent px-4 py-3 text-sm focus:border-secondary outline-none" placeholder="123" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] uppercase tracking-widest font-bold">Cardholder Name</label>
                          <input name="cardHolder" required value={formData.cardHolder} onChange={handleInputChange} type="text" className="w-full border border-accent px-4 py-3 text-sm focus:border-secondary outline-none uppercase" placeholder="JOHN DOE" />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 p-4 bg-green-50 border border-green-100 rounded-sm">
                      <ShieldCheck className="h-5 w-5 text-green-600" />
                      <p className="text-[10px] text-green-800 font-medium">Your payment is secured with 256-bit AES encryption</p>
                    </div>

                    <div className="pt-6 border-t border-accent flex justify-between">
                      <button type="button" onClick={prevStep} className="text-primary px-6 py-4 uppercase tracking-widest font-bold text-xs flex items-center gap-2">
                        <ChevronLeft className="h-4 w-4" /> Back
                      </button>
                      <button 
                        type="submit"
                        disabled={isLoading}
                        className="bg-primary text-white px-12 py-4 uppercase tracking-widest font-bold text-xs hover:bg-secondary transition-all disabled:opacity-50 flex items-center gap-3 shadow-xl"
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" /> Processing...
                          </>
                        ) : (
                          <>Pay Now — {formatPrice(getTotal() + (formData.deliveryMethod === 'express' ? 5000 : 0))}</>
                        )}
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Column: Order Summary Recap */}
          <div className="lg:w-[35%]">
            <div className="bg-white border border-accent p-6 space-y-6">
              <h2 className="text-lg font-heading text-primary border-b border-accent pb-4">Order Summary</h2>
              <div className="space-y-4 max-h-60 overflow-y-auto pr-2 no-scrollbar">
                {items.map(item => (
                  <div key={`${item.id}-${item.size}`} className="flex gap-4">
                    <div className="w-16 h-20 bg-accent flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-primary truncate">{item.name}</p>
                      <p className="text-[10px] text-text-light uppercase tracking-tighter">{item.size} | {item.color} | Qty: {item.quantity}</p>
                      <p className="text-xs font-bold mt-1">{formatPrice(item.price * item.quantity)}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="space-y-3 pt-4 border-t border-accent">
                <div className="flex justify-between text-xs">
                  <span className="text-text-light">Subtotal</span>
                  <span className="font-bold">{formatPrice(getSubtotal())}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-text-light">Shipping</span>
                  <span className="font-bold">
                    {formData.deliveryMethod === 'express' ? formatPrice(5000) : (getDeliveryFee() === 0 ? 'FREE' : formatPrice(2500))}
                  </span>
                </div>
                <div className="flex justify-between text-lg pt-4 border-t border-accent">
                  <span className="font-bold">Total</span>
                  <span className="font-bold text-primary">
                    {formatPrice(getTotal() + (formData.deliveryMethod === 'express' ? (5000 - getDeliveryFee()) : 0))}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
