require('dotenv').config();

const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIO = require('socket.io');
const webRoutes = require('./routes/web');
const apiRoutes = require('./routes/api');

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        credentials: true
    }
});

// Middleware
app.use(cors());
app.use(express.json());

// Basic Socket.IO connection
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Test event handler
    socket.on('test-event', (data) => {
        console.log('Received test event:', data);
        socket.emit('test-response', { 
            message: 'Server received your message', 
            receivedData: data 
        });
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

// Root route
app.use('/', webRoutes);

// Test API Route
app.use('/api', apiRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start server
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log('Server is running:');
    console.log(`- API URL: http://${HOST}:${PORT}`);
    console.log(`- Test endpoint: http://${HOST}:${PORT}/api/test`);
});