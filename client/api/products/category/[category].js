const connectToDatabase = require('../../_lib/db');
const Product = require('../../_lib/models/Product');

module.exports = async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ success: false, message: `Method ${req.method} Not Allowed` });
  }

  await connectToDatabase();
  const { category } = req.query;
  const { sort, limit = 20 } = req.query;

  try {
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
    res.status(200).json({ success: true, count: products.length, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

