import { db } from "../db/connect.js";

export const getSingleUser = (req, res) => {
    const userId = req.params.userId;
    const query = "SELECT * FROM users WHERE id = ?";

    db.query(query, [userId],(err, data) => {
        if (err) return res.status(500).json(err)

        const { password, ...other } = data[0];

        return res.status(200).json(other);
    });

};
