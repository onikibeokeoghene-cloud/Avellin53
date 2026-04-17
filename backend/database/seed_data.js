const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');

// Load env from root
dotenv.config({ path: path.join(__dirname, '../../.env') });

const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Error: SUPABASE_URL and SUPABASE_KEY must be set in .env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const products = [
  // MEN'S FASHION
  {
    name: 'Classic Agbada Set',
    slug: 'classic-agbada-set',
    description: 'Handcrafted premium Agbada in rich deep burgundy fabric. A statement piece for special occasions, weddings, and cultural events. Features intricate embroidery on the chest and sleeves.',
    short_description: 'Handcrafted premium Agbada in rich deep burgundy fabric.',
    price: 85000,
    compare_at_price: 95000,
    category: 'mens-fashion',
    subcategory: 'Traditional',
    images: ['https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?q=80&w=1000&auto=format&fit=crop'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    is_featured: true,
    is_new_arrival: false,
    stock_quantity: 15,
    rating_average: 4.9,
    rating_count: 12
  },
  {
    name: 'Slim Fit Ankara Blazer',
    slug: 'slim-fit-ankara-blazer',
    description: 'Contemporary slim-fit blazer crafted from premium Ankara fabric. Pairs perfectly with plain trousers for a smart-casual look. Fully lined interior.',
    short_description: 'Contemporary slim-fit blazer crafted from premium Ankara fabric.',
    price: 42000,
    compare_at_price: null,
    category: 'mens-fashion',
    subcategory: 'Blazers',
    images: ['https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=1000&auto=format&fit=crop'],
    sizes: ['S', 'M', 'L', 'XL'],
    is_featured: false,
    is_new_arrival: true,
    stock_quantity: 25,
    rating_average: 4.7,
    rating_count: 8
  },
  {
    name: 'Premium Kaftan Set',
    slug: 'premium-kaftan-set',
    description: 'Flowing kaftan in luxurious cotton blend. Perfect for Eid, naming ceremonies, and formal cultural occasions. Available in deep navy with gold embroidery.',
    short_description: 'Flowing kaftan in luxurious cotton blend.',
    price: 38000,
    compare_at_price: null,
    category: 'mens-fashion',
    subcategory: 'Traditional',
    images: ['https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?q=80&w=1000&auto=format&fit=crop'],
    sizes: ['M', 'L', 'XL', 'XXL'],
    is_featured: false,
    is_new_arrival: false,
    stock_quantity: 20,
    rating_average: 4.8,
    rating_count: 15
  },
  {
    name: 'Urban Streetwear Hoodie',
    slug: 'urban-streetwear-hoodie',
    description: 'Premium heavyweight cotton hoodie with AVELLIN embroidered logo. Oversized fit with kangaroo pocket and ribbed cuffs. Perfect for casual outings.',
    short_description: 'Premium heavyweight cotton hoodie with AVELLIN logo.',
    price: 22000,
    compare_at_price: 28000,
    category: 'mens-fashion',
    subcategory: 'Casual',
    images: ['https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1000&auto=format&fit=crop'],
    sizes: ['S', 'M', 'L', 'XL'],
    is_featured: true,
    is_new_arrival: false,
    stock_quantity: 40,
    rating_average: 4.6,
    rating_count: 24
  },
  {
    name: 'Linen Casual Shirt',
    slug: 'linen-casual-shirt',
    description: 'Breathable linen shirt perfect for the Nigerian climate. Relaxed fit with a classic collar. Ideal for smart-casual office wear and weekend outings.',
    short_description: 'Breathable linen shirt perfect for the Nigerian climate.',
    price: 18500,
    compare_at_price: null,
    category: 'mens-fashion',
    subcategory: 'Shirts',
    images: ['https://images.unsplash.com/photo-1594932224828-b4b059b6f6ee?q=80&w=1000&auto=format&fit=crop'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    is_featured: false,
    is_new_arrival: true,
    stock_quantity: 30,
    rating_average: 4.5,
    rating_count: 10
  },
  {
    name: 'Tailored Chinos',
    slug: 'tailored-chinos',
    description: 'Slim-fit tailored chinos in premium stretch cotton. Available in khaki, navy, and olive. Pairs well with both casual shirts and blazers.',
    short_description: 'Slim-fit tailored chinos in premium stretch cotton.',
    price: 24000,
    compare_at_price: null,
    category: 'mens-fashion',
    subcategory: 'Trousers',
    images: ['https://images.unsplash.com/photo-1473966968600-fa801b869a1a?q=80&w=1000&auto=format&fit=crop'],
    sizes: ['28', '30', '32', '34', '36'],
    is_featured: false,
    is_new_arrival: false,
    stock_quantity: 35,
    rating_average: 4.4,
    rating_count: 18
  },
  {
    name: 'Embroidered Dashiki',
    slug: 'embroidered-dashiki',
    description: 'Vibrant hand-embroidered Dashiki in 100% cotton. Celebrates African heritage with bold prints and fine craftsmanship.',
    short_description: 'Vibrant hand-embroidered Dashiki in 100% cotton.',
    price: 15000,
    compare_at_price: null,
    category: 'mens-fashion',
    subcategory: 'Traditional',
    images: ['https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=1000&auto=format&fit=crop'],
    sizes: ['S', 'M', 'L', 'XL'],
    is_featured: false,
    is_new_arrival: false,
    stock_quantity: 50,
    rating_average: 4.7,
    rating_count: 32
  },
  {
    name: 'Premium Denim Jacket',
    slug: 'premium-denim-jacket',
    description: 'Heavy-duty denim jacket with gold button detailing. A wardrobe staple that pairs with everything from Ankara trousers to plain joggers.',
    short_description: 'Heavy-duty denim jacket with gold button detailing.',
    price: 32000,
    compare_at_price: null,
    category: 'mens-fashion',
    subcategory: 'Jackets',
    images: ['https://images.unsplash.com/photo-1576905315967-68941bbdafbc?q=80&w=1000&auto=format&fit=crop'],
    sizes: ['S', 'M', 'L', 'XL'],
    is_featured: true,
    is_new_arrival: false,
    stock_quantity: 18,
    rating_average: 4.8,
    rating_count: 9
  },

  // WOMEN'S FASHION
  {
    name: 'Ankara Wrap Dress',
    slug: 'ankara-wrap-dress',
    description: 'Stunning wrap dress in premium Ankara fabric. Adjustable waist tie for a flattering fit on all body types. Perfect for owambe parties, church, and office.',
    short_description: 'Stunning wrap dress in premium Ankara fabric.',
    price: 35000,
    compare_at_price: null,
    category: 'womens-fashion',
    subcategory: 'Dresses',
    images: ['https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=1000&auto=format&fit=crop'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    is_featured: true,
    is_new_arrival: false,
    stock_quantity: 22,
    rating_average: 4.9,
    rating_count: 45
  },
  {
    name: 'Silk Satin Slip Dress',
    slug: 'silk-satin-slip-dress',
    description: 'Luxurious silk-feel satin slip dress with adjustable spaghetti straps. Minimalist design with a side slit. Available in champagne, black, and deep green.',
    short_description: 'Luxurious silk-feel satin slip dress.',
    price: 28000,
    compare_at_price: 35000,
    category: 'womens-fashion',
    subcategory: 'Dresses',
    images: ['https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=1000&auto=format&fit=crop'],
    sizes: ['XS', 'S', 'M', 'L'],
    is_featured: false,
    is_new_arrival: true,
    stock_quantity: 15,
    rating_average: 4.8,
    rating_count: 28
  },
  {
    name: 'High-Waist Ankara Skirt',
    slug: 'high-waist-ankara-skirt',
    description: 'A-line midi skirt in bold Ankara print. High waist design with zip closure. Pairs beautifully with white blouses or bodycon tops.',
    short_description: 'A-line midi skirt in bold Ankara print.',
    price: 19500,
    compare_at_price: null,
    category: 'womens-fashion',
    subcategory: 'Skirts',
    images: ['https://images.unsplash.com/photo-1561053720-76cd73ff22c3?q=80&w=1000&auto=format&fit=crop'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    is_featured: true,
    is_new_arrival: false,
    stock_quantity: 40,
    rating_average: 4.7,
    rating_count: 15
  },
  {
    name: 'Adire Tie-Dye Jumpsuit',
    slug: 'adire-tie-dye-jumpsuit',
    description: 'Contemporary wide-leg jumpsuit featuring authentic Nigerian Adire tie-dye fabric. Deep V-neck design with a belted waist. A bold statement piece.',
    short_description: 'Contemporary wide-leg jumpsuit in authentic Adire.',
    price: 45000,
    compare_at_price: null,
    category: 'womens-fashion',
    subcategory: 'Jumpsuits',
    images: ['https://images.unsplash.com/photo-1539109136881-3be0616acd4b?q=80&w=1000&auto=format&fit=crop'],
    sizes: ['XS', 'S', 'M', 'L'],
    is_featured: false,
    is_new_arrival: true,
    stock_quantity: 12,
    rating_average: 4.9,
    rating_count: 21
  },
  {
    name: 'Lace Iro and Buba Set',
    slug: 'lace-iro-and-buba-set',
    description: 'Premium French lace Iro and Buba set. A timeless Yoruba traditional outfit perfect for weddings and ceremonies. Comes with matching gele fabric.',
    short_description: 'Premium French lace Iro and Buba set.',
    price: 78000,
    compare_at_price: null,
    category: 'womens-fashion',
    subcategory: 'Traditional',
    images: ['https://images.unsplash.com/photo-1561053720-76cd73ff22c3?q=80&w=1000&auto=format&fit=crop'],
    sizes: ['S', 'M', 'L', 'XL'],
    is_featured: false,
    is_new_arrival: false,
    stock_quantity: 10,
    rating_average: 5.0,
    rating_count: 18
  },
  {
    name: 'Power Suit Set',
    slug: 'power-suit-set',
    description: 'Sharp structured two-piece suit in premium wool blend. Fitted blazer with matching straight-leg trousers. The ultimate office power look.',
    short_description: 'Sharp structured two-piece suit in premium wool blend.',
    price: 62000,
    compare_at_price: 72000,
    category: 'womens-fashion',
    subcategory: 'Suits',
    images: ['https://images.unsplash.com/photo-1548142813-c348350df52b?q=80&w=1000&auto=format&fit=crop'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    is_featured: true,
    is_new_arrival: false,
    stock_quantity: 8,
    rating_average: 4.8,
    rating_count: 14
  },
  {
    name: 'Boubou Kaftan Dress',
    slug: 'boubou-kaftan-dress',
    description: 'Flowing boubou kaftan in luxurious chiffon with gold embroidery at the neckline. Perfect for Eid celebrations and formal cultural events.',
    short_description: 'Flowing boubou kaftan in luxurious chiffon.',
    price: 52000,
    compare_at_price: null,
    category: 'womens-fashion',
    subcategory: 'Traditional',
    images: ['https://images.unsplash.com/photo-1561053720-76cd73ff22c3?q=80&w=1000&auto=format&fit=crop'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    is_featured: false,
    is_new_arrival: false,
    stock_quantity: 14,
    rating_average: 4.7,
    rating_count: 19
  },
  {
    name: 'Crop Blazer and Wide Leg Trouser',
    slug: 'crop-blazer-wide-leg-trouser',
    description: 'Trendy co-ord set featuring a cropped blazer and matching high-waist wide-leg trousers in rich terracotta. A sophisticated yet modern look.',
    short_description: 'Trendy co-ord set in rich terracotta.',
    price: 48000,
    compare_at_price: null,
    category: 'womens-fashion',
    subcategory: 'Co-ords',
    images: ['https://images.unsplash.com/photo-1539109136881-3be0616acd4b?q=80&w=1000&auto=format&fit=crop'],
    sizes: ['XS', 'S', 'M', 'L'],
    is_featured: false,
    is_new_arrival: true,
    stock_quantity: 10,
    rating_average: 4.8,
    rating_count: 12
  },

  // SKINCARE
  {
    name: 'Vitamin C Brightening Serum',
    slug: 'vitamin-c-brightening-serum',
    description: 'Concentrated 20% Vitamin C serum formulated for melanin-rich Nigerian skin. Fades dark spots, evens skin tone, and delivers a visible radiance boost within 4 weeks. Lightweight, fast-absorbing, fragrance-free. Key ingredients: L-Ascorbic Acid 20%, Hyaluronic Acid, Vitamin E, Ferulic Acid.',
    short_description: 'Concentrated 20% Vitamin C serum for melanin-rich skin.',
    price: 18500,
    compare_at_price: 22000,
    category: 'skincare',
    subcategory: 'Serums',
    images: ['https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1000&auto=format&fit=crop'],
    sizes: ['30ml'],
    is_featured: true,
    is_new_arrival: false,
    stock_quantity: 100,
    rating_average: 4.9,
    rating_count: 156
  },
  {
    name: 'Hydra-Glow Deep Moisture Cream',
    slug: 'hydra-glow-deep-moisture-cream',
    description: 'Rich yet non-greasy moisturizer designed for dry to combination Nigerian skin. Provides 72-hour hydration, strengthens the skin barrier, and reduces the appearance of fine lines. Dermatologist tested and hypoallergenic.',
    short_description: 'Rich yet non-greasy moisturizer for 72h hydration.',
    price: 14000,
    compare_at_price: null,
    category: 'skincare',
    subcategory: 'Moisturizers',
    images: ['https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=1000&auto=format&fit=crop'],
    sizes: ['50ml', '100ml'],
    is_featured: true,
    is_new_arrival: false,
    stock_quantity: 85,
    rating_average: 4.8,
    rating_count: 92
  },
  {
    name: 'Kojic Acid Dark Spot Corrector',
    slug: 'kojic-acid-dark-spot-corrector',
    description: 'Targeted dark spot corrector with 2% Kojic Acid and Alpha Arbutin. Effectively fades post-acne marks, hyperpigmentation, and uneven skin tone without harsh bleaching agents.',
    short_description: 'Targeted dark spot corrector with 2% Kojic Acid.',
    price: 12500,
    compare_at_price: null,
    category: 'skincare',
    subcategory: 'Treatments',
    images: ['https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=1000&auto=format&fit=crop'],
    sizes: ['30ml'],
    is_featured: false,
    is_new_arrival: true,
    stock_quantity: 60,
    rating_average: 4.7,
    rating_count: 48
  },
  {
    name: 'SPF 50+ Sunscreen Fluid',
    slug: 'spf-50-sunscreen-fluid',
    description: 'Lightweight, invisible SPF 50+ sunscreen specifically formulated for dark skin tones. No white cast. Provides broad spectrum UVA/UVB protection, prevents hyperpigmentation, and doubles as a makeup primer.',
    short_description: 'Invisible SPF 50+ sunscreen for dark skin tones.',
    price: 16000,
    compare_at_price: null,
    category: 'skincare',
    subcategory: 'Sun Protection',
    images: ['https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?q=80&w=1000&auto=format&fit=crop'],
    sizes: ['50ml'],
    is_featured: true,
    is_new_arrival: false,
    stock_quantity: 120,
    rating_average: 4.9,
    rating_count: 210
  },
  {
    name: 'African Black Soap Face Wash',
    slug: 'african-black-soap-face-wash',
    description: 'Gentle foaming cleanser based on authentic Nigerian black soap. Removes dirt, excess oil, and makeup without stripping the skins natural moisture.',
    short_description: 'Gentle foaming cleanser based on Nigerian black soap.',
    price: 8500,
    compare_at_price: null,
    category: 'skincare',
    subcategory: 'Cleansers',
    images: ['https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=1000&auto=format&fit=crop'],
    sizes: ['150ml'],
    is_featured: false,
    is_new_arrival: true,
    stock_quantity: 150,
    rating_average: 4.6,
    rating_count: 85
  },
  {
    name: 'Retinol Night Renewal Cream',
    slug: 'retinol-night-renewal-cream',
    description: 'Powerful overnight renewal cream with encapsulated Retinol for maximum effectiveness and minimum irritation. Promotes cell turnover, reduces fine lines, and improves skin texture.',
    short_description: 'Powerful overnight renewal cream with Retinol.',
    price: 22000,
    compare_at_price: null,
    category: 'skincare',
    subcategory: 'Treatments',
    images: ['https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=1000&auto=format&fit=crop'],
    sizes: ['30ml'],
    is_featured: true,
    is_new_arrival: false,
    stock_quantity: 45,
    rating_average: 4.8,
    rating_count: 37
  },
  {
    name: 'Hyaluronic Acid Hydrating Toner',
    slug: 'hyaluronic-acid-hydrating-toner',
    description: 'Lightweight hydrating toner with three molecular weights of Hyaluronic Acid for deep, multi-layer hydration. Plumps skin and prepares it for serums.',
    short_description: 'Lightweight hydrating toner for multi-layer hydration.',
    price: 11000,
    compare_at_price: null,
    category: 'skincare',
    subcategory: 'Toners',
    images: ['https://images.unsplash.com/photo-1556228578-8c7c2f22bd5f?q=80&w=1000&auto=format&fit=crop'],
    sizes: ['150ml', '200ml'],
    is_featured: false,
    is_new_arrival: true,
    stock_quantity: 75,
    rating_average: 4.7,
    rating_count: 52
  },
  {
    name: 'Body Glow Oil',
    slug: 'body-glow-oil',
    description: 'Luxurious dry body oil that absorbs instantly without greasiness. Leaves skin with a radiant, healthy glow while deeply nourishing with African botanical oils.',
    short_description: 'Luxurious dry body oil for a radiant glow.',
    price: 13500,
    compare_at_price: 16000,
    category: 'skincare',
    subcategory: 'Body Care',
    images: ['https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=1000&auto=format&fit=crop'],
    sizes: ['50ml', '100ml'],
    is_featured: true,
    is_new_arrival: false,
    stock_quantity: 90,
    rating_average: 4.9,
    rating_count: 64
  }
];

async function seed() {
  console.log('Starting seed...');
  
  // Clean existing products first to avoid slug conflicts
  const { error: deleteError } = await supabase.from('products').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  if (deleteError) {
    console.error('Error cleaning products:', deleteError);
  }

  const { data, error } = await supabase
    .from('products')
    .insert(products)
    .select();

  if (error) {
    console.error('Error seeding products:', error);
  } else {
    console.log(`Successfully seeded ${data.length} products!`);
  }
}

seed();
