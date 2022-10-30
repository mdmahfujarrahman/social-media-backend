import express from "express";
import { getSingleUser } from "../Controller/users.controller.js";

const router = express.Router()


router.get('/find/:userId', getSingleUser)

export default router;