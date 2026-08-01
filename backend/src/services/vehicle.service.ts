import { Vehicle, IVehicle } from "../models/Vehicle.js";
import { AppError } from "../errors/AppError.js";

interface CreateVehicleDTO {
  patente: string;
  marca: string;
  modelo: string;
  anio: number;
  tipo: string;
  empresa: string;
}

export async function createVehicle(
  data: CreateVehicleDTO
): Promise<IVehicle> {
  // Verificar que la patente no exista
  const existingVehicle = await Vehicle.findOne({
    patente: data.patente.toUpperCase(),
  });

  if (existingVehicle) {
    throw new AppError("La patente ya está registrada", 409);
  }

  // Crear vehículo
  const vehicle = await Vehicle.create({
    ...data,
    patente: data.patente.toUpperCase(),
  });

  return vehicle;
}
export async function getVehicles(): Promise<IVehicle[]> {
  return await Vehicle.find().sort({ createdAt: -1 });
}