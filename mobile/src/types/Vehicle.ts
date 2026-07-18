export type VehicleStatus =
  | "Activo"
  | "Mantenimiento"
  | "Fuera de servicio";

export interface Vehicle {
  // Identificador interno del sistema
  id: string;

  // Identificador del sticker NFC (vacío hasta asociarlo)
  nfcId: string;

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

  foto?: string;
}