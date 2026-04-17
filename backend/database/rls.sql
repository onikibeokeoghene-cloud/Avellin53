-- Supabase Row Level Security (RLS) Policies for AVELLIN

-- Enable RLS on all tables
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cart ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wishlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- 1. Products: Readable by everyone, editable only by admins
CREATE POLICY "Products are viewable by everyone" 
ON public.products FOR SELECT 
USING (true);

CREATE POLICY "Only admins can modify products" 
ON public.products FOR ALL 
USING (
  auth.jwt() ->> 'role' = 'admin'
);

-- 2. Users: Can only read/write their own profile
CREATE POLICY "Users can view own profile" 
ON public.users FOR SELECT 
USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" 
ON public.users FOR UPDATE 
USING (auth.uid() = id);

-- 3. Cart: Users can only see and modify their own cart
CREATE POLICY "Users can view own cart" 
ON public.cart FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own cart" 
ON public.cart FOR ALL 
USING (auth.uid() = user_id);

-- 4. Wishlist: Users can only see and modify their own wishlist
CREATE POLICY "Users can view own wishlist" 
ON public.wishlist FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own wishlist" 
ON public.wishlist FOR ALL 
USING (auth.uid() = user_id);

-- 5. Orders: Users can only see their own orders
CREATE POLICY "Users can view own orders" 
ON public.orders FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create own orders" 
ON public.orders FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- 6. Reviews: Viewable by everyone, created only by logged in users
CREATE POLICY "Reviews are viewable by everyone" 
ON public.reviews FOR SELECT 
USING (true);

CREATE POLICY "Users can create reviews" 
ON public.reviews FOR INSERT 
WITH CHECK (auth.isAuthenticated());

CREATE POLICY "Users can delete own reviews" 
ON public.reviews FOR DELETE 
USING (auth.uid() = user_id);
