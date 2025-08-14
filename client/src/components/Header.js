import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, User, MessageCircle, Heart, ShoppingCartIcon, ChevronDown, Menu, X } from 'lucide-react';

const Header = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All category');
  const [language, setLanguage] = useState('English, USD');
  const [shippingTo, setShippingTo] = useState('🇩🇪');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    const categoryMap = {
      'Electronics': 'electronics',
      'Fashion': 'fashion',
      'Home': 'home',
      'Sports': 'sports',
      'Beauty': 'beauty',
      'Automotive': 'automotive',
      'Tools': 'tools'
    };
    
    const category = selectedCategory === 'All category' ? '' : categoryMap[selectedCategory] || selectedCategory.toLowerCase();
    const searchParams = new URLSearchParams();
    
    // Always navigate to products page, even if no search query
    if (searchQuery.trim()) {
      searchParams.set('search', searchQuery.trim());
    }
    if (category) {
      searchParams.set('category', category);
    }
    
    const queryString = searchParams.toString();
    navigate(`/products${queryString ? `?${queryString}` : ''}`);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleUserClick = () => {
    alert('User profile functionality coming soon!');
  };

  const handleMessagesClick = () => {
    alert('Messages functionality coming soon!');
  };

  const handleWishlistClick = () => {
    alert('Wishlist functionality coming soon!');
  };

  const handleLanguageChange = () => {
    alert('Language selection functionality coming soon!');
  };

  const handleShippingChange = () => {
    alert('Shipping location selection coming soon!');
  };

  const handleHelpClick = () => {
    alert('Help and support functionality coming soon!');
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header */}
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
              <span className="text-white font-bold text-lg">B</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Brand</span>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <form onSubmit={handleSearch} className="flex">
              <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border border-r-0 border-gray-300 rounded-l-lg px-3 py-2 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>All category</option>
                <option>Electronics</option>
                <option>Fashion</option>
                <option>Home</option>
                <option>Sports</option>
                <option>Beauty</option>
                <option>Automotive</option>
                <option>Tools</option>
              </select>
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button 
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-r-lg hover:bg-blue-700 transition-colors"
              >
                Search
              </button>
            </form>
          </div>

          {/* User Icons */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={handleUserClick}
              className="text-gray-600 hover:text-blue-600 transition-colors p-2 rounded-lg hover:bg-gray-100"
              title="User Profile"
            >
              <User className="h-6 w-6" />
            </button>
            <button 
              onClick={handleMessagesClick}
              className="text-gray-600 hover:text-blue-600 transition-colors p-2 rounded-lg hover:bg-gray-100"
              title="Messages"
            >
              <MessageCircle className="h-6 w-6" />
            </button>
            <button 
              onClick={handleWishlistClick}
              className="text-gray-600 hover:text-blue-600 transition-colors p-2 rounded-lg hover:bg-gray-100"
              title="Wishlist"
            >
              <Heart className="h-6 w-6" />
            </button>
            <Link 
              to="/cart"
              className="text-gray-600 hover:text-blue-600 transition-colors p-2 rounded-lg hover:bg-gray-100 relative"
              title="Shopping Cart"
            >
              <ShoppingCartIcon className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                3
              </span>
            </Link>
          </div>
        </div>

        {/* Bottom Header */}
        <div className="flex items-center justify-between py-2 border-t border-gray-100">
          <div className="flex items-center space-x-6 text-sm">
            <button 
              onClick={handleLanguageChange}
              className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 p-2 rounded-lg hover:bg-gray-100"
            >
              <span>{language}</span>
              <ChevronDown className="h-4 w-4" />
            </button>
            <button 
              onClick={handleShippingChange}
              className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 p-2 rounded-lg hover:bg-gray-100"
            >
              <span>Ship to</span>
              <span>{shippingTo}</span>
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 text-sm">
            <Link to="/category/all" className="text-gray-600 hover:text-blue-600 transition-colors">All category</Link>
            <Link to="/deals" className="text-gray-600 hover:text-blue-600 transition-colors">Hot offers</Link>
            <Link to="/gifts" className="text-gray-600 hover:text-blue-600 transition-colors">Gift issues</Link>
            <Link to="/projects" className="text-gray-600 hover:text-blue-600 transition-colors">Projects</Link>
            <Link to="/menu" className="text-gray-600 hover:text-blue-600 transition-colors">Menu items</Link>
            <button 
              onClick={handleHelpClick}
              className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <span>Help</span>
              <ChevronDown className="h-4 w-4" />
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-100 transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/category/all"
                className="flex items-center px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                All category
              </Link>
              <Link
                to="/deals"
                className="flex items-center px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Hot offers
              </Link>
              <Link
                to="/gifts"
                className="flex items-center px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Gift issues
              </Link>
              <Link
                to="/projects"
                className="flex items-center px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Projects
              </Link>
              <Link
                to="/menu"
                className="flex items-center px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Menu items
              </Link>
              <button 
                onClick={() => {
                  handleHelpClick();
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors w-full text-left"
              >
                <span>Help</span>
                <ChevronDown className="h-4 w-4 ml-auto" />
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header; 