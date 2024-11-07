import express from 'express';
import {profileHome , filterTransactions} from '../controllers/profile.controller.js';

const router = express.Router();

router.post('/home', profileHome);

router.post('/filterTransactions', filterTransactions);

export default router;