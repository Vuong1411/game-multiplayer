const express = require('express');
const router = express.Router();

import homeController from '../controllers/homeController.js';
import userController from '../controllers/userController.js';

router.get('/', homeController.getHomePage);
router.get('/test', homeController.getTestPage);

module.exports = router;