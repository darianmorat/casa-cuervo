import express from "express";
import { privateRoute } from "../middleware/auth.middleware";
import {
   createActivity,
   deleteActivity,
   editActivity,
   getActivities,
} from "../controllers/activity.controller";

const router = express.Router();

router.get("/get-all", getActivities);
router.post("/create", privateRoute, createActivity);
router.post("/edit/:id", privateRoute, editActivity);
router.delete("/delete/:id", privateRoute, deleteActivity);

export default router;
