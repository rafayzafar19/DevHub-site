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
      const products = await Product.find({ rating: { $gte: 4.5 } })
        .sort({ rating: -1 })
        .limit(8);
      
      if (products.length > 0) {
        return res.status(200).json({ success: true, count: products.length, data: products });
      }
    } catch (dbError) {
      console.log('Database error, using static data:', dbError.message);
    }
    
    // Fallback to static data
    const featuredProducts = sampleProducts
      .filter(product => product.rating >= 4.5)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 8);
    
    res.status(200).json({ 
      success: true, 
      count: featuredProducts.length, 
      data: featuredProducts,
      source: 'static'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

