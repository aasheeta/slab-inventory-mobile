const express = require('express');
const { createBlock, getBlocks } = require('../controllers/blockController');
const router = express.Router();

// Removed auth middleware
router.post('/', createBlock);
router.get('/', getBlocks);

module.exports = router;
