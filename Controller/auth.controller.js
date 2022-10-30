import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { db } from "../db/connect.js";
import { hashing } from "../util/passowrdhash.js";


export const register = (req, res) => {

    const query = "SELECT * FROM users WHERE username = ?"

    db.query(query,[req.body.username], (err, data) => {
        if (err) return res.status(500).json(err)

        if(data.length) return res.status(409).json("User Already in our Database")
        
        console.log(req.body.password);
        const hashPassword = hashing(req.body.password);

        const query = "INSERT INTO users (`username`, `email`, `password`,`name`) VALUE (?)"

        const values = [
            req.body.username,
            req.body.email,
            hashPassword,
            req.body.name,
        ];

        db.query(query, [values], (err, result) => {
            if (err) return res.status(500).json(err);
            res.status(200).json('User created')

        });
        
    })

    
}
export const login = (req, res) => {
    const query = "SELECT * FROM users WHERE username = ?";

    db.query(query, [req.body.username] ,(err, data) => {
        if (err) return res.status(500).json(err);

        if (data.length === 0) {
            return res.status(404).json("User not found")
        }
        console.log(req.body.password);
        console.log(data[0].password);
        const checkPassword = bcrypt.compareSync(req.body.password, data[0].password);
        
        if (!checkPassword){
            return res.status(400).json("Wrong Password")
        }

        const token = jwt.sign({ id: data[0].id }, "secretKey");

        const {password, ...other} = data[0]
        return res.status(200).json({
            success: true,
            token: token,
            userData: other
        })

    })

}
export const logout= (req, res) => {

}