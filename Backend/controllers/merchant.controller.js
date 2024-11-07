import asyncHandler from 'express-async-handler';
import db from '../db/db.js';

const merchantHome = asyncHandler(async (req, res) => {
    const { id } = req.body;
    const { rows } = await db.query(
        "SELECT itemname, price FROM inventory WHERE merchantid = $1",
        [id]
    );
    return res.status(200).json(rows);
});

const recordSale = asyncHandler(async (req, res) => {

    const { id, customername, amount, items, payment } = req.body;
    const date = new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString();

    const result = await db.query(
        "INSERT INTO sales (merchantid, date, customername, amount, items, payment) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id",
        [id, date, customername, amount, items, payment]
    );

    return res.status(201).json(result.rows[0]);
});

const recordExpense = asyncHandler(async (req, res) => {

    const { id, vendorname, amount, reason, payment } = req.body;
    const date = new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString();

    const result = await db.query(
        "INSERT INTO expenditure (merchantid, date, vendorname, amount, comment, payment) VALUES ($1, $2, $3, $4, $5, $6)",
        [id, date, vendorname, amount, reason, payment]
    );

    return res.status(201).json(result.rows[0]);
});

export { merchantHome, recordSale, recordExpense };
