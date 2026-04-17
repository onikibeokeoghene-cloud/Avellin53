import { useLocation, Link, useNavigate } from 'react-router-dom';
import { CheckCircle2, Package, Truck, ShoppingBag, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect } from 'react';

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const orderData = location.state;

  useEffect(() => {
    if (!orderData) {
      navigate('/');
    }
  }, [orderData, navigate]);

  if (!orderData) return null;

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 0 }).format(amount);
  };

  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 4); // Estimated 4 days later

  return (
    <div className="bg-bg-light min-h-screen py-20">
      <div className="max-w-3xl mx-auto px-4 text-center">
        
        {/* Animated Checkmark */}
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8"
        >
          <CheckCircle2 className="h-12 w-12 text-green-600" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h1 className="text-4xl md:text-5xl font-heading text-primary mb-4">Order Confirmed!</h1>
          <p className="text-text-light mb-10">Thank you for shopping with AVELLIN. Your order has been placed successfully.</p>
        </motion.div>

        {/* Order Details Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white border border-accent p-8 text-left space-y-8 mb-12 shadow-sm"
        >
          <div className="flex justify-between items-center border-b border-accent pb-6">
            <div>
              <p className="text-[10px] uppercase tracking-widest font-bold text-text-light">Order Number</p>
              <p className="text-xl font-bold text-primary">{orderData.orderNumber}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] uppercase tracking-widest font-bold text-text-light">Amount Paid</p>
              <p className="text-xl font-bold text-secondary">{formatPrice(orderData.total)}</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Package className="h-5 w-5 text-secondary" />
                <h3 className="text-xs font-bold uppercase tracking-widest">Expected Delivery</h3>
              </div>
              <p className="text-sm font-medium text-primary">
                {deliveryDate.toLocaleDateString('en-NG', { weekday: 'long', month: 'long', day: 'numeric' })}
              </p>
              <p className="text-xs text-text-light leading-relaxed">Standard Shipping typically takes 3-5 business days.</p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-secondary" />
                <h3 className="text-xs font-bold uppercase tracking-widest">Order Updates</h3>
              </div>
              <p className="text-sm font-medium text-primary">Sent to {orderData.email}</p>
              <p className="text-xs text-text-light leading-relaxed">A confirmation email has been sent to your inbox. Please check your spam folder if you don't see it.</p>
            </div>
          </div>
        </motion.div>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link 
            to="/account/orders"
            className="bg-primary text-white px-10 py-4 uppercase tracking-widest font-bold text-xs hover:bg-secondary transition-all flex items-center justify-center gap-2"
          >
            Track Your Order <Truck className="h-4 w-4" />
          </Link>
          <Link 
            to="/shop"
            className="border border-primary text-primary px-10 py-4 uppercase tracking-widest font-bold text-xs hover:bg-primary hover:text-white transition-all flex items-center justify-center gap-2"
          >
            Continue Shopping <ShoppingBag className="h-4 w-4" />
          </Link>
        </div>

      </div>
    </div>
  );
};

export default OrderConfirmation;
