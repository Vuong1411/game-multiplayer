import connection from '../config/database.js';

const TABLE = 'users';

export const getAll = async (req, res) => {
    try {
        //Check if users exists
        const [users] = await connection.execute(`SELECT * FROM ${TABLE}`);
        if (users.length === 0) {
            return res.status(404).json({ error: 'No users found!' });
        }
        
        res.status(200).json({ success: true, data: users });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ success: false, error: 'Internal server error!' });
    }
}

export const getById = async (req, res) => {
    try {
        const userId = req.params.id;
        const query = `SELECT * FROM ${TABLE} WHERE id = ?`;

        // Check if user exists
        const [user] = await connection.execute(query , [userId]);
        if (user.length === 0) {
            return res.status(404).json({ error: 'User not found!' });
        }

        res.status(200).json(user[0]);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: 'Internal server error!' });
    }
}

export const create = async (req, res) => {
    try {
        const { username, password, email } = req.body;
        const query = `INSERT INTO ${TABLE} (username, password, email) VALUES (?, ?, ?)`;

        // Validate input data
        if (!username || !password || !email) {
            return res.status(400).json({ error: 'Missing required fields!' });
        }

        // Check if user already exists
        const [users] = await connection.execute(`SELECT * FROM ${TABLE} WHERE username = ?`, [username]);
        if (users.length > 0) {
            return res.status(409).json({ error: 'User already exists!' });
        }
        // Create user in database
        const [result] = await connection.execute(query, [username, password, email]);
        
        return res.status(201).json({ message: 'User created successfully!', userId: result.insertId });

    } catch (error) {
        console.error('Create user error:', error);
        res.status(500).json({ error: 'Internal server error!' });
    }
}

export const update = async (req, res) => {
    try {
        const userId = req.params.id;
        const { username, password, email } = req.body;
        const query = `UPDATE ${TABLE} SET username = ?, password = ?, email = ? WHERE id = ?`;

        // Validate input data
        if (!username || !password || !email) {
            return res.status(400).json({ error: 'Missing required fields!' });
        }

        // Check if user exists
        const [user] = await connection.execute(`SELECT * FROM ${TABLE} WHERE id = ?`, [userId]);
        if (user.length === 0) {
            return res.status(404).json({ error: 'User not found!' });
        }

        // Update user in database
        await connection.execute(query, [username, password, email, userId]);
        
        return res.status(200).json({ message: 'User updated successfully!' });

    } catch (error) {
        console.error('Update user error:', error);
        res.status(500).json({ error: 'Internal server error!' });
    }
}

export const remove = async (req, res) => {
    try {
        const { userId } = req.params;
        const query = `DELETE FROM ${TABLE} WHERE id = ?`;

        // Check if user exists
        const [user] = await connection.execute(`SELECT * FROM ${TABLE} WHERE id = ?`, [userId]);
        if (user.length === 0) {
            return res.status(404).json({ error: 'User not found!' });
        }

        // Delete user from database
        await connection.execute(query, [userId]);
        
        return res.status(200).json({ message: 'User deleted successfully!' });

    } catch (error) {
        console.error('Delete user error:', error);
        res.status(500).json({ error: 'Internal server error!' });
    }
}
        