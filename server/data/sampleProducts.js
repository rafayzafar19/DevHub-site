const sampleProducts = [
  // Electronics Category
  {
    name: "Premium Wireless Headphones",
    price: 299.99,
    originalPrice: 359.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    description: "High-quality wireless headphones with noise cancellation and premium sound quality. Perfect for music lovers and professionals.",
    category: "electronics",
    stock: 50,
    brand: "AudioTech",
    rating: 4.8,
    reviews: 1247,
    inStock: true,
    supplier: {
      name: "Premium Electronics Co.",
      type: "Gold Supplier",
      rating: 4.9
    }
  },
  {
    name: "Smart Watch Pro",
    price: 199.99,
    originalPrice: 249.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
    description: "Advanced smartwatch with health monitoring, GPS tracking, and smartphone connectivity. Stay connected and healthy.",
    category: "electronics",
    stock: 75,
    brand: "TechWear",
    rating: 4.7,
    reviews: 892,
    inStock: true,
    supplier: {
      name: "Smart Devices Ltd.",
      type: "Verified Supplier",
      rating: 4.8
    }
  },
  {
    name: "Gaming Laptop Ultra",
    price: 1299.99,
    originalPrice: 1499.99,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop",
    description: "High-performance gaming laptop with RTX graphics, fast processor, and premium cooling system for ultimate gaming experience.",
    category: "electronics",
    stock: 25,
    brand: "GameTech",
    rating: 4.9,
    reviews: 567,
    inStock: true,
    supplier: {
      name: "Computer Solutions",
      type: "Premium Supplier",
      rating: 4.9
    }
  },
  {
    name: "Smartphone Pro Max",
    price: 799.99,
    originalPrice: 899.99,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop",
    description: "Latest smartphone with advanced camera system, powerful processor, and all-day battery life.",
    category: "electronics",
    stock: 100,
    brand: "MobileTech",
    rating: 4.6,
    reviews: 2341,
    inStock: true,
    supplier: {
      name: "Mobile Solutions",
      type: "Gold Supplier",
      rating: 4.7
    }
  },
  {
    name: "Digital Camera Pro",
    price: 599.99,
    originalPrice: 699.99,
    image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=400&fit=crop",
    description: "Professional digital camera with 4K video recording, interchangeable lenses, and advanced autofocus system.",
    category: "electronics",
    stock: 30,
    brand: "PhotoTech",
    rating: 4.8,
    reviews: 445,
    inStock: true,
    supplier: {
      name: "Camera World",
      type: "Verified Supplier",
      rating: 4.8
    }
  },

  // Fashion Category
  {
    name: "Men's Casual Polo Shirt",
    price: 29.99,
    originalPrice: 39.99,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
    description: "Comfortable and stylish polo shirt made from premium cotton. Perfect for casual and semi-formal occasions.",
    category: "fashion",
    stock: 200,
    brand: "Fashion Brand",
    rating: 4.5,
    reviews: 128,
    inStock: true,
    supplier: {
      name: "Premium Supplier Co.",
      type: "Gold Supplier",
      rating: 4.8
    }
  },
  {
    name: "Leather Jacket Premium",
    price: 199.99,
    originalPrice: 249.99,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eef5?w=400&h=400&fit=crop",
    description: "Premium leather jacket with classic design and superior craftsmanship. Timeless style for any occasion.",
    category: "fashion",
    stock: 40,
    brand: "LeatherCraft",
    rating: 4.7,
    reviews: 234,
    inStock: true,
    supplier: {
      name: "Leather World",
      type: "Premium Supplier",
      rating: 4.9
    }
  },
  {
    name: "Designer Blazer",
    price: 129.99,
    originalPrice: 159.99,
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop",
    description: "Elegant designer blazer perfect for professional settings and formal events. Tailored fit for maximum comfort.",
    category: "fashion",
    stock: 60,
    brand: "StylePro",
    rating: 4.6,
    reviews: 89,
    inStock: true,
    supplier: {
      name: "Fashion Forward",
      type: "Verified Supplier",
      rating: 4.7
    }
  },

  // Home & Garden Category
  {
    name: "Modern Living Room Chair",
    price: 129.99,
    originalPrice: 159.99,
    image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=400&h=400&fit=crop",
    description: "Contemporary living room chair with ergonomic design and premium upholstery. Perfect for modern homes.",
    category: "home",
    stock: 35,
    brand: "HomeStyle",
    rating: 4.6,
    reviews: 234,
    inStock: true,
    supplier: {
      name: "Furniture World",
      type: "Verified Supplier",
      rating: 4.7
    }
  },
  {
    name: "Elegant Table Lamp",
    price: 45.99,
    originalPrice: 59.99,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=400&fit=crop",
    description: "Beautiful table lamp with elegant design and warm lighting. Perfect for creating ambiance in any room.",
    category: "home",
    stock: 80,
    brand: "LightCraft",
    rating: 4.5,
    reviews: 123,
    inStock: true,
    supplier: {
      name: "Lighting Solutions",
      type: "New Supplier",
      rating: 4.4
    }
  },
  {
    name: "Smart LED Lamp",
    price: 79.99,
    originalPrice: 99.99,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop",
    description: "Smart LED lamp with voice control, color changing capabilities, and energy-efficient design.",
    category: "home",
    stock: 45,
    brand: "SmartHome",
    rating: 4.7,
    reviews: 345,
    inStock: true,
    supplier: {
      name: "Smart Home Tech",
      type: "Premium Supplier",
      rating: 4.8
    }
  },

  // Sports & Outdoor Category
  {
    name: "Running Shoes Pro",
    price: 89.99,
    originalPrice: 119.99,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
    description: "Professional running shoes with advanced cushioning and breathable design. Perfect for athletes and fitness enthusiasts.",
    category: "sports",
    stock: 120,
    brand: "SportTech",
    rating: 4.8,
    reviews: 892,
    inStock: true,
    supplier: {
      name: "Sports Equipment Co.",
      type: "Gold Supplier",
      rating: 4.9
    }
  },
  {
    name: "Fitness Tracker",
    price: 149.99,
    originalPrice: 179.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
    description: "Advanced fitness tracker with heart rate monitoring, sleep tracking, and workout analysis.",
    category: "sports",
    stock: 90,
    brand: "FitTech",
    rating: 4.6,
    reviews: 445,
    inStock: true,
    supplier: {
      name: "Fitness Solutions",
      type: "Verified Supplier",
      rating: 4.7
    }
  },
  {
    name: "Yoga Mat Premium",
    price: 34.99,
    originalPrice: 44.99,
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop",
    description: "Premium yoga mat with non-slip surface and comfortable cushioning. Perfect for yoga and meditation.",
    category: "sports",
    stock: 150,
    brand: "YogaLife",
    rating: 4.5,
    reviews: 234,
    inStock: true,
    supplier: {
      name: "Yoga Supplies",
      type: "New Supplier",
      rating: 4.4
    }
  },

  // Beauty & Health Category
  {
    name: "Wireless Hair Dryer",
    price: 89.99,
    originalPrice: 119.99,
    image: "https://images.unsplash.com/photo-1522338140269-f46f5913618a?w=400&h=400&fit=crop",
    description: "Professional wireless hair dryer with advanced technology for quick drying and hair protection.",
    category: "beauty",
    stock: 70,
    brand: "BeautyTech",
    rating: 4.7,
    reviews: 567,
    inStock: true,
    supplier: {
      name: "Beauty Supplies",
      type: "Premium Supplier",
      rating: 4.8
    }
  },

  // Automotive Category
  {
    name: "Car Phone Mount",
    price: 24.99,
    originalPrice: 34.99,
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=400&fit=crop",
    description: "Universal car phone mount with secure grip and adjustable angle. Perfect for navigation and hands-free use.",
    category: "automotive",
    stock: 200,
    brand: "AutoTech",
    rating: 4.6,
    reviews: 234,
    inStock: true,
    supplier: {
      name: "Auto Accessories",
      type: "Gold Supplier",
      rating: 4.7
    }
  },
  {
    name: "Dashboard Camera",
    price: 129.99,
    originalPrice: 159.99,
    image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=400&fit=crop",
    description: "High-definition dashboard camera with night vision and loop recording. Essential for road safety and evidence.",
    category: "automotive",
    stock: 55,
    brand: "DriveSafe",
    rating: 4.8,
    reviews: 345,
    inStock: true,
    supplier: {
      name: "Auto Electronics",
      type: "Premium Supplier",
      rating: 4.9
    }
  },

  // Tools & Equipment Category
  {
    name: "Professional Tool Set",
    price: 199.99,
    originalPrice: 249.99,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop",
    description: "Complete professional tool set with high-quality tools for various DIY and professional projects.",
    category: "tools",
    stock: 40,
    brand: "ToolPro",
    rating: 4.9,
    reviews: 567,
    inStock: true,
    supplier: {
      name: "Professional Tools",
      type: "Gold Supplier",
      rating: 4.9
    }
  },
  {
    name: "Cordless Drill",
    price: 149.99,
    originalPrice: 179.99,
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=400&fit=crop",
    description: "Powerful cordless drill with long battery life and multiple speed settings. Perfect for home and professional use.",
    category: "tools",
    stock: 65,
    brand: "PowerTools",
    rating: 4.7,
    reviews: 234,
    inStock: true,
    supplier: {
      name: "Power Tool Solutions",
      type: "Verified Supplier",
      rating: 4.8
    }
  }
];

module.exports = sampleProducts; 