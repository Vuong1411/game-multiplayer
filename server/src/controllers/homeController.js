const getHomePage = (req, res) => {
    res.json({
        message: 'Welcome to Game Multiplayer API',
    });
}

const getTestPage = (req, res) => {
    res.json({
        message: 'Test API',
        endpoints: {
            test: '/api/test',
            websocket: 'ws://localhost:5000'
        }
    });
}

module.exports = {
    getHomePage,
    getTestPage,
}