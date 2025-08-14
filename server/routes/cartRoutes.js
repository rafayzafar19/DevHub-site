const express = require('express');
const router = express.Router();
const {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart
} = require('../controllers/cartController');

// Get cart by user ID
router.get('/:userId', getCart);

// Add item to cart
router.post('/:userId/items', addToCart);

// Update cart item quantity
router.put('/:userId/items/:itemId', updateCartItem);

// Remove item from cart
router.delete('/:userId/items/:itemId', removeFromCart);

// Clear cart
router.delete('/:userId', clearCart);

module.exports = router; 