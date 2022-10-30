import jwt from "jsonwebtoken";
import { db } from "../db/connect.js";

export const getRelationship = (req, res) => {
    const query =
        "SELECT followerUserId FROM relationship WHERE followerUserId =?";

    db.query(query, [req.query.followerUserId], (err, result) => {
        if (err) return res.status(500).json(err);
        return res
            .status(200)
            .json(result.map((relationship) => relationship.followerUserId));
    });
};
export const addRelationship = (req, res) => {
    const token = req.cookies.accessToken;

    if (!token) return res.status(401).json("Not log in");

    jwt.verify(token, "secretKey", (err, userInfo) => {
        if (err) return res.status(403).json("Token not valid");
        const query =
            "INSERT INTO relationship (`followerUserId`, `followedUserId`) VALUES (?)";

        const value = [userInfo.id, req.body.userId];

        db.query(query, [value], (err, result) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Following");
        });
    });
};

export const deleteRelationship = (req, res) => {
    const token = req.cookies.accessToken;

    if (!token) return res.status(401).json("Not log in");

    jwt.verify(token, "secretKey", (err, userInfo) => {
        if (err) return res.status(403).json("Token not valid");
        const query =
            "DELETE FROM relationship WHERE `followerUserId` = ? AND `followedUserId` = ? ";

        db.query(
            query,
            [userInfo.id, req.query.userId],
            (err, result) => {
                if (err) return res.status(500).json(err);
                return res.status(200).json("UnFollow");
            }
        );
    });
};
