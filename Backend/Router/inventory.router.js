import express from 'express';
import { inventoryHome, addInventory, removeInventory } from '../controllers/inventory.controller.js';

const router = express.Router();

router.post('/home', inventoryHome);

router.post('/addInventory', addInventory);

router.post('/removeInventory', removeInventory);

export default router;