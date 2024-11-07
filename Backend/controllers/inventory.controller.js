import asyncHandler from 'express-async-handler';
import db from '../db/db.js';

const inventoryHome = asyncHandler(async (req, res) => {
    const { id } = req.body;

    const { rows } = await db.query("SELECT itemname FROM inventory WHERE merchantid = $1", [id]);

    return res.status(200).json(rows);
});

const addInventory = asyncHandler(async (req, res) => {

    const { id, itemname, price } = req.body;

    const merchantid = id;

    const result = await db.query("INSERT INTO inventory (merchantid,itemname,price) VALUES($1, $2,$3)", [merchantid, itemname, price]);

    return res.status(201).json(result.rows[0]);
});

const removeInventory = asyncHandler(async (req, res) => {

    const { id, itemname } = req.body;
    const merchantid = id;

    const result = await db.query("DELETE FROM inventory WHERE merchantid = $1 AND itemname = $2", [merchantid, itemname]);

    return res.status(200).json(result.rows[0]);
});

export { inventoryHome, addInventory, removeInventory };