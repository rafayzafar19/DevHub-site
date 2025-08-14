const connectToDatabase = require('../../_lib/db');
const Cart = require('../../_lib/models/Cart');
const Product = require('../../_lib/models/Product');
const getJsonBody = require('../../_lib/getBody');

module.exports = async function handler(req, res) {
  await connectToDatabase();

  const {
    query: { userId },
    method
  } = req;

  if (method === 'POST') {
    try {
      const { productId, quantity = 1, selectedColor = '', selectedSize = '' } = await getJsonBody(req);
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ success: false, message: 'Product not found' });
      }
      if (!product.inStock) {
        return res.status(400).json({ success: false, message: 'Product is out of stock' });
      }

      let cart = await Cart.findOne({ userId });
      if (!cart) {
        cart = new Cart({ userId, items: [] });
      }

      const existingItemIndex = cart.items.findIndex((item) => item.product.toString() === productId);
      if (existingItemIndex > -1) {
        cart.items[existingItemIndex].quantity += quantity;
      } else {
        cart.items.push({ product: productId, quantity, selectedColor, selectedSize });
      }

      await cart.save();
      await cart.populate('items.product');
      return res.status(200).json({ success: true, data: cart, message: 'Item added to cart successfully' });
    } catch (error) {
      return res.status(500).json({ success: false, message: 'Failed to add item to cart' });
    }
  }

  res.setHeader('Allow', ['POST']);
  res.status(405).json({ success: false, message: `Method ${method} Not Allowed` });
};

