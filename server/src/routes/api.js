import express, { Router } from 'express';
import { getHomePage, getTestPage } from '../controllers/homeController.js';
import * as authController from '../controllers/authController.js';
import * as userController from '../controllers/userController.js';

const router = express.Router();

router.get('/', getHomePage);
router.get('/test', getTestPage);

// Auth routes
router.post('/register', authController.register);
router.post('/login', authController.login);

// User routes
Router.get('/users', userController.getAll);
Router.get('/users/:id', userController.getById);
Router.post('/users', userController.create);
Router.put('/users/:id', userController.update);
Router.delete('/users/:id', userController.remove);



export default router;