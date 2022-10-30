import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import authRoutes from "./Router/auth.route.js";
import commentsRoutes from "./Router/comments.route.js";
import likesRoutes from "./Router/likes.route.js";
import postsRoutes from "./Router/posts.route.js";
import usersRoutes from "./Router/users.route.js";
import multer from "multer"
const app = express();


app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", true)
    next();
})
app.use(express.json());
app.use(
    cors({
        origin: "http://localhost:3000",
    })
);
app.use(cookieParser());

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + "-" + uniqueSuffix);
    },
});

const upload = multer({ storage: storage });



app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/posts", postsRoutes);
app.use("/api/comments", commentsRoutes);
app.use("/api/likes", likesRoutes);




app.listen(5000,()=>{
    console.log(`Server Start`);
})