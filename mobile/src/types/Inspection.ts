export type InspectionStatus =
  | "Pendiente"
  | "Aprobada"
  | "Rechazada";

export interface ChecklistResult {
  item: string;
  cumple: boolean;
  observacion: string;
  foto?: string;
}

export interface Inspection {
  id: string;
  vehicleId: string;
  inspector: string;
  fecha: string;
  estado: InspectionStatus;
  observaciones: string;

  checklist: ChecklistResult[];
}