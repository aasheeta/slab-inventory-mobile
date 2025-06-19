const express = require('express');
const router = express.Router();
const materialController = require('../controllers/materialController');

router.post('/', materialController.createMaterial);
router.get('/', materialController.getAllMaterials);

module.exports = router;
