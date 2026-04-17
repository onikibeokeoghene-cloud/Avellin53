import { 
  Users, 
  ShoppingBag, 
  CreditCard, 
  AlertTriangle, 
  ArrowUpRight, 
  ArrowDownRight,
  Package
} from 'lucide-react';

const AdminOverview = () => {
  const stats = [
    { name: 'Total Revenue', value: '₦12,450,000', change: '+12.5%', isUp: true, icon: CreditCard },
    { name: 'Total Orders', value: '1,284', change: '+8.2%', isUp: true, icon: Package },
    { name: 'Total Products', value: '156', change: '+3.1%', isUp: true, icon: ShoppingBag },
    { name: 'Total Customers', value: '842', change: '+15.4%', isUp: true, icon: Users },
  ];

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-heading text-primary">Dashboard Overview</h1>
        <div className="flex items-center gap-4 bg-white border border-accent px-4 py-2 rounded-sm text-sm font-medium">
          <span className="text-text-light">Oct 1, 2025 - Oct 31, 2025</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white border border-accent p-6 shadow-sm group hover:border-secondary transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-accent/20 rounded-sm text-primary">
                <stat.icon className="h-5 w-5" />
              </div>
              <div className={`flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${stat.isUp ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {stat.isUp ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                {stat.change}
              </div>
            </div>
            <p className="text-xs font-bold uppercase tracking-widest text-text-light mb-1">{stat.name}</p>
            <p className="text-2xl font-bold text-primary">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Orders Table */}
        <div className="lg:col-span-2 bg-white border border-accent shadow-sm">
          <div className="p-6 border-b border-accent flex justify-between items-center">
            <h2 className="text-lg font-heading text-primary">Recent Orders</h2>
            <button className="text-xs font-bold uppercase tracking-widest text-secondary hover:underline">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-bg-light">
                <tr className="text-[10px] uppercase tracking-widest font-bold text-text-light border-b border-accent">
                  <th className="p-6">Order ID</th>
                  <th className="p-6">Customer</th>
                  <th className="p-6">Amount</th>
                  <th className="p-6">Status</th>
                  <th className="p-6">Date</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {[1, 2, 3, 4, 5].map((i) => (
                  <tr key={i} className="border-b border-accent hover:bg-accent/10 transition-colors">
                    <td className="p-6 font-bold">AVL-7483{i}</td>
                    <td className="p-6 text-text-light">Adebayo Tunde</td>
                    <td className="p-6 font-medium">₦45,000</td>
                    <td className="p-6">
                      <span className="px-3 py-1 bg-secondary/10 text-secondary text-[10px] font-bold uppercase tracking-tighter rounded-full">Processing</span>
                    </td>
                    <td className="p-6 text-text-light">20 Oct, 2025</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Low Stock Alerts */}
        <div className="space-y-6">
          <div className="bg-white border border-accent shadow-sm">
            <div className="p-6 border-b border-accent flex items-center justify-between">
              <h2 className="text-lg font-heading text-primary flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-500" /> Low Stock
              </h2>
            </div>
            <div className="p-6 space-y-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-accent/30 rounded-sm overflow-hidden flex-shrink-0">
                    <img src={`https://images.unsplash.com/photo-${1515372039744 + i}?q=80&w=100`} alt="Product" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-primary truncate">Royal Silk Tunic</p>
                    <p className="text-xs text-text-light">Skincare | 250ml</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-red-500">{i * 2} left</p>
                  </div>
                </div>
              ))}
              <button className="w-full py-3 text-xs font-bold uppercase tracking-widest border border-accent hover:bg-accent transition-all">Restock All</button>
            </div>
          </div>

          <div className="bg-primary text-white p-8 space-y-4">
            <h3 className="text-xl font-heading text-secondary">Sales Target</h3>
            <p className="text-xs text-gray-400">Monthly goal: ₦15M</p>
            <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
              <div className="h-full bg-secondary w-[83%] rounded-full" />
            </div>
            <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-widest pt-2">
              <span>83% Complete</span>
              <span>₦2.55M Left</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
