const connectToDatabase = require('../_lib/db');
const Product = require('../_lib/models/Product');
const getJsonBody = require('../_lib/getBody');
const sampleProducts = require('../_lib/sampleProducts');

module.exports = async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Try to get products from database first
      try {
        await connectToDatabase();
        const { category, search, sort, limit = 20 } = req.query;
        
        const query = {};
        if (category) {
          query.category = category;
        }
        if (search) {
          query.$or = [
            { name: { $regex: search, $options: 'i' } },
            { category: { $regex: search, $options: 'i' } },
            { brand: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } }
          ];
        }
        
        let productsQuery = Product.find(query);
        
        if (sort) {
          const sortOrder = {};
          switch (sort) {
            case 'price-low':
              sortOrder.price = 1;
              break;
            case 'price-high':
              sortOrder.price = -1;
              break;
            case 'rating':
              sortOrder.rating = -1;
              break;
            case 'newest':
              sortOrder.createdAt = -1;
              break;
            default:
              sortOrder.createdAt = -1;
          }
          productsQuery = productsQuery.sort(sortOrder);
        }
        
        const products = await productsQuery.limit(parseInt(limit)).exec();
        
        if (products.length > 0) {
          return res.status(200).json({ success: true, count: products.length, data: products });
        }
      } catch (dbError) {
        console.log('Database error, using static data:', dbError.message);
      }
      
      // Fallback to static data
      let filteredProducts = [...sampleProducts];
      
      const { category, search, sort, limit = 20 } = req.query;
      
      // Filter by category
      if (category) {
        filteredProducts = filteredProducts.filter(product => 
          product.category.toLowerCase() === category.toLowerCase()
        );
      }
      
      // Search functionality
      if (search) {
        const searchLower = search.toLowerCase();
        filteredProducts = filteredProducts.filter(product =>
          product.name.toLowerCase().includes(searchLower) ||
          product.category.toLowerCase().includes(searchLower) ||
          product.brand.toLowerCase().includes(searchLower) ||
          product.description.toLowerCase().includes(searchLower)
        );
      }
      
      // Sorting
      if (sort) {
        filteredProducts.sort((a, b) => {
          switch (sort) {
            case 'price-low':
              return a.price - b.price;
            case 'price-high':
              return b.price - a.price;
            case 'rating':
              return b.rating - a.rating;
            default:
              return 0;
          }
        });
      }
      
      // Limit results
      const limitedProducts = filteredProducts.slice(0, parseInt(limit));
      
      res.status(200).json({ 
        success: true, 
        count: limitedProducts.length, 
        data: limitedProducts,
        source: 'static'
      });
      
    } catch (error) {
      console.error('Error in GET /products:', error);
      res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
    return;
  }

  if (req.method === 'POST') {
    try {
      await connectToDatabase();
      const body = await getJsonBody(req);
      const product = await Product.create(body);
      res.status(201).json({ success: true, data: product });
    } catch (error) {
      res.status(400).json({ success: false, message: 'Invalid data', error: error.message });
    }
    return;
  }

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).json({ success: false, message: `Method ${req.method} Not Allowed` });
};

