const connectToDatabase = require('../_lib/db');
const Product = require('../_lib/models/Product');

module.exports = async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ success: false, message: `Method ${req.method} Not Allowed` });
  }

  await connectToDatabase();
  try {
    const products = await Product.find({ rating: { $gte: 4.5 } })
      .sort({ rating: -1 })
      .limit(8);
    res.status(200).json({ success: true, count: products.length, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

