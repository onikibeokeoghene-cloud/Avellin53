import { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit2, 
  Trash2, 
  MoreVertical
} from 'lucide-react';

const AdminProducts = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-heading text-primary">Product Management</h1>
          <p className="text-sm text-text-light mt-1">Manage your catalog, stock, and pricing</p>
        </div>
        <button className="bg-primary text-white px-8 py-4 uppercase tracking-widest font-bold text-xs hover:bg-secondary transition-all flex items-center gap-3 shadow-xl">
          <Plus className="h-4 w-4" /> Add New Product
        </button>
      </div>

      {/* Toolbar */}
      <div className="bg-white border border-accent p-4 flex flex-col md:flex-row justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-light" />
          <input 
            type="text" 
            placeholder="Search by name, SKU, category..." 
            className="w-full border border-accent pl-10 pr-4 py-3 text-sm focus:border-secondary outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 border border-accent px-6 py-3 text-xs uppercase tracking-widest font-bold hover:bg-accent transition-all">
            <Filter className="h-4 w-4" /> Filter
          </button>
          <select className="bg-white border border-accent px-4 py-3 text-xs uppercase tracking-widest font-bold outline-none">
            <option>All Categories</option>
            <option>Men's Fashion</option>
            <option>Women's Fashion</option>
            <option>Skincare</option>
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white border border-accent shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-bg-light">
              <tr className="text-[10px] uppercase tracking-widest font-bold text-text-light border-b border-accent">
                <th className="p-6">Product</th>
                <th className="p-6">Category</th>
                <th className="p-6">Price</th>
                <th className="p-6">Stock</th>
                <th className="p-6">Status</th>
                <th className="p-6">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <tr key={i} className="border-b border-accent hover:bg-accent/10 transition-colors">
                  <td className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-accent/30 rounded-sm overflow-hidden flex-shrink-0">
                        <img src={`https://images.unsplash.com/photo-${1515372039744 + i}?q=80&w=100`} alt="Product" className="w-full h-full object-cover" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-primary truncate max-w-[200px]">Premium Silk Kaftan</p>
                        <p className="text-[10px] text-text-light uppercase tracking-tighter">SKU: AVL-SK-{100 + i}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-6 text-text-light">Women's Fashion</td>
                  <td className="p-6 font-bold">₦45,000</td>
                  <td className="p-6">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${i === 3 ? 'bg-red-500' : 'bg-green-500'}`} />
                      <span className={i === 3 ? 'text-red-500 font-bold' : ''}>{i === 3 ? '3 left' : (10 + i)}</span>
                    </div>
                  </td>
                  <td className="p-6">
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-[10px] font-bold uppercase tracking-tighter rounded-full">Active</span>
                  </td>
                  <td className="p-6">
                    <div className="flex items-center gap-3">
                      <button className="p-2 text-text-light hover:text-secondary hover:bg-secondary/10 transition-all rounded-sm">
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-text-light hover:text-red-500 hover:bg-red-50 transition-all rounded-sm">
                        <Trash2 className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-text-light hover:text-primary transition-all">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="p-6 border-t border-accent flex justify-between items-center bg-bg-light/30">
          <p className="text-xs text-text-light uppercase tracking-widest font-medium">Showing 1-8 of 156 products</p>
          <div className="flex gap-2">
            <button className="px-4 py-2 border border-accent text-xs uppercase font-bold bg-white opacity-50 cursor-not-allowed">Prev</button>
            <button className="px-4 py-2 border border-accent text-xs uppercase font-bold bg-white hover:bg-accent transition-all">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;
