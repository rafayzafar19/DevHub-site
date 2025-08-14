const connectToDatabase = require('../_lib/db');
const Product = require('../_lib/models/Product');
const getJsonBody = require('../_lib/getBody');
const sampleProducts = require('../_lib/sampleProducts');

module.exports = async function handler(req, res) {
  const {
    query: { id },
    method
  } = req;

  if (method === 'GET') {
    try {
      // Try database first
      try {
        await connectToDatabase();
        const product = await Product.findById(id);
        if (product) {
          return res.status(200).json({ success: true, data: product });
        }
      } catch (dbError) {
        console.log('Database error, using static data:', dbError.message);
      }
      
      // Fallback to static data
      const product = sampleProducts.find(p => p._id === id);
      if (product) {
        return res.status(200).json({ success: true, data: product, source: 'static' });
      }
      
      return res.status(404).json({ success: false, message: 'Product not found' });
    } catch (error) {
      return res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
  }

  if (method === 'PUT') {
    try {
      await connectToDatabase();
      const body = await getJsonBody(req);
      const product = await Product.findByIdAndUpdate(id, body, { new: true, runValidators: true });
      if (!product) {
        return res.status(404).json({ success: false, message: 'Product not found' });
      }
      return res.status(200).json({ success: true, data: product });
    } catch (error) {
      return res.status(400).json({ success: false, message: 'Invalid data', error: error.message });
    }
  }

  if (method === 'DELETE') {
    try {
      await connectToDatabase();
      const product = await Product.findByIdAndDelete(id);
      if (!product) {
        return res.status(404).json({ success: false, message: 'Product not found' });
      }
      return res.status(200).json({ success: true, message: 'Product deleted successfully' });
    } catch (error) {
      return res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
  }

  res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
  res.status(405).json({ success: false, message: `Method ${method} Not Allowed` });
};

