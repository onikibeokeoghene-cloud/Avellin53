import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from './components/Layout';
import { useAuthStore } from './store/useAuthStore';
import { Navigate, useLocation } from 'react-router-dom';

// Lazy Loaded Pages
const Home = lazy(() => import('./pages/Home'));
const Shop = lazy(() => import('./pages/Shop'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const Cart = lazy(() => import('./pages/Cart'));
const Checkout = lazy(() => import('./pages/Checkout'));
const OrderConfirmation = lazy(() => import('./pages/OrderConfirmation'));
const OrderHistory = lazy(() => import('./pages/OrderHistory'));
const OrderDetail = lazy(() => import('./pages/OrderDetail'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const UserDashboard = lazy(() => import('./pages/UserDashboard'));
const AdminLayout = lazy(() => import('./pages/admin/AdminLayout'));
const AdminOverview = lazy(() => import('./pages/admin/AdminOverview'));
const AdminProducts = lazy(() => import('./pages/admin/AdminProducts'));
const Wishlist = lazy(() => import('./pages/Wishlist'));
const Contact = lazy(() => import('./pages/Contact'));
const FAQ = lazy(() => import('./pages/FAQ'));
const Shipping = lazy(() => import('./pages/Shipping'));
const ReturnsExchanges = lazy(() => import('./pages/ReturnsExchanges'));
const TrackOrder = lazy(() => import('./pages/TrackOrder'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Loading Fallback
const PageLoader = () => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <div className="w-12 h-12 border-4 border-accent border-t-secondary rounded-full animate-spin" />
  </div>
);

const ProtectedRoute = ({ children, role }: { children: React.ReactNode, role?: 'customer' | 'admin' }) => {
  const { isAuthenticated, user } = useAuthStore();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (role && user?.role !== role) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

// Mock Pages for layout demonstration
// App.tsx remains clean

function App() {
  return (
    <>
      <Toaster position="bottom-right" />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="shop" element={<Shop />} />
          <Route path="shop/:categorySlug" element={<Shop />} />
          <Route path="product/:slug" element={<ProductDetail />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="order/confirmation" element={<OrderConfirmation />} />
          <Route path="account/orders" element={<OrderHistory />} />
          <Route path="account/orders/:orderId" element={<OrderDetail />} />
          <Route path="new-arrivals" element={<Shop />} />
          <Route path="category/men" element={<Shop />} />
          <Route path="category/men/:subcategorySlug" element={<Shop />} />
          <Route path="category/women" element={<Shop />} />
          <Route path="category/women/:subcategorySlug" element={<Shop />} />
          <Route path="category/skincare" element={<Shop />} />
          <Route path="category/skincare/:subcategorySlug" element={<Shop />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="wishlist" element={<Wishlist />} />
          <Route path="sale" element={<Shop />} />
          <Route path="skincare" element={<Shop />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="shipping" element={<Shipping />} />
          <Route path="returns-exchanges" element={<ReturnsExchanges />} />
          <Route path="track-order" element={<TrackOrder />} />
          <Route path="contact" element={<Contact />} />
          <Route 
            path="account/*" 
            element={
              <ProtectedRoute>
                <UserDashboard />
              </ProtectedRoute>
            } 
          />
        </Route>

        <Route 
          path="/admin" 
          element={
            <ProtectedRoute role="admin">
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminOverview />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<div className="p-8 text-2xl font-heading">Order Management Coming Soon</div>} />
          <Route path="users" element={<div className="p-8 text-2xl font-heading">User Management Coming Soon</div>} />
        </Route>
        
        {/* Fallback route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      </Suspense>
    </>
  );
}

export default App;
