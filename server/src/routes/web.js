const express = require('express');
const router = express.Router();

import homeController from '../controllers/homeController.js';
import userController from '../controllers/userController.js';

// router.Method('/router', handler)
router.get('/', homeController.getHomePage);
router.get('/test', homeController.getTestPage);
router.get('/user', userController.getUserPage);

module.exports = router;