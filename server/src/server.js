import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import webRoutes from './routes/web.js';
import apiRoutes from './routes/api.js';

dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server, {
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