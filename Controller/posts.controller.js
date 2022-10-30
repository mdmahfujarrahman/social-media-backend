import jwt from "jsonwebtoken";
import moment from "moment";
import { db } from "../db/connect.js";

export const getPosts =(req, res) => {
    const token = req.cookies.accessToken;

    if(!token) return res.status(401).json("Not log in")

    jwt.verify(token, "secretKey", (err, userInfo) => {
        if(err) return res.status(403).json("Token not valid")
        const query = `SELECT p.*, u.id AS userId, name, profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userId) 
    LEFT JOIN relationship AS r ON (p.userId =r.followedUserId) WHERE r.followerUserId =? OR p.userId = ? ORDER BY p.createdAt DESC`;

        db.query(query, [userInfo.id, userInfo.id], (err, result) => {
            if (err) return res.status(500).json(err);

            return res.status(200).json(result);
        });
        
    });

    
    
}

export const createPost = (req, res) => {
    const token = req.cookies.accessToken;

    if (!token) return res.status(401).json("Not log in");

    jwt.verify(token, "secretKey", (err, userInfo) => {
        if (err) return res.status(403).json("Token not valid");
        const query =
            "INSERT INTO posts(`description`, `img`, `createdAt`, `userId`) VALUES (?)";

        const value = [
            req.body.description,
            req.body.img,
            moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            userInfo.id
        ];


        db.query(query, [value], (err, result) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Post has bean Created");
        });
    });
};