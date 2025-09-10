import { Request, Response } from "express";
import { activityService } from "../services/activity.service";

export const getActivities = async (_req: Request, res: Response) => {
   try {
      const activities = await activityService.getAll();

      res.status(200).json({
         success: true,
         activities: activities,
      });
   } catch {
      res.status(500).json({
         success: false,
         message: "server error",
      });
   }
};

export const createActivity = async (req: Request, res: Response) => {
   try {
      const { title, date, time, image, description, spots } = req.body;

      const activity = await activityService.create(
         title,
         date,
         time,
         image,
         description,
         spots,
      );

      res.status(200).json({
         success: true,
         message: "Creación exitosa",
         newActivity: activity,
      });
   } catch {
      res.status(500).json({
         success: false,
         message: "server error",
      });
   }
};

export const editActivity = async (req: Request, res: Response) => {
   try {
      const { title, date, time, image, description, spots } = req.body;
      const { id } = req.params;

      const activity = await activityService.edit(
         id,
         title,
         date,
         time,
         image,
         description,
         spots,
      );

      res.status(200).json({
         success: true,
         message: "Edición exitosa",
         activity: activity,
      });
   } catch {
      res.status(500).json({
         success: false,
         message: "server error",
      });
   }
};

export const deleteActivity = async (req: Request, res: Response) => {
   try {
      const { id } = req.params;

      const activity = await activityService.delete(id);

      res.status(200).json({
         success: true,
         message: "Eliminación exitosa",
         activity: activity,
      });
   } catch {
      res.status(500).json({
         success: false,
         message: "server error",
      });
   }
};
