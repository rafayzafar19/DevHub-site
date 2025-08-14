const connectToDatabase = require('../_lib/db');
const Product = require('../_lib/models/Product');
const sampleProducts = require('../_lib/sampleProducts');

module.exports = async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ success: false, message: `Method ${req.method} Not Allowed` });
  }

  const { category } = req.query;
  const { sort, limit = 20 } = req.query;

  if (!category) {
    return res.status(400).json({ success: false, message: 'Category parameter is required' });
  }

  try {
    // Try database first
    try {
      await connectToDatabase();
      let query = Product.find({ category });
      
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
          default:
            sortOrder.createdAt = -1;
        }
        query = query.sort(sortOrder);
      }
      
      const products = await query.limit(parseInt(limit)).exec();
      
      if (products.length > 0) {
        return res.status(200).json({ success: true, count: products.length, data: products });
      }
    } catch (dbError) {
      console.log('Database error, using static data:', dbError.message);
    }
    
    // Fallback to static data
    let filteredProducts = sampleProducts.filter(product => 
      product.category.toLowerCase() === category.toLowerCase()
    );
    
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
    
    const limitedProducts = filteredProducts.slice(0, parseInt(limit));
    
    res.status(200).json({ 
      success: true, 
      count: limitedProducts.length, 
      data: limitedProducts,
      source: 'static'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
}; 