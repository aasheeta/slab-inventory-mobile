const Bundle = require('../models/Bundle');

exports.createBundle = async (req, res) => {
  try {
    const data = { ...req.body, owner: req.user.userId };
    const bundle = new Bundle(data);
    await bundle.save();
    res.status(201).json(bundle);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBundles = async (req, res) => {
  try {
    const bundles = await Bundle.find({ owner: req.user.userId });
    res.json(bundles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
