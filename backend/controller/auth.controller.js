const db = require("../db");
const bcrypt = require("bcryptjs");

class AuthController {
    async registerUser(req, res) {
        try {
            const {user_login, user_email, user_password} = req.body;
            const checker = await db.query(
                "SELECT 1 FROM users WHERE user_login = $1",
                [user_login]
            );
            const hash_user_password = bcrypt.hashSync(user_password, 5);
            const newUser = await db.query(
                "INSERT INTO users (user_login, user_email, user_password) VALUES ($1, $2, $3) RETURNING *",
                [user_login, user_email, hash_user_password]
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
                "SELECT * FROM users WHERE user_login = $1",
                [user_login]
            );

            result["userPresence"] = true;
            if (result.rowCount === 0) {
                result["userPresence"] = false;
                res.json(result);
            };

            const validPassword = bcrypt.compareSync(user_password, result.rows[0].user_password);
            result["passwordCorrect"] = true;
            if (!validPassword){
                console.log(result);
                req.session.user = {
                    user_login: user_login
                };
                result["passwordCorrect"] = false;  
            };

            console.log(result);
            res.json(result);
        } catch(error) {
            console.error("Error in loginUser", error.message);
        }
    }
    async logoutUser(req, res) {
        try {
            const logoutInfo = req.body;
            if (logoutInfo) {
                req.session.destroy(() => {
                    console.log("logout");
                    res.json({succes: true});
                });
            } else {
                res.json({succes: false});
            };
        } catch(error) {
            console.error("Error in logoutUser", error.message);
        }
    }
}

module.exports = new AuthController();