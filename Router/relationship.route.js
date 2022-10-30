import express from "express";
import {
    addRelationship,
    deleteRelationship,
    getRelationship
} from "../Controller/relationship.controller.js";

const router = express.Router();

router.get("/", getRelationship);
router.post("/", addRelationship);
router.delete("/", deleteRelationship);

export default router;
