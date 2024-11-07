import asyncHandler from 'express-async-handler'
import passport from 'passport'
import bcrypt from 'bcrypt'
import { Strategy } from "passport-local";
import db from '../db/db.js'
const saltRounds = process.env.SALT_ROUNDS || 10;

passport.use(
    new Strategy({ usernameField: 'email', passwordField: 'password' }, async (email, password, cb) => {
        try {
            const result = await db.query("SELECT * FROM userlists WHERE email = $1", [email]);
            if (result.rows.length > 0) {
                const user = result.rows[0];
                console.log("User found:", user);
                const storedHashedPassword = user.password;
                bcrypt.compare(password, storedHashedPassword, (err, valid) => {
                    if (err) {
                        console.error("Error comparing passwords:", err);
                        return cb(err);
                    }
                    if (valid) {
                        console.log("User authenticated");
                        return cb(null, user);
                    } else {
                        console.log("Invalid password");
                        return cb(null, false);
                    }
                });
            } else {
                console.log("User not found");
                return cb(null, false);
            }
        } catch (err) {
            console.error("Error during verification:", err);
            return cb(err);
        }
    })
);

passport.serializeUser((user, cb) => {
    cb(null, user.id);
});

passport.deserializeUser(async (id, cb) => {
    try {
        const result = await db.query("SELECT * FROM userlists WHERE id = $1", [id]);
        if (result.rows.length > 0) {
            cb(null, result.rows[0]);
        } else {
            cb(new Error("User not found"));
        }
    } catch (err) {
        cb(err);
    }
});

const login = asyncHandler(async (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err)
        }
        if (!user) {
            return res.status(401).json({ message: "No User"});
        }
        req.logIn(user, (err) => {
            if (err) {
                return next(err)
            }
            return res.status(200).json(user)
        })
    })(req, res, next);
});

const register = asyncHandler(async (req, res, next) => {
    const { name, email, password } = req.body;

    const { rows: existingUser } = await db.query(
        "SELECT * FROM userlists WHERE email = $1",
        [email]
    );

    if (existingUser.length > 0) {
        return res.status(400).json({ message: "User already exists" });
        // REYYY IKKADA LOGIN PAGE KI REDIRECT AVVALI ELA CHESTAVO NEEKEY TELIYALI
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const { rows: newUser } = await db.query(
        "INSERT INTO userlists (username, email, password) VALUES ($1, $2, $3) RETURNING *",
        [name, email, hashedPassword]
    );

    const userToLogin = newUser[0];

    req.logIn(userToLogin, (err) => {
        if (err) {
            return next(err);
        }
        return res.status(201).json(userToLogin);
    });
});

const logout = asyncHandler(async (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.status(200).json({ message: "Logged out" });
    });
});


export { login, register, logout };