const db = require("../db");

class UserHistoryController {
    async createActionHistory(req, res) {
        try {
            const {user_id, action} = req.body;
            const newAction = await db.query(
                "INSERT INTO user_history (user_id, action) VALUES ($1, $2) RETURNING *",
                [user_id, action]
            );
            res.json(newAction.rows);
        } catch {
            console.error("Error in createActionHistory", error.message);
        }
    }
    async getAllUserHistory(req, res) {
        try {
            const user_id = req.params.id; 
            const allHistory = await db.query(
                "SELECT * FROM user_history WHERE user_id = $1 ORDER BY timestamp DESC",
                [user_id]
            );
            res.json(allHistory.rows);
        } catch {
            console.error("Error in getAllUserHistory", error.message);
        }
    }
    async deleteActionHistory(req, res) {
        try {
            const id = req.params.id;
            const actionForDelete = await db.query(
                "DELETE FROM user_history where id = $1",
                [id]
            );
            res.json(actionForDelete.rows[0]);
        } catch {
            console.error("Error in deleteActionHistory", error.message);
        }
    }
}

module.exports = new UserHistoryController();