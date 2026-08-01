import { Request, Response } from "express";
import { createVehicle } from "../services/vehicle.service.js";
import { getVehicles } from "../services/vehicle.service.js";

export async function create(req: Request, res: Response) {
  try {
    const vehicle = await createVehicle(req.body);

    res.status(201).json({
      message: "Vehículo registrado correctamente",
      vehicle,
    });
  } catch (error: any) {
    res.status(error.statusCode || 500).json({
      message: error.message || "Error interno del servidor",
    });
  }
}
export async function getAll(req: Request, res: Response) {
  try {
    const vehicles = await getVehicles();

    res.status(200).json({
      total: vehicles.length,
      vehicles,
    });
  } catch (error: any) {
    res.status(error.statusCode || 500).json({
      message: error.message || "Error interno del servidor",
    });
  }
}