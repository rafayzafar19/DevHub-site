const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true, min: 1, default: 1 },
    selectedColor: { type: String, default: '' },
    selectedSize: { type: String, default: '' }
  },
  { timestamps: true }
);

const cartSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, unique: true },
    items: [cartItemSchema],
    total: { type: Number, default: 0 }
  },
  { timestamps: true }
);

cartSchema.pre('save', function (next) {
  this.total = this.items.reduce((sum, item) => {
    // item.product might be ObjectId or populated doc
    const price = item.product && item.product.price ? item.product.price : 0;
    return sum + price * item.quantity;
  }, 0);
  next();
});

module.exports = mongoose.models.Cart || mongoose.model('Cart', cartSchema);

