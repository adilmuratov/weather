const db = require("../db")

class AuthController {
    async registerUser(req, res) {
        try {
            const {user_login, user_email, user_password} = req.body;
            const checker = await db.query(
                "SELECT 1 FROM users WHERE user_login = $1",
                [user_login]
            );
            const newUser = await db.query(
                "INSERT INTO users (user_login, user_email, user_password) VALUES ($1, $2, $3) RETURNING *",
                [user_login, user_email, user_password]
            );
            res.json(newUser);
            
        } catch (error) {
            console.error("Error in registerUser", error.message);
        }
    }
    async loginUser(req, res) {
        try {
            const {user_login, user_password} = req.body;
            const result = await db.query(
                "SELECT * FROM users WHERE user_login = $1 AND user_password = $2",
                [user_login, user_password]
            );
            //TO DO check result 
            //TO DO random string
            //res.cookie('cookieName', 'cookieValue')
            
            console.log(result);
            res.json(result);
        } catch(error) {
            console.error("Error in loginUser", error.message);
        }
    }
}

module.exports = new AuthController();