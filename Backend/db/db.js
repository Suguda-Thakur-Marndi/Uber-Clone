const mongoose = require('mongoose');

async function connectToDatabase() {
    try {
        const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI;

        if (!mongoUri) {
            throw new Error('Missing MongoDB URI. Set MONGODB_URI or MONGO_URI in .env');
        }

        await mongoose.connect(mongoUri);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Database connection failed:', error);
        process.exit(1);
    }
}


module.exports = connectToDatabase;