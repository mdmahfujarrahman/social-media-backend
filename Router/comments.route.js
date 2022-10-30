import express from "express";
import {
    getComments,
    postComments
} from "../Controller/comments.controller.js";

const router = express.Router();

router.get("/", getComments);
router.post("/", postComments);

export default router;
