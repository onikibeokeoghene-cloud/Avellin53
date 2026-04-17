import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  User, 
  Package, 
  Heart, 
  MapPin, 
  LogOut, 
  ChevronRight, 
  Edit2, 
  Plus, 
  ShoppingBag,
  Trash2
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuthStore } from '../store/useAuthStore';
import { toast } from 'react-hot-toast';

const UserDashboard = () => {
  const navigate = useNavigate();
  const { user, logout, updateUser } = useAuthStore();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ ...user });

  const handleLogout = () => {
    logout();
    toast.success('Successfully logged out');
    navigate('/');
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser(editData);
    setIsEditing(false);
    toast.success('Profile updated successfully');
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'orders', name: 'My Orders', icon: Package },
    { id: 'wishlist', name: 'My Wishlist', icon: Heart },
    { id: 'addresses', name: 'Saved Addresses', icon: MapPin }
  ];

  return (
    <div className="bg-bg-light min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Sidebar Navigation */}
          <aside className="lg:w-1/4 space-y-2">
            <div className="bg-white border border-accent p-8 mb-6 flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-accent/30 rounded-full flex items-center justify-center mb-4 text-primary font-bold text-2xl">
                {user.fullName.charAt(0)}
              </div>
              <h2 className="text-xl font-heading text-primary">{user.fullName}</h2>
              <p className="text-xs text-text-light">{user.email}</p>
              <div className="mt-4 px-3 py-1 bg-secondary/10 text-secondary rounded-full text-[10px] uppercase font-bold tracking-widest">
                {user.role} Account
              </div>
            </div>

            {tabs.map(tab => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center justify-between p-4 text-sm font-medium transition-all border ${
                  activeTab === tab.id ? 'bg-primary text-white border-primary shadow-lg' : 'bg-white text-text-light border-accent hover:border-secondary'
                }`}
              >
                <div className="flex items-center gap-3">
                  <tab.icon className="h-4 w-4" />
                  {tab.name}
                </div>
                <ChevronRight className="h-4 w-4" />
              </button>
            ))}

            <button 
              onClick={handleLogout}
              className="w-full flex items-center gap-3 p-4 text-sm font-bold text-red-500 hover:bg-red-50 transition-all mt-10 border border-transparent hover:border-red-100"
            >
              <LogOut className="h-4 w-4" /> Logout
            </button>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 bg-white border border-accent shadow-sm overflow-hidden min-h-[600px]">
            <div className="p-8 lg:p-12">
              
              {activeTab === 'profile' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-10">
                  <div className="flex justify-between items-center border-b border-accent pb-6">
                    <h3 className="text-2xl font-heading text-primary">Personal Information</h3>
                    {!isEditing && (
                      <button onClick={() => setIsEditing(true)} className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-secondary hover:text-primary transition-colors">
                        <Edit2 className="h-3 w-3" /> Edit Profile
                      </button>
                    )}
                  </div>

                  {isEditing ? (
                    <form onSubmit={handleUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl">
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest font-bold">Full Name</label>
                        <input type="text" className="w-full border border-accent px-4 py-3 text-sm focus:border-secondary outline-none" value={editData.fullName} onChange={e => setEditData({...editData, fullName: e.target.value})} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest font-bold">Phone Number</label>
                        <input type="tel" className="w-full border border-accent px-4 py-3 text-sm focus:border-secondary outline-none" value={editData.phone} onChange={e => setEditData({...editData, phone: e.target.value})} />
                      </div>
                      <div className="md:col-span-2 flex gap-4 pt-4">
                        <button type="submit" className="bg-primary text-white px-8 py-3 text-xs uppercase tracking-widest font-bold">Save Changes</button>
                        <button type="button" onClick={() => setIsEditing(false)} className="border border-accent px-8 py-3 text-xs uppercase tracking-widest font-bold">Cancel</button>
                      </div>
                    </form>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12 max-w-2xl">
                      <div>
                        <p className="text-[10px] uppercase tracking-widest font-bold text-text-light mb-1">Full Name</p>
                        <p className="text-primary font-medium">{user.fullName}</p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-widest font-bold text-text-light mb-1">Email Address</p>
                        <p className="text-primary font-medium">{user.email}</p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-widest font-bold text-text-light mb-1">Phone Number</p>
                        <p className="text-primary font-medium">{user.phone}</p>
                      </div>
                    </div>
                  )}

                  <div className="pt-10 border-t border-accent">
                    <h3 className="text-xl font-heading text-primary mb-6">Account Security</h3>
                    <button className="text-xs font-bold uppercase tracking-widest text-secondary hover:underline">Change Password</button>
                  </div>
                </motion.div>
              )}

              {activeTab === 'orders' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                  <div className="flex justify-between items-center border-b border-accent pb-6">
                    <h3 className="text-2xl font-heading text-primary">My Orders</h3>
                  </div>
                  
                  <div className="space-y-4">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="border border-accent p-6 flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-accent/30 rounded-full flex items-center justify-center">
                            <Package className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm font-bold">AVL-74839{i}</p>
                            <p className="text-[10px] text-text-light uppercase tracking-widest">Placed on Oct {15-i}, 2025</p>
                          </div>
                        </div>
                        <div className="text-center">
                          <p className="text-sm font-bold">₦45,000</p>
                          <p className="text-[10px] text-text-light uppercase">2 Items</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="px-4 py-1.5 bg-secondary/10 text-secondary rounded-full text-[10px] uppercase font-bold tracking-widest">Processing</span>
                          <Link to={`/account/orders/AVL-74839${i}`} className="p-2 border border-accent hover:bg-accent transition-all">
                            <ChevronRight className="h-4 w-4" />
                          </Link>
                        </div>
                      </div>
                    ))}
                    <button className="w-full py-4 text-xs font-bold uppercase tracking-widest text-secondary hover:underline">View All Orders</button>
                  </div>
                </motion.div>
              )}

              {activeTab === 'wishlist' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                  <div className="flex justify-between items-center border-b border-accent pb-6">
                    <h3 className="text-2xl font-heading text-primary">My Wishlist</h3>
                    <p className="text-xs text-text-light">3 Items saved</p>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="group border border-accent relative">
                        <div className="aspect-[3/4] overflow-hidden bg-accent">
                          <img src={`https://images.unsplash.com/photo-${1515372039744 + i}?q=80&w=300`} alt="Wishlist item" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                          <button className="absolute top-2 right-2 p-2 bg-white rounded-full text-red-400 hover:text-red-600 shadow-sm">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="p-4 space-y-2 text-center">
                          <p className="text-xs font-bold text-primary truncate">Premium Silk Wrap</p>
                          <p className="text-sm font-bold text-secondary">₦28,000</p>
                          <button className="w-full mt-2 py-2 bg-primary text-white text-[10px] uppercase tracking-widest font-bold hover:bg-secondary transition-colors flex items-center justify-center gap-2">
                            <ShoppingBag className="h-3 w-3" /> Add to Cart
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'addresses' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                  <div className="flex justify-between items-center border-b border-accent pb-6">
                    <h3 className="text-2xl font-heading text-primary">Saved Addresses</h3>
                    <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-secondary hover:text-primary transition-colors">
                      <Plus className="h-3 w-3" /> Add New Address
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border-2 border-secondary p-6 space-y-4 bg-secondary/5 relative">
                      <div className="absolute top-4 right-4 text-[8px] bg-secondary text-primary font-bold px-2 py-0.5 uppercase tracking-widest">Default</div>
                      <div>
                        <p className="text-sm font-bold text-primary">Tunde Adebayor</p>
                        <p className="text-xs text-text-light mt-1 leading-relaxed">12 Admiralty Way, Phase 1,<br />Lekki, Lagos State</p>
                        <p className="text-xs text-text-light mt-4">080 123 4567</p>
                      </div>
                      <div className="flex gap-4 pt-4 border-t border-accent">
                        <button className="text-[10px] font-bold uppercase tracking-widest text-secondary hover:underline">Edit</button>
                        <button className="text-[10px] font-bold uppercase tracking-widest text-red-400 hover:underline">Delete</button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
