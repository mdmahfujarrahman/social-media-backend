import jwt from "jsonwebtoken";
import { db } from "../db/connect.js";

export const getLikes = (req, res) => {
        const query ="SELECT userId FROM likes WHERE postId =?";

        db.query(query, [req.query.postId], (err, result) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(result.map(like => like.userId));
        });
};
export const addLike = (req, res) => {
        const token = req.cookies.accessToken;

    if (!token) return res.status(401).json("Not log in");

    jwt.verify(token, "secretKey", (err, userInfo) => {
        if (err) return res.status(403).json("Token not valid");
        const query =
            "INSERT INTO likes (`userId`, `postId`) VALUES (?)";

        const value = [
            userInfo.id,
            req.body.postId
        ];

        db.query(query, [value], (err, result) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Post has been liked");
        });
    });
};




export const deleteLike = (req, res) => {
        const token = req.cookies.accessToken;

    if (!token) return res.status(401).json("Not log in");

    jwt.verify(token, "secretKey", (err, userInfo) => {
        if (err) return res.status(403).json("Token not valid");
        const query = "DELETE FROM likes WHERE `userId` = ? AND `postId` = ? ";

    

        db.query(query, [
            userInfo.id,
            req.query.postId
        ], (err, result) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("post has been unlike");
        });
    });
};


