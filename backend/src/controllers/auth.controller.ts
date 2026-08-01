import { Request, Response } from "express";
import { registerUser } from "../services/auth.service.js";

export async function register(req: Request, res: Response) {
  try {
    const user = await registerUser(req.body);

    return res.status(201).json({
      message: "Usuario registrado correctamente",
      user,
    });

  } catch (error) {
    return res.status(400).json({
      message: error instanceof Error ? error.message : "Error",
    });
  }
}