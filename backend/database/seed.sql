-- Seed file for AVELLIN Product Catalog
-- Created: 2026-04-17

-- Clear existing products (optional, use with caution)
-- DELETE FROM public.products;

INSERT INTO public.products (
  name, slug, description, short_description, price, compare_at_price, 
  category, subcategory, images, sizes, stock_quantity, 
  is_featured, is_new_arrival, rating_average, rating_count
) VALUES 
-- MEN'S FASHION
(
  'Classic Agbada Set', 'classic-agbada-set', 
  'Handcrafted premium Agbada in rich deep burgundy fabric. A statement piece for special occasions, weddings, and cultural events. Features intricate embroidery on the chest and sleeves.', 
  'Handcrafted premium Agbada in rich deep burgundy fabric.', 
  85000, 95000, 'mens-fashion', 'Traditional', 
  '{"https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?q=80&w=1000&auto=format&fit=crop"}', 
  '{"S", "M", "L", "XL", "XXL"}', 15, true, false, 4.9, 12
),
(
  'Slim Fit Ankara Blazer', 'slim-fit-ankara-blazer', 
  'Contemporary slim-fit blazer crafted from premium Ankara fabric. Pairs perfectly with plain trousers for a smart-casual look. Fully lined interior.', 
  'Contemporary slim-fit blazer crafted from premium Ankara fabric.', 
  42000, NULL, 'mens-fashion', 'Blazers', 
  '{"https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=1000&auto=format&fit=crop"}', 
  '{"S", "M", "L", "XL"}', 25, false, true, 4.7, 8
),
(
  'Premium Kaftan Set', 'premium-kaftan-set', 
  'Flowing kaftan in luxurious cotton blend. Perfect for Eid, naming ceremonies, and formal cultural occasions. Available in deep navy with gold embroidery.', 
  'Flowing kaftan in luxurious cotton blend.', 
  38000, NULL, 'mens-fashion', 'Traditional', 
  '{"https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?q=80&w=1000&auto=format&fit=crop"}', 
  '{"M", "L", "XL", "XXL"}', 20, false, false, 4.8, 15
),
(
  'Urban Streetwear Hoodie', 'urban-streetwear-hoodie', 
  'Premium heavyweight cotton hoodie with AVELLIN embroidered logo. Oversized fit with kangaroo pocket and ribbed cuffs. Perfect for casual outings.', 
  'Premium heavyweight cotton hoodie with AVELLIN logo.', 
  22000, 28000, 'mens-fashion', 'Casual', 
  '{"https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1000&auto=format&fit=crop"}', 
  '{"S", "M", "L", "XL"}', 40, true, false, 4.6, 24
),
(
  'Linen Casual Shirt', 'linen-casual-shirt', 
  'Breathable linen shirt perfect for the Nigerian climate. Relaxed fit with a classic collar. Ideal for smart-casual office wear and weekend outings.', 
  'Breathable linen shirt perfect for the Nigerian climate.', 
  18500, NULL, 'mens-fashion', 'Shirts', 
  '{"https://images.unsplash.com/photo-1594932224828-b4b059b6f6ee?q=80&w=1000&auto=format&fit=crop"}', 
  '{"S", "M", "L", "XL", "XXL"}', 30, false, true, 4.5, 10
),
(
  'Tailored Chinos', 'tailored-chinos', 
  'Slim-fit tailored chinos in premium stretch cotton. Available in khaki, navy, and olive. Pairs well with both casual shirts and blazers.', 
  'Slim-fit tailored chinos in premium stretch cotton.', 
  24000, NULL, 'mens-fashion', 'Trousers', 
  '{"https://images.unsplash.com/photo-1473966968600-fa801b869a1a?q=80&w=1000&auto=format&fit=crop"}', 
  '{"28", "30", "32", "34", "36"}', 35, false, false, 4.4, 18
),
(
  'Embroidered Dashiki', 'embroidered-dashiki', 
  'Vibrant hand-embroidered Dashiki in 100% cotton. Celebrates African heritage with bold prints and fine craftsmanship.', 
  'Vibrant hand-embroidered Dashiki in 100% cotton.', 
  15000, NULL, 'mens-fashion', 'Traditional', 
  '{"https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=1000&auto=format&fit=crop"}', 
  '{"S", "M", "L", "XL"}', 50, false, false, 4.7, 32
),
(
  'Premium Denim Jacket', 'premium-denim-jacket', 
  'Heavy-duty denim jacket with gold button detailing. A wardrobe staple that pairs with everything from Ankara trousers to plain joggers.', 
  'Heavy-duty denim jacket with gold button detailing.', 
  32000, NULL, 'mens-fashion', 'Jackets', 
  '{"https://images.unsplash.com/photo-1576905315967-68941bbdafbc?q=80&w=1000&auto=format&fit=crop"}', 
  '{"S", "M", "L", "XL"}', 18, true, false, 4.8, 9
),

-- WOMEN'S FASHION
(
  'Ankara Wrap Dress', 'ankara-wrap-dress', 
  'Stunning wrap dress in premium Ankara fabric. Adjustable waist tie for a flattering fit on all body types. Perfect for owambe parties, church, and office.', 
  'Stunning wrap dress in premium Ankara fabric.', 
  35000, NULL, 'womens-fashion', 'Dresses', 
  '{"https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=1000&auto=format&fit=crop"}', 
  '{"XS", "S", "M", "L", "XL"}', 22, true, false, 4.9, 45
),
(
  'Silk Satin Slip Dress', 'silk-satin-slip-dress', 
  'Luxurious silk-feel satin slip dress with adjustable spaghetti straps. Minimalist design with a side slit. Available in champagne, black, and deep green.', 
  'Luxurious silk-feel satin slip dress.', 
  28000, 35000, 'womens-fashion', 'Dresses', 
  '{"https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=1000&auto=format&fit=crop"}', 
  '{"XS", "S", "M", "L"}', 15, false, true, 4.8, 28
),
(
  'High-Waist Ankara Skirt', 'high-waist-ankara-skirt', 
  'A-line midi skirt in bold Ankara print. High waist design with zip closure. Pairs beautifully with white blouses or bodycon tops.', 
  'A-line midi skirt in bold Ankara print.', 
  19500, NULL, 'womens-fashion', 'Skirts', 
  '{"https://images.unsplash.com/photo-1561053720-76cd73ff22c3?q=80&w=1000&auto=format&fit=crop"}', 
  '{"XS", "S", "M", "L", "XL"}', 40, true, false, 4.7, 15
),
(
  'Adire Tie-Dye Jumpsuit', 'adire-tie-dye-jumpsuit', 
  'Contemporary wide-leg jumpsuit featuring authentic Nigerian Adire tie-dye fabric. Deep V-neck design with a belted waist. A bold statement piece.', 
  'Contemporary wide-leg jumpsuit in authentic Adire.', 
  45000, NULL, 'womens-fashion', 'Jumpsuits', 
  '{"https://images.unsplash.com/photo-1539109136881-3be0616acd4b?q=80&w=1000&auto=format&fit=crop"}', 
  '{"XS", "S", "M", "L"}', 12, false, true, 4.9, 21
),
(
  'Lace Iro and Buba Set', 'lace-iro-and-buba-set', 
  'Premium French lace Iro and Buba set. A timeless Yoruba traditional outfit perfect for weddings and ceremonies. Comes with matching gele fabric.', 
  'Premium French lace Iro and Buba set.', 
  78000, NULL, 'womens-fashion', 'Traditional', 
  '{"https://images.unsplash.com/photo-1561053720-76cd73ff22c3?q=80&w=1000&auto=format&fit=crop"}', 
  '{"S", "M", "L", "XL"}', 10, false, false, 5.0, 18
),
(
  'Power Suit Set', 'power-suit-set', 
  'Sharp structured two-piece suit in premium wool blend. Fitted blazer with matching straight-leg trousers. The ultimate office power look.', 
  'Sharp structured two-piece suit in premium wool blend.', 
  62000, 72000, 'womens-fashion', 'Suits', 
  '{"https://images.unsplash.com/photo-1548142813-c348350df52b?q=80&w=1000&auto=format&fit=crop"}', 
  '{"XS", "S", "M", "L", "XL"}', 8, true, false, 4.8, 14
),
(
  'Boubou Kaftan Dress', 'boubou-kaftan-dress', 
  'Flowing boubou kaftan in luxurious chiffon with gold embroidery at the neckline. Perfect for Eid celebrations and formal cultural events.', 
  'Flowing boubou kaftan in luxurious chiffon.', 
  52000, NULL, 'womens-fashion', 'Traditional', 
  '{"https://images.unsplash.com/photo-1561053720-76cd73ff22c3?q=80&w=1000&auto=format&fit=crop"}', 
  '{"S", "M", "L", "XL", "XXL"}', 14, false, false, 4.7, 19
),
(
  'Crop Blazer and Wide Leg Trouser', 'crop-blazer-wide-leg-trouser', 
  'Trendy co-ord set featuring a cropped blazer and matching high-waist wide-leg trousers in rich terracotta. A sophisticated yet modern look.', 
  'Trendy co-ord set in rich terracotta.', 
  48000, NULL, 'womens-fashion', 'Co-ords', 
  '{"https://images.unsplash.com/photo-1539109136881-3be0616acd4b?q=80&w=1000&auto=format&fit=crop"}', 
  '{"XS", "S", "M", "L"}', 10, false, true, 4.8, 12
),

-- SKINCARE
(
  'Vitamin C Brightening Serum', 'vitamin-c-brightening-serum', 
  'Concentrated 20% Vitamin C serum formulated for melanin-rich Nigerian skin. Fades dark spots, evens skin tone, and delivers a visible radiance boost within 4 weeks. Lightweight, fast-absorbing, fragrance-free. Key ingredients: L-Ascorbic Acid 20%, Hyaluronic Acid, Vitamin E, Ferulic Acid.', 
  'Concentrated 20% Vitamin C serum for melanin-rich skin.', 
  18500, 22000, 'skincare', 'Serums', 
  '{"https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1000&auto=format&fit=crop"}', 
  '{"30ml"}', 100, true, false, 4.9, 156
),
(
  'Hydra-Glow Deep Moisture Cream', 'hydra-glow-deep-moisture-cream', 
  'Rich yet non-greasy moisturizer designed for dry to combination Nigerian skin. Provides 72-hour hydration, strengthens the skin barrier, and reduces the appearance of fine lines. Dermatologist tested and hypoallergenic.', 
  'Rich yet non-greasy moisturizer for 72h hydration.', 
  14000, NULL, 'skincare', 'Moisturizers', 
  '{"https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=1000&auto=format&fit=crop"}', 
  '{"50ml", "100ml"}', 85, true, false, 4.8, 92
),
(
  'Kojic Acid Dark Spot Corrector', 'kojic-acid-dark-spot-corrector', 
  'Targeted dark spot corrector with 2% Kojic Acid and Alpha Arbutin. Effectively fades post-acne marks, hyperpigmentation, and uneven skin tone without harsh bleaching agents.', 
  'Targeted dark spot corrector with 2% Kojic Acid.', 
  12500, NULL, 'skincare', 'Treatments', 
  '{"https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=1000&auto=format&fit=crop"}', 
  '{"30ml"}', 60, false, true, 4.7, 48
),
(
  'SPF 50+ Sunscreen Fluid', 'spf-50-sunscreen-fluid', 
  'Lightweight, invisible SPF 50+ sunscreen specifically formulated for dark skin tones. No white cast. Provides broad spectrum UVA/UVB protection, prevents hyperpigmentation, and doubles as a makeup primer.', 
  'Invisible SPF 50+ sunscreen for dark skin tones.', 
  16000, NULL, 'skincare', 'Sun Protection', 
  '{"https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?q=80&w=1000&auto=format&fit=crop"}', 
  '{"50ml"}', 120, true, false, 4.9, 210
),
(
  'African Black Soap Face Wash', 'african-black-soap-face-wash', 
  'Gentle foaming cleanser based on authentic Nigerian black soap. Removes dirt, excess oil, and makeup without stripping the skins natural moisture.', 
  'Gentle foaming cleanser based on Nigerian black soap.', 
  8500, NULL, 'skincare', 'Cleansers', 
  '{"https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=1000&auto=format&fit=crop"}', 
  '{"150ml"}', 150, false, true, 4.6, 85
),
(
  'Retinol Night Renewal Cream', 'retinol-night-renewal-cream', 
  'Powerful overnight renewal cream with encapsulated Retinol for maximum effectiveness and minimum irritation. Promotes cell turnover, reduces fine lines, and improves skin texture.', 
  'Powerful overnight renewal cream with Retinol.', 
  22000, NULL, 'skincare', 'Treatments', 
  '{"https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=1000&auto=format&fit=crop"}', 
  '{"30ml"}', 45, true, false, 4.8, 37
),
(
  'Hyaluronic Acid Hydrating Toner', 'hyaluronic-acid-hydrating-toner', 
  'Lightweight hydrating toner with three molecular weights of Hyaluronic Acid for deep, multi-layer hydration. Plumps skin and prepares it for serums.', 
  'Lightweight hydrating toner for multi-layer hydration.', 
  11000, NULL, 'skincare', 'Toners', 
  '{"https://images.unsplash.com/photo-1556228578-8c7c2f22bd5f?q=80&w=1000&auto=format&fit=crop"}', 
  '{"150ml", "200ml"}', 75, false, true, 4.7, 52
),
(
  'Body Glow Oil', 'body-glow-oil', 
  'Luxurious dry body oil that absorbs instantly without greasiness. Leaves skin with a radiant, healthy glow while deeply nourishing with African botanical oils.', 
  'Luxurious dry body oil for a radiant glow.', 
  13500, 16000, 'skincare', 'Body Care', 
  '{"https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=1000&auto=format&fit=crop"}', 
  '{"50ml", "100ml"}', 90, true, false, 4.9, 64
);
