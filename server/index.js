import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import pool from './db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

app.get('/health', (req, res) => {
    res.json({ status: 'server is running' });
});

// Start Server
const server = app.listen(PORT, async () => {
    console.log(`🚀 Server listening on port ${PORT}`);

    // Test database connection
    try {
        const result = await pool.query('SELECT NOW()');
        console.log('✅ PostgreSQL Connected successfully:', result.rows[0].now);
    } catch (err) {
        console.error('❌ PostgreSQL Connection Error:', err.message);
    }
});

// Keep process alive if it tries to exit prematurely
setInterval(() => { }, 1000 * 60 * 60);

// Global error handling
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
});
