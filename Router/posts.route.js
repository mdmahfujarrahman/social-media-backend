import express from "express";
import { createPost, getPosts } from "../Controller/posts.controller.js";


const router = express.Router()

router.get('/', getPosts)
router.post('/', createPost)

export default router;