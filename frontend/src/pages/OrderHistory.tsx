import { Link } from 'react-router-dom';
import { 
  Package, 
  ChevronRight, 
  Box
} from 'lucide-react';

const ORDERS = [
  { id: 'AVL-748392', date: 'Oct 15, 2025', total: 47500, status: 'Processing', itemsCount: 2, color: 'text-blue-500 bg-blue-50' },
  { id: 'AVL-129485', date: 'Sep 28, 2025', total: 32000, status: 'Shipped', itemsCount: 1, color: 'text-secondary bg-secondary/10' },
  { id: 'AVL-993847', date: 'Aug 12, 2025', total: 85000, status: 'Delivered', itemsCount: 3, color: 'text-green-600 bg-green-50' },
  { id: 'AVL-445832', date: 'Jul 05, 2025', total: 12500, status: 'Cancelled', itemsCount: 1, color: 'text-red-500 bg-red-50' },
];

const OrderHistory = () => {
  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 0 }).format(amount);
  };

  return (
    <div className="bg-bg-light min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-heading text-primary mb-10">Order History</h1>
        
        <div className="space-y-4">
          {ORDERS.map((order) => (
            <Link 
              key={order.id}
              to={`/account/orders/${order.id}`}
              className="bg-white border border-accent p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6 hover:shadow-md transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-accent/30 rounded-full flex items-center justify-center">
                  <Package className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-bold text-primary group-hover:text-secondary transition-colors">{order.id}</p>
                  <p className="text-xs text-text-light">{order.date}</p>
                </div>
              </div>

              <div className="flex-1 sm:text-center">
                <p className="text-sm font-bold">{formatPrice(order.total)}</p>
                <p className="text-xs text-text-light">{order.itemsCount} items</p>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-6">
                <span className={`px-4 py-1.5 rounded-full text-[10px] uppercase tracking-widest font-bold ${order.color}`}>
                  {order.status}
                </span>
                <ChevronRight className="h-5 w-5 text-text-light group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

        {ORDERS.length === 0 && (
          <div className="text-center py-20 bg-white border border-accent">
            <Box className="h-12 w-12 text-accent mx-auto mb-4" />
            <p className="text-text-light">You haven't placed any orders yet.</p>
            <Link to="/shop" className="text-secondary font-bold uppercase tracking-widest text-xs mt-4 inline-block hover:underline">Start Shopping</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
