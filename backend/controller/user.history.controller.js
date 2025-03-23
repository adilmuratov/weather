const db = require("../db");

class UserHistoryController {
    async createActionHistory(req, res) {
        const {user_id, action} = req.body;
        const newAction = await db.query(
            "INSERT INTO user_history (user_id, action) VALUES ($1, $2) RETURNING *",
            [user_id, action]
        );
        res.json(newAction.rows);
    }
    async getAllUserHistory(req, res) {
        const user_id = req.params.id; 
        const allHistory = await db.query(
            "SELECT * FROM user_history WHERE user_id = $1 ORDER BY timestamp DESC",
            [user_id]
        );
        res.json(allHistory.rows);
    }
    async deleteActionHistory(req, res) {
        const id = req.params.id;
        const actionForDelete = await db.query(
            "DELETE FROM user_history where id = $1",
            [id]
        );
        res.json(actionForDelete.rows[0]);
    }
}

module.exports = new UserHistoryController();