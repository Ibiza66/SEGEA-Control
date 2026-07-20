import { ChecklistItem } from "./ChecklistItem";

export type VehicleInspectionStatus =
  | "Pendiente"
  | "Aprobada"
  | "Rechazada";

export interface VehicleInspection {
  id: string;

  vehicleId: string;

  inspector: string;

  fecha: string;

  estado: VehicleInspectionStatus;

  checklist: ChecklistItem[];

  observaciones: string;

  fotos: string[];
}