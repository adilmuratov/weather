const db = require("../db")

class AuthController {
    async registerUser(req, res) {
        try {
            const {user_login, user_email, user_password} = req.body;
            const newUser = await db.query(
                "INSERT INTO users (user_login, user_email, user_password) VALUES ($1, $2, $3) RETURNING *",
                [user_login, user_email, user_password]
            );
            res.json(newUser.rows);
        } catch (error) {
            console.error("Error in registerUser", error.message);
        }
    }
    async loginUser(req, res) {
        try {
            const {user_login, user_password} = req.body;
            const result = await db.query(
                "SELECT 1 FROM users WHERE user_login = $1",
                [user_login]
            );
            console.log(result);
            res.json(result.rows);
        } catch(error) {
            console.error("Error in loginUser", error.message);
        }

    }
}

module.exports = new AuthController();