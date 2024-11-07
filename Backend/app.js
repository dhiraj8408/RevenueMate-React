import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import passport from 'passport';
import './db/db.js'; // Ensure this connects to your database
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';

dotenv.config();

const app = express();

// CORS Configuration
app.use(cors({
    origin: 'http://localhost:3000', // Allow requests from this origin
    methods: ['GET', 'POST', 'OPTIONS'], // Allowed HTTP methods
    credentials: true, // Allow cookies to be sent  
}));

// Body parsers
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Logging
app.use(morgan('dev'));

// Serve static files
app.use(express.static('public'));

// Session management
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false, // Set to true if using HTTPS
        sameSite: 'None' // Required for CORS with credentials
    }
}));

// Passport initialization
app.use(passport.initialize());
app.use(passport.session());

// Import and set up routes
import homeRouter from './Router/home.router.js';
import merchantRouter from './Router/merchant.router.js';
import inventoryRouter from './Router/inventory.router.js';
import profileRouter from './Router/profile.router.js';

app.use('/revenueMate/v1', homeRouter);
app.use('/revenueMate/v1/merchant', merchantRouter);
app.use('/revenueMate/v1/inventory', inventoryRouter);
app.use('/revenueMate/v1/profile', profileRouter);

// Debugging middleware
app.use((req, res, next) => {
    console.log('Session:', req.session);
    console.log('User:', req.user);
    next();
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Expose the app for the server file
export default app;
