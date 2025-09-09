import express from "express";
import { privateRoute } from "../middleware/auth.middleware";
import {
   createActivity,
   deleteActivity,
   getActivities,
} from "../controllers/activity.contoller";

const router = express.Router();

router.get("/get-all", privateRoute, getActivities);
router.post("/create", privateRoute, createActivity);
router.delete("/delete/:id", privateRoute, deleteActivity);

export default router;
