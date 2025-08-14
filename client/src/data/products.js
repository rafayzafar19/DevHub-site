// Products data for the e-commerce platform
const products = [
  // Electronics Category
  {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 299.99,
    originalPrice: 359.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    category: "electronics",
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
    id: 2,
    name: "Smart Watch Pro",
    price: 199.99,
    originalPrice: 249.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
    category: "electronics",
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
    id: 3,
    name: "Gaming Laptop Ultra",
    price: 1299.99,
    originalPrice: 1499.99,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop",
    category: "electronics",
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
    id: 4,
    name: "Smartphone Pro Max",
    price: 799.99,
    originalPrice: 899.99,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop",
    category: "electronics",
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
    id: 5,
    name: "Digital Camera Pro",
    price: 599.99,
    originalPrice: 699.99,
    image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=400&fit=crop",
    category: "electronics",
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
  {
    id: 6,
    name: "Bluetooth Speaker",
    price: 89.99,
    originalPrice: 119.99,
    image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=400&h=400&fit=crop",
    category: "electronics",
    brand: "SoundTech",
    rating: 4.5,
    reviews: 678,
    inStock: true,
    supplier: {
      name: "Audio Solutions",
      type: "New Supplier",
      rating: 4.4
    }
  },

  // Fashion Category
  {
    id: 7,
    name: "Men's Casual Polo Shirt",
    price: 29.99,
    originalPrice: 39.99,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
    category: "fashion",
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
    id: 8,
    name: "Leather Jacket Premium",
    price: 199.99,
    originalPrice: 249.99,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eef5?w=400&h=400&fit=crop",
    category: "fashion",
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
    id: 9,
    name: "Designer Blazer",
    price: 129.99,
    originalPrice: 159.99,
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop",
    category: "fashion",
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
  {
    id: 10,
    name: "Premium Cotton T-Shirt",
    price: 24.99,
    originalPrice: 34.99,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
    category: "fashion",
    brand: "CottonPro",
    rating: 4.4,
    reviews: 567,
    inStock: true,
    supplier: {
      name: "Textile Solutions",
      type: "Gold Supplier",
      rating: 4.6
    }
  },

  // Home & Garden Category
  {
    id: 11,
    name: "Modern Living Room Chair",
    price: 129.99,
    originalPrice: 159.99,
    image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=400&h=400&fit=crop",
    category: "home",
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
    id: 12,
    name: "Elegant Table Lamp",
    price: 45.99,
    originalPrice: 59.99,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=400&fit=crop",
    category: "home",
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
    id: 13,
    name: "Smart LED Lamp",
    price: 79.99,
    originalPrice: 99.99,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop",
    category: "home",
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
  {
    id: 14,
    name: "Storage Box Set",
    price: 29.99,
    originalPrice: 39.99,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop",
    category: "home",
    brand: "StoragePro",
    rating: 4.3,
    reviews: 89,
    inStock: true,
    supplier: {
      name: "Storage Solutions",
      type: "Verified Supplier",
      rating: 4.5
    }
  },
  {
    id: 15,
    name: "Clay Pot Set",
    price: 15.99,
    originalPrice: 19.99,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
    category: "home",
    brand: "GardenCraft",
    rating: 4.4,
    reviews: 156,
    inStock: true,
    supplier: {
      name: "Garden Supplies",
      type: "New Supplier",
      rating: 4.3
    }
  },

  // Sports & Outdoor Category
  {
    id: 16,
    name: "Running Shoes Pro",
    price: 89.99,
    originalPrice: 119.99,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
    category: "sports",
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
    id: 17,
    name: "Fitness Tracker",
    price: 149.99,
    originalPrice: 179.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
    category: "sports",
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
    id: 18,
    name: "Yoga Mat Premium",
    price: 34.99,
    originalPrice: 44.99,
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop",
    category: "sports",
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
    id: 19,
    name: "Wireless Hair Dryer",
    price: 89.99,
    originalPrice: 119.99,
    image: "https://images.unsplash.com/photo-1522338140269-f46f5913618a?w=400&h=400&fit=crop",
    category: "beauty",
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
  {
    id: 20,
    name: "Electric Kettle",
    price: 55.99,
    originalPrice: 69.99,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
    category: "home",
    brand: "KitchenPro",
    rating: 4.4,
    reviews: 123,
    inStock: true,
    supplier: {
      name: "Kitchen Solutions",
      type: "Verified Supplier",
      rating: 4.5
    }
  },

  // Automotive Category
  {
    id: 21,
    name: "Car Phone Mount",
    price: 24.99,
    originalPrice: 34.99,
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=400&fit=crop",
    category: "automotive",
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
    id: 22,
    name: "Dashboard Camera",
    price: 129.99,
    originalPrice: 159.99,
    image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=400&fit=crop",
    category: "automotive",
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
    id: 23,
    name: "Professional Tool Set",
    price: 199.99,
    originalPrice: 249.99,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop",
    category: "tools",
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
    id: 24,
    name: "Cordless Drill",
    price: 149.99,
    originalPrice: 179.99,
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=400&fit=crop",
    category: "tools",
    brand: "PowerTools",
    rating: 4.7,
    reviews: 234,
    inStock: true,
    supplier: {
      name: "Power Tool Solutions",
      type: "Verified Supplier",
      rating: 4.8
    }
  },

  // Additional Products for Variety
  {
    id: 25,
    name: "Bluetooth Earbuds",
    price: 79.99,
    originalPrice: 99.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    category: "electronics",
    brand: "AudioTech",
    rating: 4.6,
    reviews: 456,
    inStock: true,
    supplier: {
      name: "Audio Solutions",
      type: "Verified Supplier",
      rating: 4.7
    }
  },
  {
    id: 26,
    name: "Coffee Machine Pro",
    price: 199.99,
    originalPrice: 249.99,
    image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400&h=400&fit=crop",
    category: "home",
    brand: "CoffeeTech",
    rating: 4.8,
    reviews: 234,
    inStock: true,
    supplier: {
      name: "Coffee Solutions",
      type: "Premium Supplier",
      rating: 4.9
    }
  },
  {
    id: 27,
    name: "Blender Pro",
    price: 79.99,
    originalPrice: 99.99,
    image: "https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=400&h=400&fit=crop",
    category: "home",
    brand: "KitchenPro",
    rating: 4.5,
    reviews: 123,
    inStock: true,
    supplier: {
      name: "Kitchen Solutions",
      type: "Verified Supplier",
      rating: 4.6
    }
  },
  {
    id: 28,
    name: "Tablet Pro",
    price: 399.99,
    originalPrice: 499.99,
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop",
    category: "electronics",
    brand: "TabletTech",
    rating: 4.7,
    reviews: 345,
    inStock: true,
    supplier: {
      name: "Tablet Solutions",
      type: "Gold Supplier",
      rating: 4.8
    }
  },
  {
    id: 29,
    name: "GoPro Camera",
    price: 299.99,
    originalPrice: 349.99,
    image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=400&fit=crop",
    category: "electronics",
    brand: "GoPro",
    rating: 4.9,
    reviews: 678,
    inStock: true,
    supplier: {
      name: "Camera World",
      type: "Premium Supplier",
      rating: 4.9
    }
  },
  {
    id: 30,
    name: "Potted Plant Set",
    price: 25.99,
    originalPrice: 34.99,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
    category: "home",
    brand: "GardenCraft",
    rating: 4.4,
    reviews: 89,
    inStock: true,
    supplier: {
      name: "Garden Supplies",
      type: "New Supplier",
      rating: 4.3
    }
  }
];

export const getAllProducts = () => products;

export const getProductsByCategory = (category) => {
  return products.filter(product => product.category === category);
};

export const getProductById = (id) => {
  return products.find(product => product.id === parseInt(id));
};

export const getFeaturedProducts = () => {
  return products.filter(product => product.rating >= 4.7).slice(0, 8);
};

export const getTrendingProducts = () => {
  return products.filter(product => product.reviews >= 500).slice(0, 6);
};

export const getRecommendedProducts = () => {
  return products.slice(0, 8);
};

export default products; 