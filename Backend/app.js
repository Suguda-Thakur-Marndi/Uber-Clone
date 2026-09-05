const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectToDatabase = require('./db/db');

// Connect to MongoDB
connectToDatabase();

const app = express();

// Security and utility middlewares
app.use(cors({
    origin: (origin, callback) => callback(null, true), // Allow frontend dev & preview
    credentials: true
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'online',
        uptime: process.uptime(),
        timestamp: new Date().toISOString()
    });
});

// Routes
const userRoutes = require('./routes/user.routes');
const driverRoutes = require('./routes/driver.routes');
const mapsRoutes = require('./routes/maps.routes');
const rideRoutes = require('./routes/ride.routes');

app.use('/users', userRoutes);
app.use('/drivers', driverRoutes);
app.use('/captains', driverRoutes); // Backward compatibility alias
app.use('/maps', mapsRoutes);
app.use('/rides', rideRoutes);

// Catch-all 404
app.use((req, res) => {
    res.status(404).json({ message: `Cannot ${req.method} ${req.originalUrl}` });
});

// Centralized error handler
app.use((err, req, res, next) => {
    console.error('[App Error]', err.stack || err);
    res.status(err.status || 500).json({
        message: err.message || 'Internal Server Error',
        ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
    });
});

module.exports = app;