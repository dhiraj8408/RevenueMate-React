import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { PG_USER, PG_HOST, PG_DATABASE, PG_PASSWORD, PG_PORT, PG_SSL_CERT } = process.env;

const db = new pg.Client({
    user: PG_USER,
    host: PG_HOST,
    database: PG_DATABASE,
    password: PG_PASSWORD,
    port: parseInt(PG_PORT, 10),
    ssl: {
        rejectUnauthorized: true,
        ca: PG_SSL_CERT,
    },
});

(async () => {
    try {
        await db.connect();
        console.log('Connected to the database');
    } catch (error) {
        console.error('Database connection error:', error);
    }
})();

const query = async (text, params) => {
    try {
        const result = await db.query(text, params);
        return result;
    } catch (error) {
        console.error('Database query error:', error);
        throw error;
    }
};

export default { query };