const socketHandler = (io) => {
    io.on('connection', (socket) => {
        console.log('New client connected:', socket.id);

        socket.on('joinGame', (data) => {
            console.log('Player joined:', data);
        });

        socket.on('gameAction', (data) => {
            console.log('Game action:', data);
        });

        socket.on('disconnect', () => {
            console.log('Client disconnected:', socket.id);
        });
    });
};

module.exports = socketHandler;