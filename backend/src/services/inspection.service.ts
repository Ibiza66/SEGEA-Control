import { Inspection, IInspection } from "../models/Inspection.js";
import { Vehicle } from "../models/Vehicle.js";
import { User } from "../models/User.js";
import { AppError } from "../errors/AppError.js";
import { InspectionStatus } from "../models/Inspection.js";

interface CreateInspectionDTO {
  vehicle: string;
  inspector: string;
  observaciones?: string;
}

export async function createInspection(
  data: CreateInspectionDTO
): Promise<IInspection> {

  const vehicle = await Vehicle.findById(data.vehicle);

  if (!vehicle) {
    throw new AppError("Vehículo no encontrado", 404);
  }

  const inspector = await User.findById(data.inspector);

  if (!inspector) {
    throw new AppError("Inspector no encontrado", 404);
  }

  const inspection = await Inspection.create({
    vehicle: data.vehicle,
    inspector: data.inspector,
    observaciones: data.observaciones ?? "",
    estado: InspectionStatus.PENDING,
  });

  return inspection;
}
export async function getInspections(): Promise<IInspection[]> {
  return await Inspection.find()
    .populate("vehicle")
    .populate("inspector", "-password")
    .sort({ createdAt: -1 });
}

export async function getInspectionById(
  id: string
): Promise<IInspection> {
  const inspection = await Inspection.findById(id)
    .populate("vehicle")
    .populate("inspector", "-password");

  if (!inspection) {
    throw new AppError("Inspección no encontrada", 404);
  }

  return inspection;
}
interface UpdateInspectionDTO {
  observaciones?: string;
  estado?: InspectionStatus;
}

export async function updateInspection(
  id: string,
  data: UpdateInspectionDTO
): Promise<IInspection> {
  const inspection = await Inspection.findByIdAndUpdate(
    id,
    data,
    {
      new: true,
      runValidators: true,
    }
  )
    .populate("vehicle")
    .populate("inspector", "-password");

  if (!inspection) {
    throw new AppError("Inspección no encontrada", 404);
  }

  return inspection;
}
export async function deleteInspection(
  id: string
): Promise<void> {
  const inspection = await Inspection.findByIdAndDelete(id);

  if (!inspection) {
    throw new AppError("Inspección no encontrada", 404);
  }
}