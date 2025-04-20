let handleLogin = (req, res) => {
    const { username, password } = req.body;
    if (username === 'admin' && password === 'password') {
        res.status(200).json({
            message: 'Login successful',
            user: {
                username: username,
                role: 'admin'
            }
        });
    } else {
        res.status(401).json({
            message: 'Invalid credentials'
        });
    }
}

module.exports = {
    handleLogin: handleLogin,
}