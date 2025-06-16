const mongoose = require('mongoose');

const blockSchema = new mongoose.Schema({
  registrationDate: String,
  block: String,
  length: Number,
  height: Number,
  width: Number,
  volume: Number,
  supplier: String,
  location: String,
  price: Number,
  purchaseValue: Number,
  weight: Number,
  material: String,
  code: String,
  internship: String,
  situation: String,
  description: String,
}, { timestamps: true });

module.exports = mongoose.model('Block', blockSchema);
