const http = require('http');
const app = require('./app');
const { initializeSocket } = require('./socket');

const port = process.env.PORT || 3000;
const server = http.createServer(app);

// Initialize real-time Socket.io
initializeSocket(server);

server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
        console.error(`Port ${port} is already in use. Stop the existing process or change PORT in .env`);
        process.exit(1);
    }

    console.error('Server startup failed:', error.message);
    process.exit(1);
});

server.listen(port, () => {
    console.log(`🚀 Uber Backend & Socket Server running on port ${port}`);
});
