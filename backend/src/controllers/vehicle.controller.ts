import { Request, Response } from "express";
import {
  createVehicle,
  getVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
} from "../services/vehicle.service.js";

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
export async function getById(
  req: Request<{ id: string }>,
  res: Response
) {
  try {
    const { id } = req.params;

const vehicle = await getVehicleById(id);
    res.status(200).json(vehicle);
  } catch (error: any) {
    res.status(error.statusCode || 500).json({
      message: error.message || "Error interno del servidor",
    });
  }
}
export async function update(
  req: Request<{ id: string }>,
  res: Response
) {
  try {
    const vehicle = await updateVehicle(
      req.params.id,
      req.body
    );

    res.status(200).json({
      message: "Vehículo actualizado correctamente",
      vehicle,
    });
  } catch (error: any) {
    res.status(error.statusCode || 500).json({
      message: error.message || "Error interno del servidor",
    });
  }
}
export async function remove(
  req: Request<{ id: string }>,
  res: Response
) {
  try {
    const { id } = req.params;

    await deleteVehicle(id);

    res.status(200).json({
      message: "Vehículo eliminado correctamente",
    });
  } catch (error: any) {
    res.status(error.statusCode || 500).json({
      message: error.message || "Error interno del servidor",
    });
  }
}