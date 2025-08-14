const connectToDatabase = require('../_lib/db');
const Cart = require('../_lib/models/Cart');

module.exports = async function handler(req, res) {
  await connectToDatabase();

  const {
    query: { userId },
    method
  } = req;

  if (method === 'GET') {
    try {
      let cart = await Cart.findOne({ userId }).populate('items.product');
      if (!cart) {
        cart = new Cart({ userId, items: [] });
        await cart.save();
      }
      return res.status(200).json({ success: true, data: cart });
    } catch (error) {
      return res.status(500).json({ success: false, message: 'Failed to get cart' });
    }
  }

  if (method === 'DELETE') {
    try {
      const cart = await Cart.findOne({ userId });
      if (!cart) {
        return res.status(404).json({ success: false, message: 'Cart not found' });
      }
      cart.items = [];
      await cart.save();
      return res.status(200).json({ success: true, data: cart, message: 'Cart cleared successfully' });
    } catch (error) {
      return res.status(500).json({ success: false, message: 'Failed to clear cart' });
    }
  }

  res.setHeader('Allow', ['GET', 'DELETE']);
  res.status(405).json({ success: false, message: `Method ${method} Not Allowed` });
};

