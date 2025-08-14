import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Star, ChevronRight, Heart, ShoppingCartIcon, MessageCircle, PackageIcon, Truck, Shield, CheckCircle } from 'lucide-react';
import apiService from '../services/api';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedColor, setSelectedColor] = useState('Grey');
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  // Fetch product data from API
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const fetchedProduct = await apiService.getProductById(id);
        setProduct(fetchedProduct);
        
        // Fetch related products from same category
        const related = await apiService.getProductsByCategory(fetchedProduct.category);
        const relatedArray = Array.isArray(related) ? related : [];
        setRelatedProducts(relatedArray.filter(p => p._id !== id).slice(0, 6));
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Failed to load product details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleAddToCart = async () => {
    if (!product) return;
    
    try {
      // For now, using a default user ID. In a real app, this would come from authentication
      const userId = 'user123';
      
      if (!product.inStock) {
        alert('Product is out of stock!');
        return;
      }
      
      await apiService.addToCart(userId, product._id, quantity, selectedColor, selectedSize);
      alert(`Added ${quantity} ${product.name} to cart successfully!`);
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add item to cart. Please try again.');
    }
  };

  const handleBuyNow = () => {
    if (product) {
      alert(`Proceeding to checkout with ${quantity} ${product.name}!`);
    }
  };

  const handleAddToWishlist = () => {
    if (product) {
      alert(`Added ${product.name} to wishlist!`);
    }
  };

  const handleContactSupplier = () => {
    if (product) {
      alert(`Contacting ${product.supplier.name} about ${product.name}!`);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded mb-4"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <div className="aspect-square bg-gray-200 rounded-lg"></div>
            <div className="space-y-4">
              <div className="h-6 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-8 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="text-center py-8">
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // No product found
  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="text-center py-8">
          <p className="text-gray-600 mb-4">Product not found.</p>
          <Link to="/" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-4 sm:mb-8">
        <Link to="/" className="hover:text-blue-600">Home</Link>
        <ChevronRight className="h-4 w-4" />
        <Link to={`/category/${product.category}`} className="hover:text-blue-600 capitalize">{product.category}</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-gray-900">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square overflow-hidden rounded-lg border border-gray-200">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Single image display - API products have single image */}
          <div className="text-center text-sm text-gray-500">
            Product Image
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="ml-1 text-sm text-gray-600">{product.rating}</span>
                <span className="mx-2 text-gray-400">•</span>
                <span className="text-sm text-gray-600">{product.reviews} reviews</span>
              </div>
              <span className="text-sm text-gray-500">Brand: {product.brand}</span>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center space-x-3">
            <span className="text-3xl font-bold text-blue-600">${product.price}</span>
            <span className="text-lg text-gray-400 line-through">${product.originalPrice}</span>
            <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-sm font-medium">
              {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
            </span>
          </div>

          {/* Availability */}
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span className="text-green-600 font-medium">In Stock</span>
          </div>

                     {/* Color Selection */}
           <div>
             <h3 className="text-sm font-medium text-gray-900 mb-2">Color: {selectedColor}</h3>
             <div className="flex space-x-2">
               {['Grey', 'Blue', 'Black', 'White'].map((color) => (
                 <button
                   key={color}
                   onClick={() => setSelectedColor(color)}
                   className={`w-8 h-8 rounded-full border-2 ${
                     selectedColor === color ? 'border-blue-600' : 'border-gray-300'
                   } bg-${color.toLowerCase()}-500`}
                   title={color}
                 />
               ))}
             </div>
           </div>

           {/* Size Selection */}
           <div>
             <h3 className="text-sm font-medium text-gray-900 mb-2">Size: {selectedSize}</h3>
             <div className="flex space-x-2">
               {['S', 'M', 'L', 'XL'].map((size) => (
                 <button
                   key={size}
                   onClick={() => setSelectedSize(size)}
                   className={`px-3 py-1 rounded border ${
                     selectedSize === size 
                       ? 'border-blue-600 bg-blue-50 text-blue-600' 
                       : 'border-gray-300 text-gray-700 hover:border-gray-400'
                   }`}
                 >
                   {size}
                 </button>
               ))}
             </div>
           </div>

          {/* Quantity */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-2">Quantity</h3>
            <div className="flex items-center space-x-3">
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 hover:bg-gray-50"
                >
                  <span className="text-lg">-</span>
                </button>
                <span className="px-4 py-2 text-center min-w-[60px]">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 hover:bg-gray-50"
                >
                  <span className="text-lg">+</span>
                </button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center"
            >
              <ShoppingCartIcon className="h-5 w-5 mr-2" />
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              Buy Now
            </button>
            <button
              onClick={handleAddToWishlist}
              className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Heart className="h-5 w-5 text-gray-600" />
            </button>
          </div>

          {/* Supplier Info */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-900">Supplier</span>
              <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">{product.supplier.type}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">{product.supplier.name}</span>
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="text-sm text-gray-600 ml-1">{product.supplier.rating}</span>
              </div>
            </div>
            <button
              onClick={handleContactSupplier}
              className="w-full mt-3 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center justify-center text-sm"
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              Contact Supplier
            </button>
          </div>

          {/* Shipping Info */}
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Truck className="h-5 w-5 text-gray-400" />
              <span className="text-sm text-gray-600">Free shipping on orders over $50</span>
            </div>
            <div className="flex items-center space-x-3">
              <PackageIcon className="h-5 w-5 text-gray-400" />
              <span className="text-sm text-gray-600">Estimated delivery: 3-5 business days</span>
            </div>
            <div className="flex items-center space-x-3">
              <Shield className="h-5 w-5 text-gray-400" />
              <span className="text-sm text-gray-600">Secure payment & buyer protection</span>
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="mt-12">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Description</h2>
        <p className="text-gray-600 leading-relaxed">{product.description}</p>
      </div>

      {/* Related Products */}
      <div className="mt-12">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Related Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {Array.isArray(relatedProducts) && relatedProducts.map((relatedProduct) => (
            <Link key={relatedProduct._id} to={`/product/${relatedProduct._id}`} className="group">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={relatedProduct.image}
                    alt={relatedProduct.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-3">
                  <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 mb-1 text-sm line-clamp-2">
                    {relatedProduct.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-blue-600">${relatedProduct.price}</span>
                    <div className="flex items-center">
                      <Star className="h-3 w-3 text-yellow-400 fill-current" />
                      <span className="text-xs text-gray-600 ml-1">{relatedProduct.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
  