const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerName: String,
  orderDate: Date,
  bundles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Bundle' }],
  notes: String,
});

module.exports = mongoose.model('Order', orderSchema);
