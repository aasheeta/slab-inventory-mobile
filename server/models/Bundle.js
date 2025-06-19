const mongoose = require('mongoose');

const bundleSchema = new mongoose.Schema({
  supplier: String,
  material: String,
  quality: String,
  thickness: String,
  finish: String,
  block: String,
  bundle: String,
  isSelf: Boolean,
  priceSqMt: String,
  priceSqFt: String,
  oldPriceSqMt: String,
  oldPriceSqFt: String,
  tags: [String],
  availability: String,
  status: {
    type: String,
    enum: ['available', 'on-hold', 'sold'],
    default: 'available'
  },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Bundle', bundleSchema);
