import React, { useState, useEffect } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Star, Grid, List, ChevronRight, MessageCircle, Filter, X, Heart, ShoppingCartIcon, ChevronDown } from 'lucide-react';
import apiService from '../services/api';
import ContactForm from '../components/ContactForm';

const ProductListingPage = () => {
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]); // Store all products for filtering
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('featured');
  const [filters, setFilters] = useState({
    priceRange: [0, 1000],
    brands: [],
    ratings: [],
    supplierType: [],
    categories: []
  });
  const [showContactForm, setShowContactForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [expandedFilters, setExpandedFilters] = useState({
    categories: true,
    priceRange: true,
    brands: true,
    ratings: true,
    supplierType: true
  });

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const searchTerm = searchParams.get('search');
        const searchCategory = searchParams.get('category');
        
        let fetchedProducts;
        if (category) {
          fetchedProducts = await apiService.getProductsByCategory(category);
        } else if (searchTerm) {
          fetchedProducts = await apiService.searchProducts(searchTerm, searchCategory);
        } else {
          fetchedProducts = await apiService.getAllProducts();
        }
        
        // Ensure we have an array of products
        const productsArray = Array.isArray(fetchedProducts) ? fetchedProducts : [];
        console.log('Fetched products:', fetchedProducts);
        console.log('Products array:', productsArray);
        setAllProducts(productsArray);
        setProducts(productsArray);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Failed to load products. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, searchParams]);

  // Apply filters whenever filters change
  useEffect(() => {
    if (allProducts.length > 0) {
      applyFilters();
    }
  }, [filters, allProducts]);

  const filterOptions = {
    brands: [...new Set(Array.isArray(products) ? products.map(p => p.brand) : [])],
    priceRanges: [
      { label: 'Under $50', value: [0, 50] },
      { label: '$50 - $100', value: [50, 100] },
      { label: '$100 - $200', value: [100, 200] },
      { label: '$200 - $500', value: [200, 500] },
      { label: 'Over $500', value: [500, 1000] },
    ],
    ratings: [4, 3, 2, 1],
    supplierTypes: ['Verified Supplier', 'Gold Supplier', 'Premium Supplier', 'New Supplier']
  };

  const applyFilters = () => {
    let filteredProducts = [...allProducts];

    // Apply category filter
    if (filters.categories && filters.categories.length > 0) {
      filteredProducts = filteredProducts.filter(product => 
        filters.categories.includes(product.category)
      );
    }

    // Apply price range filter
    if (filters.priceRange && filters.priceRange.length === 2) {
      filteredProducts = filteredProducts.filter(product => 
        product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
      );
    }

    // Apply brand filter
    if (filters.brands && filters.brands.length > 0) {
      filteredProducts = filteredProducts.filter(product => 
        filters.brands.includes(product.brand)
      );
    }

    // Apply rating filter
    if (filters.ratings && filters.ratings.length > 0) {
      filteredProducts = filteredProducts.filter(product => 
        filters.ratings.some(rating => product.rating >= rating)
      );
    }

    // Apply supplier type filter
    if (filters.supplierType && filters.supplierType.length > 0) {
      filteredProducts = filteredProducts.filter(product => 
        filters.supplierType.includes(product.supplier?.type)
      );
    }

    setProducts(filteredProducts);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleSortChange = (value) => {
    setSortBy(value);
  };

  const handleAddToCart = async (productId) => {
    try {
      // For now, using a default user ID. In a real app, this would come from authentication
      const userId = 'user123';
      const product = products.find(p => p._id === productId);
      
      if (!product) {
        alert('Product not found!');
        return;
      }
      
      if (!product.inStock) {
        alert('Product is out of stock!');
        return;
      }
      
      await apiService.addToCart(userId, productId);
      alert(`Added ${product.name} to cart successfully!`);
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add item to cart. Please try again.');
    }
  };

  const handleAddToWishlist = (productId) => {
    alert(`Added ${products.find(p => p._id === productId)?.name} to wishlist!`);
  };

  const handleContactSupplier = (productId) => {
    const product = products.find(p => p._id === productId);
    setSelectedProduct(product);
    setShowContactForm(true);
  };

  const toggleFilterSection = (section) => {
    setExpandedFilters(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const getCategoryTitle = () => {
    const categoryMap = {
      'electronics': 'Electronics',
      'fashion': 'Fashion',
      'home': 'Home & Garden',
      'sports': 'Sports & Outdoor',
      'beauty': 'Beauty & Health',
      'automotive': 'Automotive',
      'tools': 'Tools & Equipment'
    };
    return categoryMap[category] || 'Products';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-4 sm:mb-8">
        <Link to="/" className="hover:text-blue-600">Home</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-gray-900">{getCategoryTitle()}</span>
      </nav>

      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className="flex items-center space-x-2 bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          <Filter className="h-4 w-4" />
          <span>Filters</span>
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filters Sidebar - Matching Figma Design */}
        <div className={`lg:w-64 lg:flex-shrink-0 ${showMobileFilters ? 'block' : 'hidden lg:block'}`}>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Filters</h3>
              <button
                onClick={() => setShowMobileFilters(false)}
                className="lg:hidden p-1 hover:bg-gray-100 rounded"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            
            {/* Categories Filter */}
            <div className="mb-6">
              <button
                onClick={() => toggleFilterSection('categories')}
                className="flex items-center justify-between w-full text-left font-medium text-gray-900 mb-3"
              >
                <span>Categories</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${expandedFilters.categories ? 'rotate-180' : ''}`} />
              </button>
              {expandedFilters.categories && (
                <div className="space-y-2">
                  {[
                    { display: 'Electronics', value: 'electronics' },
                    { display: 'Fashion', value: 'fashion' },
                    { display: 'Home & Garden', value: 'home' },
                    { display: 'Sports & Outdoor', value: 'sports' },
                    { display: 'Beauty & Health', value: 'beauty' },
                    { display: 'Automotive', value: 'automotive' },
                    { display: 'Tools & Equipment', value: 'tools' }
                  ].map((cat) => (
                    <label key={cat.value} className="flex items-center">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        onChange={(e) => {
                          const currentCategories = filters.categories || [];
                          if (e.target.checked) {
                            handleFilterChange('categories', [...currentCategories, cat.value]);
                          } else {
                            handleFilterChange('categories', currentCategories.filter(c => c !== cat.value));
                          }
                        }}
                      />
                      <span className="ml-2 text-xs sm:text-sm text-gray-700">{cat.display}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Price Range Filter */}
            <div className="mb-6">
              <button
                onClick={() => toggleFilterSection('priceRange')}
                className="flex items-center justify-between w-full text-left font-medium text-gray-900 mb-3"
              >
                <span>Price Range</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${expandedFilters.priceRange ? 'rotate-180' : ''}`} />
              </button>
              {expandedFilters.priceRange && (
                <div className="space-y-2">
                  {filterOptions.priceRanges.map((range) => (
                    <label key={range.label} className="flex items-center">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        onChange={(e) => {
                          if (e.target.checked) {
                            handleFilterChange('priceRange', range.value);
                          } else {
                            handleFilterChange('priceRange', [0, 1000]);
                          }
                        }}
                      />
                      <span className="ml-2 text-xs sm:text-sm text-gray-700">{range.label}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Brands Filter */}
            <div className="mb-6">
              <button
                onClick={() => toggleFilterSection('brands')}
                className="flex items-center justify-between w-full text-left font-medium text-gray-900 mb-3"
              >
                <span>Brands</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${expandedFilters.brands ? 'rotate-180' : ''}`} />
              </button>
              {expandedFilters.brands && (
                <div className="space-y-2">
                  {filterOptions.brands.map((brand) => (
                    <label key={brand} className="flex items-center">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        onChange={(e) => {
                          const currentBrands = filters.brands;
                          if (e.target.checked) {
                            handleFilterChange('brands', [...currentBrands, brand]);
                          } else {
                            handleFilterChange('brands', currentBrands.filter(b => b !== brand));
                          }
                        }}
                      />
                      <span className="ml-2 text-xs sm:text-sm text-gray-700">{brand}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Ratings Filter */}
            <div className="mb-6">
              <button
                onClick={() => toggleFilterSection('ratings')}
                className="flex items-center justify-between w-full text-left font-medium text-gray-900 mb-3"
              >
                <span>Ratings</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${expandedFilters.ratings ? 'rotate-180' : ''}`} />
              </button>
              {expandedFilters.ratings && (
                <div className="space-y-2">
                  {filterOptions.ratings.map((rating) => (
                    <label key={rating} className="flex items-center">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        onChange={(e) => {
                          const currentRatings = filters.ratings;
                          if (e.target.checked) {
                            handleFilterChange('ratings', [...currentRatings, rating]);
                          } else {
                            handleFilterChange('ratings', currentRatings.filter(r => r !== rating));
                          }
                        }}
                      />
                      <div className="ml-2 flex items-center">
                        {Array.from({ length: 5 }, (_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                          />
                        ))}
                        <span className="ml-1 text-xs sm:text-sm text-gray-700">& up</span>
                      </div>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Supplier Type Filter */}
            <div className="mb-6">
              <button
                onClick={() => toggleFilterSection('supplierType')}
                className="flex items-center justify-between w-full text-left font-medium text-gray-900 mb-3"
              >
                <span>Supplier Type</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${expandedFilters.supplierType ? 'rotate-180' : ''}`} />
              </button>
              {expandedFilters.supplierType && (
                <div className="space-y-2">
                  {filterOptions.supplierTypes.map((type) => (
                    <label key={type} className="flex items-center">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        onChange={(e) => {
                          const currentTypes = filters.supplierType;
                          if (e.target.checked) {
                            handleFilterChange('supplierType', [...currentTypes, type]);
                          } else {
                            handleFilterChange('supplierType', currentTypes.filter(t => t !== type));
                          }
                        }}
                      />
                      <span className="ml-2 text-xs sm:text-sm text-gray-700">{type}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Clear Filters */}
            <button
              onClick={() => {
                setFilters({ priceRange: [0, 1000], brands: [], ratings: [], supplierType: [], categories: [] });
                setProducts(allProducts);
              }}
              className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors text-sm sm:text-base"
            >
              Clear All Filters
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-1">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">{getCategoryTitle()}</h1>
              <p className="text-gray-600 text-sm sm:text-base">{products.length} products found</p>
            </div>
            
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
                className="border border-gray-300 rounded-lg px-2 sm:px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs sm:text-sm"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest</option>
              </select>

              {/* View Mode */}
              <div className="flex border border-gray-300 rounded-lg">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600'}`}
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600'}`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className={`grid gap-4 sm:gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                : 'grid-cols-1'
            }`}>
              {Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden animate-pulse">
                  <div className="aspect-square bg-gray-200"></div>
                  <div className="p-4">
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded mb-2"></div>
                    <div className="h-6 bg-gray-200 rounded mb-3"></div>
                    <div className="h-8 bg-gray-200 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-8">
              <p className="text-red-600 mb-4">{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Products */}
          {!loading && !error && (
            <div className={`grid gap-4 sm:gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                : 'grid-cols-1'
            }`}>
              {products.map((product) => (
                <Link key={product._id} to={`/product/${product._id}`} className={`bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow ${
                  viewMode === 'list' ? 'flex flex-col sm:flex-row' : ''
                }`}>
                <div className={`${viewMode === 'list' ? 'sm:w-48' : ''}`}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className={`w-full object-cover ${viewMode === 'list' ? 'h-32 sm:h-32' : 'aspect-square'}`}
                  />
                </div>
                
                <div className={`p-3 sm:p-4 ${viewMode === 'list' ? 'sm:flex-1' : ''}`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs sm:text-sm text-gray-500">{product.brand}</span>
                    {!product.inStock && (
                      <span className="text-xs sm:text-sm text-red-600 font-medium">Out of Stock</span>
                    )}
                  </div>
                  
                  <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base line-clamp-2">{product.name}</h3>
                  
                  <div className="flex items-center mb-2">
                    <Star className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-xs sm:text-sm text-gray-600">{product.rating}</span>
                    <span className="mx-1 text-gray-400">•</span>
                    <span className="text-xs sm:text-sm text-gray-600">{product.reviews} reviews</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 mb-3 sm:mb-4">
                    <span className="text-base sm:text-lg font-bold text-blue-600">${product.price}</span>
                    {product.originalPrice > product.price && (
                      <span className="text-xs sm:text-sm text-gray-400 line-through">${product.originalPrice}</span>
                    )}
                  </div>
                  
                  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(product._id);
                      }}
                      disabled={!product.inStock}
                      className="flex-1 bg-blue-600 text-white py-2 px-3 sm:px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed text-xs sm:text-sm"
                    >
                      Add to Cart
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleContactSupplier(product._id);
                      }}
                      className="bg-gray-100 text-gray-700 py-2 px-3 sm:px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center justify-center text-xs sm:text-sm"
                    >
                      <MessageCircle className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                      Contact
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

          {/* Pagination */}
          <div className="mt-8 flex justify-center">
            <div className="flex items-center space-x-2">
              <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">Previous</button>
              <button className="px-3 py-2 bg-blue-600 text-white rounded-lg text-sm">1</button>
              <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">2</button>
              <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">3</button>
              <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">Next</button>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form Modal */}
      {selectedProduct && (
        <ContactForm
          isOpen={showContactForm}
          onClose={() => {
            setShowContactForm(false);
            setSelectedProduct(null);
          }}
          productId={selectedProduct._id}
          supplierName={selectedProduct.supplier.name}
        />
      )}
    </div>
  );
};

export default ProductListingPage;
  