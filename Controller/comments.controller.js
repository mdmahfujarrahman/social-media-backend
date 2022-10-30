import jwt from "jsonwebtoken";
import moment from "moment";
import { db } from "../db/connect.js";

export const getComments = (req, res) => {

    const query = `SELECT c.*, u.id AS userId, name, profilePic FROM comments AS c JOIN users AS u ON (u.id = c.userId) 
    WHERE c.postId = ? ORDER BY c.createdAt DESC`;

    db.query(query, [req.query.postId], (err, result) => {
            if (err) return res.status(500).json(err);

            return res.status(200).json(result);
    });
};


export const postComments = (req, res) => {
    const token = req.cookies.accessToken;

    if (!token) return res.status(401).json("Not log in");

    jwt.verify(token, "secretKey", (err, userInfo) => {
        if (err) return res.status(403).json("Token not valid");
        const query =
            "INSERT INTO comments(`description`, `createdAt`, `userId`, `postId`) VALUES (?)";

        const value = [
            req.body.description,
            moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            userInfo.id,
            req.body.postId
        ];

        db.query(query, [value], (err, result) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("comment has bean Created");
        });
    });
};