import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../db.js';

const router = express.Router();

// Register
router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
    console.log(`Signup attempt for: ${email}`);

    try {
        const userExist = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (userExist.rows.length > 0) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await pool.query(
            'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email',
            [name, email, hashedPassword]
        );

        const token = jwt.sign({ id: newUser.rows[0].id }, process.env.JWT_SECRET || 'secret_key', {
            expiresIn: '24h',
        });

        console.log('Signup successful');
        res.status(201).json({ token, user: newUser.rows[0] });
    } catch (err) {
        console.error('SERVER ERROR DURING SIGNUP:', err);
        res.status(500).json({ message: 'Server error: ' + err.message });
    }
});

// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log(`Login attempt for: ${email}`);

    try {
        const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (user.rows.length === 0) {
            return res.status(400).json({ message: 'Invalid Credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.rows[0].password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid Credentials' });
        }

        const token = jwt.sign({ id: user.rows[0].id }, process.env.JWT_SECRET || 'secret_key', {
            expiresIn: '24h',
        });

        console.log('Login successful');
        res.json({
            token,
            user: { id: user.rows[0].id, name: user.rows[0].name, email: user.rows[0].email },
        });
    } catch (err) {
        console.error('SERVER ERROR DURING LOGIN:', err);
        res.status(500).json({ message: 'Server error: ' + err.message });
    }
});

export default router;
