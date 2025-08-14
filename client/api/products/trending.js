const connectToDatabase = require('../_lib/db');
const Product = require('../_lib/models/Product');
const sampleProducts = require('../_lib/sampleProducts');

module.exports = async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ success: false, message: `Method ${req.method} Not Allowed` });
  }

  try {
    // Try database first
    try {
      await connectToDatabase();
      const products = await Product.find({ reviews: { $gte: 100 } })
        .sort({ reviews: -1 })
        .limit(6);
      
      if (products.length > 0) {
        return res.status(200).json({ success: true, count: products.length, data: products });
      }
    } catch (dbError) {
      console.log('Database error, using static data:', dbError.message);
    }
    
    // Fallback to static data
    const trendingProducts = sampleProducts
      .filter(product => product.reviews >= 100)
      .sort((a, b) => b.reviews - a.reviews)
      .slice(0, 6);
    
    res.status(200).json({ 
      success: true, 
      count: trendingProducts.length, 
      data: trendingProducts,
      source: 'static'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

