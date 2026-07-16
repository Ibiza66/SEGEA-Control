export type VehicleStatus = "Activo" | "Mantenimiento" | "Fuera de servicio";

export interface Vehicle {
  id: string;
  patente: string;
  marca: string;
  modelo: string;
  anio: number;
  color: string;
  kilometraje: number;
  estado: VehicleStatus;
  revisionTecnica: Date;
  mantencion: Date;
  observaciones: string;
}
