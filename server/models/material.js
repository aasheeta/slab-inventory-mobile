const mongoose = require('mongoose');

const materialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  composition: { type: String },
  classification: { type: String },
  color: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Material', materialSchema);
