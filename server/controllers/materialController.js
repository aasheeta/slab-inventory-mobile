const Material = require('../models/material');

// Create Material
exports.createMaterial = async (req, res) => {
  try {
    const { name, composition, classification, color } = req.body;
    const newMaterial = new Material({ name, composition, classification, color });
    const savedMaterial = await newMaterial.save();
    res.status(201).json(savedMaterial);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create material', error: err.message });
  }
};

// Get All Materials
exports.getAllMaterials = async (req, res) => {
  try {
    const materials = await Material.find();
    res.json(materials);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get materials', error: err.message });
  }
};
