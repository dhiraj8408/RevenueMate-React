import express from 'express';
import { login, register, logout } from '../controllers/home.controllers.js';

const router = express.Router();

//Login route
router.post('/login', login);

//Register route
router.post('/register', register);

//Logout route
router.post('/logout', logout);

export default router;
