const connectToDatabase = require('../../../_lib/db');
const Cart = require('../../../_lib/models/Cart');
const getJsonBody = require('../../../_lib/getBody');

module.exports = async function handler(req, res) {
  await connectToDatabase();

  const {
    query: { userId, itemId },
    method
  } = req;

  if (method === 'PUT') {
    try {
      const { quantity } = await getJsonBody(req);
      if (quantity < 1) {
        return res.status(400).json({ success: false, message: 'Quantity must be at least 1' });
      }
      const cart = await Cart.findOne({ userId });
      if (!cart) {
        return res.status(404).json({ success: false, message: 'Cart not found' });
      }
      const item = cart.items.id(itemId);
      if (!item) {
        return res.status(404).json({ success: false, message: 'Item not found in cart' });
      }
      item.quantity = quantity;
      await cart.save();
      await cart.populate('items.product');
      return res.status(200).json({ success: true, data: cart, message: 'Cart item updated successfully' });
    } catch (error) {
      return res.status(500).json({ success: false, message: 'Failed to update cart item' });
    }
  }

  if (method === 'DELETE') {
    try {
      const cart = await Cart.findOne({ userId });
      if (!cart) {
        return res.status(404).json({ success: false, message: 'Cart not found' });
      }
      cart.items = cart.items.filter((item) => item._id.toString() !== itemId);
      await cart.save();
      await cart.populate('items.product');
      return res.status(200).json({ success: true, data: cart, message: 'Item removed from cart successfully' });
    } catch (error) {
      return res.status(500).json({ success: false, message: 'Failed to remove item from cart' });
    }
  }

  res.setHeader('Allow', ['PUT', 'DELETE']);
  res.status(405).json({ success: false, message: `Method ${method} Not Allowed` });
};

