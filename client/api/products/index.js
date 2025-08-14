const connectToDatabase = require('../_lib/db');
const Product = require('../_lib/models/Product');
const getJsonBody = require('../_lib/getBody');

module.exports = async function handler(req, res) {
  await connectToDatabase();

  if (req.method === 'GET') {
    try {
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
      res.status(200).json({ success: true, count: products.length, data: products });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
    return;
  }

  if (req.method === 'POST') {
    try {
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

