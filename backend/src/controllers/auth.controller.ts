import { Request, Response } from "express";
import { registerUser, loginUser } from "../services/auth.service.js";

export async function register(req: Request, res: Response) {
  try {
    const user = await registerUser(req.body);

    res.status(201).json({
      message: "Usuario registrado correctamente",
      user,
    });
  } catch (error: any) {
    res.status(error.statusCode || 500).json({
      message: error.message || "Error interno del servidor",
    });
  }
}
export async function login(req: Request, res: Response) {
  try {
    const result = await loginUser(req.body);

    res.status(200).json({
      message: "Inicio de sesión exitoso",
      ...result,
    });
  } catch (error: any) {
    res.status(error.statusCode || 500).json({
      message: error.message || "Error interno del servidor",
    });
  }
}