const { Server } = require('socket.io');
const userModel = require('./models/user.model');
const driverModel = require('./models/driver.model');

let io = null;

function initializeSocket(server) {
    io = new Server(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST', 'PUT', 'DELETE'],
            credentials: true
        }
    });

    io.on('connection', (socket) => {
        console.log(`[Socket.io] Client connected: ${socket.id}`);

        socket.on('join', async (data) => {
            try {
                const { userId, userType } = data || {};
                if (!userId || !userType) return;

                if (userType === 'user') {
                    await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
                    console.log(`[Socket.io] User ${userId} bound to socket ${socket.id}`);
                } else if (userType === 'driver' || userType === 'captain') {
                    await driverModel.findByIdAndUpdate(userId, { socketId: socket.id, status: 'available' });
                    console.log(`[Socket.io] Driver/Captain ${userId} bound to socket ${socket.id}`);
                }
            } catch (err) {
                console.error('[Socket.io] Error on join:', err.message);
            }
        });

        socket.on('update-location-driver', async (data) => {
            try {
                const { userId, location } = data || {};
                if (!userId || !location || typeof location.ltd !== 'number' || typeof location.lng !== 'number') {
                    return;
                }

                await driverModel.findByIdAndUpdate(userId, {
                    location: {
                        ltd: location.ltd,
                        lng: location.lng
                    }
                });
            } catch (err) {
                console.error('[Socket.io] Error on update-location-driver:', err.message);
            }
        });

        socket.on('disconnect', async () => {
            console.log(`[Socket.io] Client disconnected: ${socket.id}`);
            try {
                await userModel.findOneAndUpdate({ socketId: socket.id }, { socketId: null });
                await driverModel.findOneAndUpdate({ socketId: socket.id }, { socketId: null });
            } catch (err) {
                console.error('[Socket.io] Error on disconnect cleanup:', err.message);
            }
        });
    });

    return io;
}

function sendMessageToSocketId(socketId, messageObject) {
    if (io && socketId && messageObject && messageObject.event) {
        io.to(socketId).emit(messageObject.event, messageObject.data);
        console.log(`[Socket.io] Emitted '${messageObject.event}' to socket ${socketId}`);
        return true;
    }
    return false;
}

module.exports = {
    initializeSocket,
    sendMessageToSocketId,
    getIO: () => io
};
