const express = require('express');
const { createBundle, getBundles } = require('../controllers/bundleController');
const auth = require('../middleware/auth');
const router = express.Router();

router.use(auth);
router.post('/', createBundle);
router.get('/', getBundles);

module.exports = router;