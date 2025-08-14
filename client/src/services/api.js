const API_BASE_URL = 'http://localhost:5000/api';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Get all products with optional filters
  async getAllProducts(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = `/products${queryString ? `?${queryString}` : ''}`;
    const response = await this.request(endpoint);
    return response.data || response;
  }

  // Get featured products
  async getFeaturedProducts() {
    const response = await this.request('/products/featured');
    return response.data || response;
  }

  // Get trending products
  async getTrendingProducts() {
    const response = await this.request('/products/trending');
    return response.data || response;
  }

  // Get product by ID
  async getProductById(id) {
    const response = await this.request(`/products/${id}`);
    return response.data || response;
  }

  // Get products by category
  async getProductsByCategory(category, params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = `/products/category/${category}${queryString ? `?${queryString}` : ''}`;
    const response = await this.request(endpoint);
    return response.data || response;
  }

  // Search products
  async searchProducts(searchTerm, category = '', params = {}) {
    const searchParams = { ...params, search: searchTerm };
    if (category) {
      searchParams.category = category;
    }
    return this.getAllProducts(searchParams);
  }

  // Create product (Admin only)
  async createProduct(productData) {
    return this.request('/products', {
      method: 'POST',
      body: JSON.stringify(productData),
    });
  }

  // Update product (Admin only)
  async updateProduct(id, productData) {
    return this.request(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(productData),
    });
  }

  // Delete product (Admin only)
  async deleteProduct(id) {
    return this.request(`/products/${id}`, {
      method: 'DELETE',
    });
  }

  // Health check
  async healthCheck() {
    return this.request('/health');
  }

  // Cart operations
  async getCart(userId) {
    const response = await this.request(`/cart/${userId}`);
    return response.data || response;
  }

  async addToCart(userId, productId, quantity = 1, selectedColor = '', selectedSize = '') {
    const response = await this.request(`/cart/${userId}/items`, {
      method: 'POST',
      body: JSON.stringify({
        productId,
        quantity,
        selectedColor,
        selectedSize
      })
    });
    return response.data || response;
  }

  async updateCartItem(userId, itemId, quantity) {
    const response = await this.request(`/cart/${userId}/items/${itemId}`, {
      method: 'PUT',
      body: JSON.stringify({ quantity })
    });
    return response.data || response;
  }

  async removeFromCart(userId, itemId) {
    const response = await this.request(`/cart/${userId}/items/${itemId}`, {
      method: 'DELETE'
    });
    return response.data || response;
  }

  async clearCart(userId) {
    const response = await this.request(`/cart/${userId}`, {
      method: 'DELETE'
    });
    return response.data || response;
  }
}

export default new ApiService(); 