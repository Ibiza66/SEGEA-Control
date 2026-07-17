export type InspectionStatus =
  | "Pendiente"
  | "Aprobada"
  | "Rechazada";

export interface Inspection {
  id: string;
  vehicleId: string;
  inspector: string;
  fecha: string;
  estado: InspectionStatus;
  observaciones: string;
}