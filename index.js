import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import authRoutes from "./Router/auth.route.js";
import commentsRoutes from "./Router/comments.route.js";
import likesRoutes from "./Router/likes.route.js";
import postsRoutes from "./Router/posts.route.js";
import usersRoutes from "./Router/users.route.js";
const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());





app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/posts", postsRoutes);
app.use("/api/comments", commentsRoutes);
app.use("/api/likes", likesRoutes);




app.listen(5000,()=>{
    console.log(`Server Start`);
})