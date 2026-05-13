/**
 * Mock Product Dataset for a "Real-world" E-commerce feel.
 * Includes multiple categories: Electronics, Fashion, Home, Beauty, Groceries.
 */

export const PRODUCTS = [
  // --- ELECTRONICS ---
  {
    id: 101,
    title: "Aura Pro Max Smartphone",
    price: 79999,
    description: "The ultimate smartphone experience with a 6.9-inch OLED display, triple-lens camera system, and the fastest chip ever in a phone.",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800&auto=format&fit=crop",
    rating: { rate: 4.8, count: 1250 },
    offer: true,
    offerLabel: "HOT DEAL"
  },
  {
    id: 102,
    title: "ZenBook Air 15",
    price: 94990,
    description: "Ultra-thin, ultra-light, and ultra-powerful. The perfect companion for creative professionals on the go.",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=800&auto=format&fit=crop",
    rating: { rate: 4.7, count: 840 },
    offer: true,
    offerLabel: "BANK OFFER"
  },
  {
    id: 103,
    title: "SonicWave Wireless Headphones",
    price: 18999,
    description: "Industry-leading noise cancellation and crystal clear audio quality. 40-hour battery life for non-stop listening.",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop",
    rating: { rate: 4.9, count: 2100 },
    offer: true,
    offerLabel: "BESTSELLER"
  },
  {
    id: 104,
    title: "Lumina 4K Smart TV",
    price: 54990,
    description: "Experience cinema-quality visuals in your living room. Vibrant colors and deep blacks with HDR10+ support.",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?q=80&w=800&auto=format&fit=crop",
    rating: { rate: 4.5, count: 560 },
    offer: true,
    offerLabel: "SPECIAL DEAL"
  },
  {
    id: 105,
    title: "Pulse GT Smartwatch",
    price: 7999,
    description: "Track your health, fitness, and notifications. Water-resistant and up to 10 days of battery life.",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop",
    rating: { rate: 4.4, count: 980 }
  },

  // --- FASHION ---
  {
    id: 201,
    title: "Urban Explorer Parka",
    price: 4999,
    description: "Stay warm and stylish. Water-resistant outer shell with recycled down insulation.",
    category: "fashion",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=800&auto=format&fit=crop",
    rating: { rate: 4.6, count: 320 },
    offer: true,
    offerLabel: "NEW SEASON"
  },
  {
    id: 202,
    title: "Classic Leather Chelsea Boots",
    price: 3499,
    description: "Handcrafted Italian leather boots. Timeless design that pairs perfectly with jeans or trousers.",
    category: "fashion",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop",
    rating: { rate: 4.7, count: 450 },
    offer: true,
    offerLabel: "BANK OFFER"
  },
  {
    id: 203,
    title: "Silk Flow Evening Dress",
    price: 2499,
    description: "Elegant silk dress with a flattering silhouette. Perfect for weddings and formal events.",
    category: "fashion",
    image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=800&auto=format&fit=crop",
    rating: { rate: 4.8, count: 180 },
    offer: true,
    offerLabel: "SPECIAL PRICE"
  },
  {
    id: 204,
    title: "Minimalist Linen Shirt",
    price: 1299,
    description: "Breathable linen fabric for maximum comfort in summer. Relaxed fit, available in 5 colors.",
    category: "fashion",
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=800&auto=format&fit=crop",
    rating: { rate: 4.3, count: 620 }
  },
  {
    id: 205,
    title: "Vintage Denim Jacket",
    price: 2299,
    description: "Classic blue denim with a worn-in feel. A versatile layer for any outfit.",
    category: "fashion",
    image: "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?q=80&w=800&auto=format&fit=crop",
    rating: { rate: 4.5, count: 290 }
  },

  // --- HOME & KITCHEN ---
  {
    id: 301,
    title: "Nordic Ceramic Coffee Set",
    price: 999,
    description: "A set of 4 minimalist ceramic mugs with a matte finish. Dishwasher and microwave safe.",
    category: "home",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800&auto=format&fit=crop",
    rating: { rate: 4.9, count: 410 },
    offer: true,
    offerLabel: "LOWEST PRICE"
  },
  {
    id: 302,
    title: "Chef's Choice Air Fryer",
    price: 6999,
    description: "Cook your favorite meals with 85% less oil. 5.8-quart capacity, perfect for families.",
    category: "home",
    image: "https://images.unsplash.com/photo-1585238342024-78d387f4a707?q=80&w=800&auto=format&fit=crop",
    rating: { rate: 4.8, count: 1540 }
  },
  {
    id: 303,
    title: "Aura Smart Diffuser",
    price: 1999,
    description: "Ultrasonic aromatherapy diffuser with ambient LED lighting. Control via smartphone app.",
    category: "home",
    image: "https://images.unsplash.com/photo-1602928321679-560bb453f190?q=80&w=800&auto=format&fit=crop",
    rating: { rate: 4.6, count: 720 }
  },
  {
    id: 304,
    title: "Velvet Accent Chair",
    price: 12999,
    description: "Luxurious velvet upholstery with gold-finished legs. Adds a touch of glamour to any room.",
    category: "home",
    image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80&w=800&auto=format&fit=crop",
    rating: { rate: 4.7, count: 230 }
  },

  // --- BEAUTY ---
  {
    id: 401,
    title: "Glow Serum with Vitamin C",
    price: 999,
    description: "Brighten and even out your skin tone. Formulated with 15% pure Vitamin C and Hyaluronic Acid.",
    category: "beauty",
    image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?q=80&w=800&auto=format&fit=crop",
    rating: { rate: 4.8, count: 890 },
    offer: true,
    offerLabel: "TOP RATED"
  },
  {
    id: 402,
    title: "Midnight Recovery Oil",
    price: 1499,
    description: "Wake up to radiant skin. A potent blend of botanical oils that works overnight.",
    category: "beauty",
    image: "https://images.unsplash.com/photo-1556228578-8c7c0f44bb0b?q=80&w=800&auto=format&fit=crop",
    rating: { rate: 4.7, count: 540 }
  },
  {
    id: 402,
    title: "Matte Liquid Lipstick Set",
    price: 1299,
    description: "6 long-wearing, smudge-proof shades ranging from nude to bold red.",
    category: "beauty",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=800&auto=format&fit=crop",
  }
];

export const CATEGORIES = [
  "all",
  "Electronics",
  "Fashion",
  "Beauty",
  "Accessories",
  "Home",
  "Sports"
];

export const CATEGORY_MAPPING = {
  'Electronics': 'Electronics',
  'Fashion': 'Fashion',
  'Accessories': 'Accessories',
  'Beauty': 'Beauty',
  'Home': 'Home',
  'Sports': 'Sports'
};
