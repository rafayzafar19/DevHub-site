import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Search, 
  User, 
  MessageCircle, 
  Heart, 
  ShoppingCartIcon, 
  ChevronDown, 
  Clock, 
  Star,
  SendIcon,
  Globe,
  Truck,
  Shield,
  CheckCircle,
  PackageIcon,
  MapPin,
  FileText,
  Palette
} from 'lucide-react';
import apiService from '../services/api';

const HomePage = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState({
    days: 4,
    hours: 21,
    minutes: 34,
    seconds: 23
  });
  const [rfqForm, setRfqForm] = useState({
    item: '',
    details: '',
    quantity: '',
    unit: 'Pcs'
  });

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        
        // Fetch featured products for deals
        const featuredResponse = await apiService.getFeaturedProducts();
        setDealsProducts(Array.isArray(featuredResponse) ? featuredResponse.slice(0, 5) : []);
        
        // Fetch home category products
        const homeResponse = await apiService.getProductsByCategory('home', { limit: 8 });
        setHouseProducts(Array.isArray(homeResponse) ? homeResponse : []);
        
        // Fetch electronics category products
        const electronicsResponse = await apiService.getProductsByCategory('electronics', { limit: 7 });
        setElectronicsProducts(Array.isArray(electronicsResponse) ? electronicsResponse : []);
        
        // Fetch recommended products (mix of categories)
        const allProductsResponse = await apiService.getAllProducts({ limit: 9 });
        setRecommendedProducts(Array.isArray(allProductsResponse) ? allProductsResponse : []);
        
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const categories = [
    { name: 'Electronics', icon: '💻', path: '/category/electronics' },
    { name: 'Fashion', icon: '👕', path: '/category/fashion' },
    { name: 'Home & Garden', icon: '🏠', path: '/category/home' },
    { name: 'Sports & Outdoor', icon: '⚽', path: '/category/sports' },
    { name: 'Beauty & Health', icon: '💄', path: '/category/beauty' },
    { name: 'Automotive', icon: '🚗', path: '/category/automotive' },
    { name: 'Tools & Equipment', icon: '🔧', path: '/category/tools' },
    { name: 'All Categories', icon: '📦', path: '/products' }
  ];

  const [dealsProducts, setDealsProducts] = useState([]);
  const [houseProducts, setHouseProducts] = useState([]);
  const [electronicsProducts, setElectronicsProducts] = useState([]);
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const services = [
    {
      title: 'Source From Industry Hubs',
      description: 'Find products from verified industry hubs',
      icon: Search,
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300&h=200&fit=crop'
    },
    {
      title: 'Customize Your Products',
      description: 'Get products customized to your requirements',
      icon: Palette,
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop'
    },
    {
      title: 'Fast, reliable shipping by ocean or air',
      description: 'Quick and secure shipping worldwide',
      icon: Truck,
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300&h=200&fit=crop'
    },
    {
      title: 'Product monitoring and inspection',
      description: 'Quality assurance and inspection services',
      icon: Shield,
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop'
    }
  ];

  const suppliers = [
    { name: 'United Arab Emirates', flag: '🇦🇪' },
    { name: 'France', flag: '🇫🇷' },
    { name: 'United States', flag: '🇺🇸' },
    { name: 'Russia', flag: '🇷🇺' },
    { name: 'Italy', flag: '🇮🇹' },
    { name: 'Denmark', flag: '🇩🇰' },
    { name: 'Australia', flag: '🇦🇺' },
    { name: 'Ireland', flag: '🇮🇪' },
    { name: 'China', flag: '🇨🇳' },
    { name: 'Great Britain', flag: '🇬🇧' }
  ];

  const handleRFQSubmit = (e) => {
    e.preventDefault();
    alert('RFQ submitted successfully!');
    setRfqForm({ item: '', details: '', quantity: '', unit: 'Pcs' });
  };

  const handleAddToCart = async (productId) => {
    try {
      // For now, using a default user ID. In a real app, this would come from authentication
      const userId = 'user123';
      
      await apiService.addToCart(userId, productId);
      alert('Product added to cart successfully!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add item to cart. Please try again.');
    }
  };

  const handleAddToWishlist = (productId) => {
    alert(`Added product ${productId} to wishlist!`);
  };

  const handleLearnMore = () => {
    navigate('/category/electronics');
  };

  const handleLogin = () => {
    alert('Login functionality coming soon!');
  };

  const handleSourceNow = (category) => {
    navigate(`/category/${category}`);
  };

  const handleNewsletterSubscribe = (e) => {
    e.preventDefault();
    alert('Newsletter subscription successful!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-6">
          {/* Left Sidebar */}
          <div className="w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <h3 className="font-semibold text-gray-900 mb-4">Automobiles</h3>
              <div className="space-y-2">
                {categories.map((category, index) => (
                  <Link
                    key={index}
                    to={category.path}
                    className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-lg">{category.icon}</span>
                    <span className="text-sm text-gray-700">{category.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Hero Banner */}
            <div className="bg-gradient-to-r from-teal-100 to-white rounded-2xl p-8 mb-8 relative overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                    Latest trending Electronic items
                  </h1>
                  <button 
                    onClick={handleLearnMore}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Learn more
                  </button>
                </div>
                <div className="relative">
                  <div className="flex space-x-4">
                    <img
                      src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop"
                      alt="Headphones"
                      className="w-32 h-32 object-cover rounded-lg"
                    />
                    <img
                      src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200&h=200&fit=crop"
                      alt="Smartphone"
                      className="w-32 h-32 object-cover rounded-lg"
                    />
                    <img
                      src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=200&h=200&fit=crop"
                      alt="Laptop"
                      className="w-32 h-32 object-cover rounded-lg"
                    />
                  </div>
                </div>
              </div>

              {/* Right Sidebar */}
              <div className="absolute right-4 top-4 space-y-4">
                <div className="bg-blue-600 text-white p-4 rounded-lg">
                  <p className="text-sm mb-2">Hi, user let's get started</p>
                  <button 
                    onClick={handleLogin}
                    className="bg-white text-blue-600 px-4 py-2 rounded text-sm font-semibold hover:bg-gray-100 transition-colors"
                  >
                    Log in
                  </button>
                </div>
                <div className="bg-orange-500 text-white p-4 rounded-lg">
                  <p className="text-sm">$5 off with a new supplier</p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <p className="text-sm text-gray-700">Send quotes with another professional</p>
                </div>
              </div>
            </div>

            {/* Deals and Offers */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900">Deals and offers</h2>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Clock className="h-4 w-4" />
                  <span>{countdown.days} days {countdown.hours} hours {countdown.minutes} min {countdown.seconds} sec</span>
                </div>
              </div>
              <div className="flex space-x-4 overflow-x-auto pb-4">
                {loading ? (
                  // Loading skeleton
                  Array.from({ length: 5 }).map((_, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 min-w-[200px] animate-pulse">
                      <div className="bg-gray-200 h-32 rounded-lg mb-3"></div>
                      <div className="bg-gray-200 h-4 rounded mb-2"></div>
                      <div className="bg-gray-200 h-6 rounded w-3/4"></div>
                    </div>
                  ))
                ) : (
                  dealsProducts.map((product) => (
                    <Link key={product._id} to={`/product/${product._id}`} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 min-w-[200px] hover:shadow-md transition-shadow">
                      <div className="relative">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-32 object-cover rounded-lg mb-3"
                        />
                        {product.originalPrice && (
                          <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                            -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                          </span>
                        )}
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-1 text-sm">{product.name}</h3>
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-bold text-blue-600">${product.price}</span>
                        {product.originalPrice && (
                          <span className="text-sm text-gray-400 line-through">${product.originalPrice}</span>
                        )}
                      </div>
                    </Link>
                  ))
                )}
              </div>
            </div>

            {/* House and Outdoor */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">House and outdoor</h2>
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-1">
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=300&h=200&fit=crop"
                      alt="Living Room"
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <button 
                        onClick={() => handleSourceNow('home')}
                        className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                      >
                        Source now
                      </button>
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-3">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {loading ? (
                      // Loading skeleton
                      Array.from({ length: 8 }).map((_, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 animate-pulse">
                          <div className="bg-gray-200 h-24 rounded-lg mb-2"></div>
                          <div className="bg-gray-200 h-4 rounded mb-1"></div>
                          <div className="bg-gray-200 h-5 rounded w-1/2"></div>
                        </div>
                      ))
                    ) : (
                      houseProducts.map((product) => (
                        <Link key={product._id} to={`/product/${product._id}`} className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 hover:shadow-md transition-shadow">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-24 object-cover rounded-lg mb-2"
                          />
                          <h3 className="font-semibold text-gray-900 mb-1 text-sm">{product.name}</h3>
                          <span className="text-lg font-bold text-blue-600">${product.price}</span>
                        </Link>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Consumer Electronics */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Consumer electronics and gadgets</h2>
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-1">
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=200&fit=crop"
                      alt="Pink Headphones"
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <button 
                        onClick={() => handleSourceNow('electronics')}
                        className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                      >
                        Source now
                      </button>
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-3">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {loading ? (
                      // Loading skeleton
                      Array.from({ length: 7 }).map((_, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 animate-pulse">
                          <div className="bg-gray-200 h-24 rounded-lg mb-2"></div>
                          <div className="bg-gray-200 h-4 rounded mb-1"></div>
                          <div className="bg-gray-200 h-5 rounded w-1/2"></div>
                        </div>
                      ))
                    ) : (
                      electronicsProducts.map((product) => (
                        <Link key={product._id} to={`/product/${product._id}`} className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 hover:shadow-md transition-shadow">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-24 object-cover rounded-lg mb-2"
                          />
                          <h3 className="font-semibold text-gray-900 mb-1 text-sm">{product.name}</h3>
                          <span className="text-lg font-bold text-blue-600">${product.price}</span>
                        </Link>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* RFQ Form */}
            <div className="mb-8 bg-blue-600 rounded-2xl p-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-black opacity-10"></div>
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="text-white">
                  <h2 className="text-3xl font-bold mb-4">An easy way to send requests to all suppliers</h2>
                  <p className="text-blue-100 text-lg">
                    Get competitive quotes from multiple suppliers for bulk orders and special requirements.
                  </p>
                </div>
                <div className="bg-white rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Send quote to suppliers</h3>
                  <form onSubmit={handleRFQSubmit} className="space-y-4">
                    <div>
                      <input
                        type="text"
                        placeholder="What item you want?"
                        value={rfqForm.item}
                        onChange={(e) => setRfqForm({...rfqForm, item: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <textarea
                        placeholder="Type more details"
                        value={rfqForm.details}
                        onChange={(e) => setRfqForm({...rfqForm, details: e.target.value})}
                        rows="3"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="flex space-x-2">
                      <input
                        type="number"
                        placeholder="Quantity"
                        value={rfqForm.quantity}
                        onChange={(e) => setRfqForm({...rfqForm, quantity: e.target.value})}
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <select
                        value={rfqForm.unit}
                        onChange={(e) => setRfqForm({...rfqForm, unit: e.target.value})}
                        className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option>Pcs</option>
                        <option>Kg</option>
                        <option>Lbs</option>
                      </select>
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center"
                    >
                      <SendIcon className="h-5 w-5 mr-2" />
                      Send inquiry
                    </button>
                  </form>
                </div>
              </div>
            </div>

            {/* Recommended Items */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Recommended items</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                {loading ? (
                  // Loading skeleton
                  Array.from({ length: 9 }).map((_, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden animate-pulse">
                      <div className="bg-gray-200 h-32"></div>
                      <div className="p-3">
                        <div className="bg-gray-200 h-4 rounded mb-1"></div>
                        <div className="bg-gray-200 h-5 rounded w-1/2"></div>
                      </div>
                    </div>
                  ))
                ) : (
                  recommendedProducts.map((product) => (
                    <Link key={product._id} to={`/product/${product._id}`} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow group">
                      <div className="relative">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-2 right-2 flex flex-col gap-1">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAddToWishlist(product._id);
                            }}
                            className="w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 transition-colors"
                          >
                            <Heart className="h-3 w-3 text-gray-600" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAddToCart(product._id);
                            }}
                            className="w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 transition-colors"
                          >
                            <ShoppingCartIcon className="h-3 w-3 text-gray-600" />
                          </button>
                        </div>
                      </div>
                      <div className="p-3">
                        <h3 className="font-semibold text-gray-900 mb-1 text-sm line-clamp-2">{product.name}</h3>
                        <span className="text-lg font-bold text-blue-600">${product.price}</span>
                      </div>
                    </Link>
                  ))
                )}
              </div>
            </div>

            {/* Extra Services */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our extra services</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {services.map((service, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                    <div className="relative h-32">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                        <service.icon className="h-8 w-8 text-white" />
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2">{service.title}</h3>
                      <p className="text-sm text-gray-600">{service.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Suppliers by Region */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Suppliers by region</h2>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                {suppliers.map((supplier, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center hover:shadow-md transition-shadow">
                    <div className="text-2xl mb-2">{supplier.flag}</div>
                    <p className="text-sm text-gray-700">{supplier.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-4">Subscribe on our newsletter</h3>
            <form onSubmit={handleNewsletterSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                required
              />
              <button 
                type="submit"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
