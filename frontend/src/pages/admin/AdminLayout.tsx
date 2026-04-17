import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Package, 
  Users, 
  LogOut, 
  Bell, 
  Search,
  Menu,
  X
} from 'lucide-react';
import { useState } from 'react';
import { useAuthStore } from '../../store/useAuthStore';

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, user } = useAuthStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  if (!user || user.role !== 'admin') {
    navigate('/login');
    return null;
  }

  const menuItems = [
    { name: 'Overview', path: '/admin', icon: LayoutDashboard },
    { name: 'Products', path: '/admin/products', icon: ShoppingBag },
    { name: 'Orders', path: '/admin/orders', icon: Package },
    { name: 'Users', path: '/admin/users', icon: Users },
  ];

  return (
    <div className="flex min-h-screen bg-bg-light">
      {/* Sidebar */}
      <aside className={`bg-primary text-white w-64 fixed inset-y-0 left-0 transition-transform duration-300 z-50 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className="p-6 border-b border-gray-800 flex justify-between items-center">
          <h1 className="text-2xl font-heading text-secondary tracking-widest font-bold">AVELLIN</h1>
          <button className="lg:hidden" onClick={() => setIsSidebarOpen(false)}>
            <X className="h-6 w-6 text-text-light" />
          </button>
        </div>
        
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => (
            <Link 
              key={item.name}
              to={item.path}
              className={`flex items-center gap-4 px-4 py-3 rounded-sm transition-all text-sm font-medium ${
                location.pathname === item.path ? 'bg-secondary text-primary' : 'text-gray-400 hover:text-white hover:bg-gray-900'
              }`}
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </Link>
          ))}
          
          <div className="pt-10">
            <button 
              onClick={() => logout()}
              className="flex items-center gap-4 px-4 py-3 rounded-sm text-red-400 hover:bg-red-500/10 w-full text-sm font-medium"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'lg:ml-64' : ''}`}>
        {/* Top Header */}
        <header className="bg-white border-b border-accent h-16 flex items-center justify-between px-8 sticky top-0 z-40">
          <button className="lg:hidden" onClick={() => setIsSidebarOpen(true)}>
            <Menu className="h-6 w-6" />
          </button>
          
          <div className="flex-1 max-w-md ml-8 hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-light" />
              <input type="text" placeholder="Search orders, products..." className="w-full bg-accent/20 border-none px-10 py-2 rounded-full text-sm focus:ring-1 focus:ring-secondary" />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button className="relative p-2 text-text-light hover:text-primary transition-colors">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
            </button>
            <div className="flex items-center gap-3 border-l border-accent pl-6">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold text-primary">{user.fullName}</p>
                <p className="text-[10px] text-text-light uppercase tracking-tighter">Administrator</p>
              </div>
              <div className="w-10 h-10 bg-accent flex items-center justify-center rounded-full font-bold text-primary">
                {user.fullName.charAt(0)}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
