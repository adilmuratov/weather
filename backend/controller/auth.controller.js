const db = require("../db")

class AuthController {
    async registerUser(req, res) {
        const {user_login, user_email, user_password} = req.body;
        const newUser = await db.query(
            "INSERT INTO users (user_login, user_email, user_password) VALUES ($1, $2, $3) RETURNING *",
            [user_login, user_email, user_password]
        );
        res.json(newUser.rows);
    }
    async loginUser(req, res) {
        const {user_login, user_password} = req.body;
        const user = await db.query(
            "",
            [user_login, user_password]
        );
        res.json(user.rows[0]);
    }
    async logoutUser(req, res) {
        const id = req.body;
        const user = await db.query(
            "DELETE FROM users WHERE id=$1",
            [id]
        );
        res.json(user.rows[0]);
    }
}

module.exports = new AuthController();