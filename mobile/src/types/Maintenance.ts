export type MaintenanceType =
  | "Preventivo"
  | "Correctivo";

export interface Maintenance {
  id: string;
  vehicleId: string;
  tipo: MaintenanceType;
  fecha: string;
  kilometraje: string;
  costo: string;
  descripcion: string;
}