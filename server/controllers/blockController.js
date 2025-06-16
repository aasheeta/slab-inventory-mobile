const Block = require('../models/Block');

exports.createBlock = async (req, res) => {
  try {
    const data = { ...req.body, owner: req.user?.userId || null };
    const block = new Block(data);
    await block.save();
    res.status(201).json(block);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBlocks = async (req, res) => {
  try {
    const blocks = await Block.find({ owner: req.user?.userId || null });
    res.json(blocks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
