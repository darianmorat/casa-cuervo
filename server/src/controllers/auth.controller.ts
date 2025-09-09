import { Request, Response } from "express";
import { userService } from "../services/user.service";
import { jwtGenerator } from "../utils/jwtGenerator";
import { clearCookie, setCookie } from "../utils/setCookie";
import { AuthRequest } from "../types/auth";
import { compare } from "bcrypt-ts";

export const authenticate = async (req: Request, res: Response) => {
   try {
      const { email, password } = req.body;
      const user = await userService.findForAuth(email);

      if (!user) {
         res.status(401).json({
            success: false,
            message: "Credenciales invalidas",
         });

         return;
      }

      const hash = user.password;
      const isValid = await compare(password, hash);

      if (!isValid) {
         res.status(401).json({
            success: false,
            message: "Credenciales invalidas",
         });

         return;
      }

      const token = jwtGenerator(user.id);
      setCookie(res, token);

      res.status(200).json({
         success: true,
         message: "Autenticación exitosa",
      });
   } catch {
      res.status(500).json({
         success: false,
         message: "server error",
      });
   }
};

export const logout = (_req: Request, res: Response) => {
   try {
      clearCookie(res);

      res.status(200).json({
         success: true,
         message: "Sesión cerrada",
      });
   } catch {
      res.status(500).json({
         success: false,
         message: "server error",
      });
   }
};

export const verify = async (req: AuthRequest, res: Response) => {
   const { userId } = req.user;
   const user = await userService.findById(userId);

   if (!userId) {
      res.status(401).json({
         success: false,
         message: "Acceso no autorizado",
      });

      return;
   }

   res.status(200).json({
      success: true,
      user: user,
   });
};
