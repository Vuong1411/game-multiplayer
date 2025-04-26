import express from 'express';
import { getHomePage, getTestPage } from '../controllers/homeController.js';

const router = express.Router();

router.get('/', getHomePage);
router.get('/test', getTestPage);

export default router;