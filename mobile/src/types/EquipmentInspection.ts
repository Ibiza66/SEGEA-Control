import { ChecklistItem } from "./ChecklistItem";

export type EquipmentInspectionStatus =
  | "Pendiente"
  | "Aprobada"
  | "Rechazada";

export interface EquipmentInspection {
  id: string;

  equipmentId: string;

  inspector: string;

  fecha: string;

  estado: EquipmentInspectionStatus;

  checklist: ChecklistItem[];

  observaciones: string;

  fotos: string[];
}