import {
  ChecklistItem,
  IChecklistItem,
} from "../models/ChecklistItem.js";
import { AppError } from "../errors/AppError.js";

interface CreateChecklistItemDTO {
  nombre: string;
  categoria: string;
  obligatorio: boolean;
  tipoVehiculo: string;
}

export async function createChecklistItem(
  data: CreateChecklistItemDTO
): Promise<IChecklistItem> {
  const item = await ChecklistItem.create(data);

  return item;
}

export async function getChecklistItems(): Promise<IChecklistItem[]> {
  return await ChecklistItem.find().sort({ createdAt: -1 });
}

export async function getChecklistItemById(
  id: string
): Promise<IChecklistItem> {
  const item = await ChecklistItem.findById(id);

  if (!item) {
    throw new AppError("Ítem no encontrado", 404);
  }

  return item;
}

interface UpdateChecklistItemDTO {
  nombre?: string;
  categoria?: string;
  obligatorio?: boolean;
  tipoVehiculo?: string;
}

export async function updateChecklistItem(
  id: string,
  data: UpdateChecklistItemDTO
): Promise<IChecklistItem> {
  const item = await ChecklistItem.findByIdAndUpdate(
    id,
    data,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!item) {
    throw new AppError("Ítem no encontrado", 404);
  }

  return item;
}

export async function deleteChecklistItem(
  id: string
): Promise<void> {
  const item = await ChecklistItem.findByIdAndDelete(id);

  if (!item) {
    throw new AppError("Ítem no encontrado", 404);
  }
}