import connection from '../config/database.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    try {
        const { username, password, email } = req.body;
        const query = 'INSERT INTO users (username, password, email) VALUES (?, ?, ?)';

        // Validate input data
        if (!username || !password || !email) {
            return res.status(400).json({ 
                error: 'Missing required fields!' 
            });
        }

        // Check if user already exists
        const [users] = await connection.execute('SELECT * FROM users WHERE username = ?', [username, email]);
        if (users.length > 0) {
            return res.status(409).json({ 
                error: 'User already exists!' 
            });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user in database
        const [result] = await connection.execute(query, [username, hashedPassword]);
        
        return res.status(201).json({ 
            message: 'User registered successfully!', 
            userId: result.insertId
        });

    } catch (error) {
        console.error('Register error:', error);
        res.status(500).json({ error: 'Internal server error!' });
    }
}

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const query = 'SELECT * FROM users WHERE username = ?';

        // Validate input data
        if (!username || !password) {
            return res.status(400).json({ 
                error: 'Missing required fields!' 
            });
        }

        // Check if user exists
        const [users] = await connection.execute(query, [username]);
        if (users.length === 0) {
            return res.status(401).json({ 
                error: 'Invalid credentials!' 
            });
        }

        // Compare password with hashed password in database
        const user = users[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ 
                error: 'Invalid credentials!' 
            });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return res.status(200).json({ 
            message: 'Login successful!', 
            token 
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal server error!' });
    }
}