import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  MapPin, 
  CreditCard, 
  Package, 
  Truck, 
  CheckCircle2, 
  Clock, 
  AlertCircle
} from 'lucide-react';

const ORDER_DETAIL = {
  id: 'AVL-748392',
  date: 'Oct 15, 2025',
  status: 'Processing',
  items: [
    { name: 'Lagos Silk Kaftan', size: 'M', color: 'Royal Gold', price: 45000, quantity: 1, image: 'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?q=80&w=300' },
    { name: 'Glow Vit-C Serum', size: '200ml', color: 'Default', price: 2500, quantity: 1, image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=300' }
  ],
  deliveryAddress: {
    name: 'Tunde Adebayor',
    street: '12 Admiralty Way',
    city: 'Lekki Phase 1',
    state: 'Lagos',
    phone: '080 123 4567'
  },
  payment: {
    method: 'Credit Card',
    cardEnding: '4242'
  },
  summary: {
    subtotal: 47500,
    shipping: 0,
    total: 47500
  }
};

const STEPS = [
  { name: 'Placed', icon: Clock, completed: true, current: false },
  { name: 'Confirmed', icon: CheckCircle2, completed: true, current: false },
  { name: 'Processing', icon: Package, completed: false, current: true },
  { name: 'Shipped', icon: Truck, completed: false, current: false },
  { name: 'Delivered', icon: MapPin, completed: false, current: false }
];

const OrderDetail = () => {
  const { orderId } = useParams();

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 0 }).format(amount);
  };

  return (
    <div className="bg-bg-light min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4">
        
        <Link to="/account/orders" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-text-light hover:text-secondary transition-colors mb-10">
          <ArrowLeft className="h-4 w-4" /> Back to Orders
        </Link>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-heading text-primary">Order {orderId}</h1>
            <p className="text-sm text-text-light mt-2">Placed on {ORDER_DETAIL.date}</p>
          </div>
          <div className="flex gap-4">
            <button className="px-6 py-3 border border-red-200 text-red-500 text-[10px] uppercase tracking-widest font-bold hover:bg-red-50 transition-colors">
              Cancel Order
            </button>
            <button className="px-6 py-3 bg-primary text-white text-[10px] uppercase tracking-widest font-bold hover:bg-secondary transition-colors">
              Help Center
            </button>
          </div>
        </div>

        {/* Status Timeline */}
        <div className="bg-white border border-accent p-8 mb-8 overflow-x-auto">
          <div className="min-w-[600px] flex items-center justify-between relative px-10">
            <div className="absolute left-10 right-10 top-5 h-0.5 bg-accent -z-0" />
            <div className="absolute left-10 w-[40%] top-5 h-0.5 bg-secondary -z-0" />
            
            {STEPS.map((step, idx) => (
              <div key={idx} className="flex flex-col items-center gap-3 relative z-10 bg-white px-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                  step.completed ? 'bg-secondary border-secondary text-primary' : 
                  step.current ? 'bg-primary border-primary text-white scale-110 shadow-lg' : 
                  'bg-white border-accent text-text-light'
                }`}>
                  <step.icon className="h-5 w-5" />
                </div>
                <span className={`text-[10px] uppercase tracking-widest font-bold ${
                  step.completed || step.current ? 'text-primary' : 'text-text-light'
                }`}>
                  {step.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Items */}
          <div className="space-y-6">
            <div className="bg-white border border-accent p-6 space-y-6">
              <h2 className="text-xs font-bold uppercase tracking-widest border-b border-accent pb-4">Order Items</h2>
              {ORDER_DETAIL.items.map((item, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="w-16 h-20 bg-accent flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-primary">{item.name}</p>
                    <p className="text-[10px] text-text-light uppercase mt-1">{item.size} | {item.color} | Qty: {item.quantity}</p>
                    <p className="text-xs font-bold mt-2">{formatPrice(item.price)}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white border border-accent p-6 space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-widest border-b border-accent pb-4">Order Summary</h2>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-text-light">Subtotal</span>
                  <span className="font-bold">{formatPrice(ORDER_DETAIL.summary.subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-light">Shipping</span>
                  <span className="font-bold">{ORDER_DETAIL.summary.shipping === 0 ? 'FREE' : formatPrice(ORDER_DETAIL.summary.shipping)}</span>
                </div>
                <div className="pt-4 border-t border-accent flex justify-between">
                  <span className="font-bold text-lg">Total</span>
                  <span className="font-bold text-lg text-primary">{formatPrice(ORDER_DETAIL.summary.total)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div className="bg-white border border-accent p-6 space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-widest border-b border-accent pb-4 flex items-center gap-2">
                <MapPin className="h-4 w-4" /> Delivery Address
              </h2>
              <div className="text-sm space-y-1">
                <p className="font-bold">{ORDER_DETAIL.deliveryAddress.name}</p>
                <p className="text-text-light">{ORDER_DETAIL.deliveryAddress.street}</p>
                <p className="text-text-light">{ORDER_DETAIL.deliveryAddress.city}, {ORDER_DETAIL.deliveryAddress.state}</p>
                <p className="text-text-light mt-4">Phone: {ORDER_DETAIL.deliveryAddress.phone}</p>
              </div>
            </div>

            <div className="bg-white border border-accent p-6 space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-widest border-b border-accent pb-4 flex items-center gap-2">
                <CreditCard className="h-4 w-4" /> Payment Details
              </h2>
              <div className="text-sm flex justify-between items-center">
                <p className="text-text-light">{ORDER_DETAIL.payment.method}</p>
                <div className="flex items-center gap-2">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" className="h-3" alt="Visa" />
                  <span className="font-bold">**** {ORDER_DETAIL.payment.cardEnding}</span>
                </div>
              </div>
            </div>

            <div className="bg-primary text-white p-6 space-y-4">
              <div className="flex items-center gap-3">
                <AlertCircle className="h-5 w-5 text-secondary" />
                <h3 className="text-xs font-bold uppercase tracking-widest">Need help with this order?</h3>
              </div>
              <p className="text-xs text-bg-light/80 leading-relaxed">
                If you have any issues with your delivery or items, please contact our support team. We're available 24/7.
              </p>
              <button className="w-full bg-secondary text-primary py-3 text-[10px] uppercase tracking-widest font-bold hover:bg-white transition-colors">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
