const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
  enterprise: { type: String, required: true },
  telephone: String,
  cnpj: String,
  address: String,
  supplierType: String,
  note: String,
}, { timestamps: true });

module.exports = mongoose.model('Supplier', supplierSchema);
