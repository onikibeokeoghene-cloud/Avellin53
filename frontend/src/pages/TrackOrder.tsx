import { Helmet } from 'react-helmet-async';
import { Package, Search, Truck, CheckCircle } from 'lucide-react';
import { useState } from 'react';

const TrackOrder = () => {
  const [orderId, setOrderId] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<any>(null);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock tracking data
    setStatus({
      id: orderId || 'AVL-88293',
      currentStatus: 'In Transit',
      steps: [
        { title: 'Order Placed', date: 'Oct 12, 2024', completed: true },
        { title: 'Processing', date: 'Oct 13, 2024', completed: true },
        { title: 'Shipped', date: 'Oct 14, 2024', completed: true },
        { title: 'In Transit', date: 'Oct 15, 2024', completed: false },
        { title: 'Delivered', date: 'Estimated Oct 17', completed: false },
      ]
    });
  };

  return (
    <div className="bg-bg-light min-h-screen py-24">
      <Helmet>
        <title>Track Your Order — AVELLIN</title>
      </Helmet>
      
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <Package className="w-12 h-12 text-secondary mx-auto mb-6" />
          <h1 className="text-5xl font-heading text-primary uppercase tracking-[0.3em]">Track Order</h1>
          <div className="h-1 w-24 bg-secondary mx-auto mt-8" />
        </div>

        <div className="bg-white border border-accent p-8 md:p-12 shadow-sm mb-12">
          <form onSubmit={handleTrack} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-text-light">Order ID</label>
                <input 
                  required
                  type="text" 
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  className="w-full border-b border-accent py-3 focus:outline-none focus:border-secondary transition-colors font-body" 
                  placeholder="e.g. AVL-12345"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-text-light">Email Address</label>
                <input 
                  required
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border-b border-accent py-3 focus:outline-none focus:border-secondary transition-colors font-body" 
                  placeholder="Enter your order email"
                />
              </div>
            </div>
            <button 
              type="submit"
              className="w-full bg-primary text-white py-5 px-10 text-xs uppercase tracking-[0.2em] font-bold hover:bg-secondary transition-all shadow-xl flex items-center justify-center gap-3"
            >
              <Search className="w-4 h-4" /> Track My Package
            </button>
          </form>
        </div>

        {status && (
          <div className="bg-white border border-accent p-8 md:p-12 shadow-sm animate-fade-in">
            <div className="flex justify-between items-center mb-10 pb-6 border-b border-accent">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-text-light font-bold mb-1">Order Status</p>
                <h3 className="font-heading text-2xl text-primary">{status.currentStatus}</h3>
              </div>
              <div className="text-right">
                <p className="text-[10px] uppercase tracking-widest text-text-light font-bold mb-1">Tracking ID</p>
                <h3 className="font-heading text-xl text-secondary">{status.id}</h3>
              </div>
            </div>

            <div className="relative">
              {status.steps.map((step: any, index: number) => (
                <div key={index} className="flex gap-6 mb-8 last:mb-0">
                  <div className="relative flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center z-10 ${step.completed ? 'bg-secondary text-white' : 'bg-bg-light border border-accent text-text-light'}`}>
                      {step.completed ? <CheckCircle className="w-5 h-5" /> : <Truck className="w-4 h-4" />}
                    </div>
                    {index < status.steps.length - 1 && (
                      <div className={`w-0.5 h-full absolute top-8 ${step.completed ? 'bg-secondary' : 'bg-accent'}`} />
                    )}
                  </div>
                  <div>
                    <h4 className={`font-bold text-sm ${step.completed ? 'text-primary' : 'text-text-light'}`}>{step.title}</h4>
                    <p className="text-xs text-text-light mt-1">{step.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackOrder;
