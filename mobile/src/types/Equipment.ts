export type EquipmentStatus =
  | "Operativo"
  | "En mantenimiento"
  | "Fuera de servicio";

export interface Equipment {
  id: string;
  nfcId: string;

  nombre: string;
  codigo: string;

  categoria: string;

  marca: string;
  modelo: string;

  numeroSerie: string;

  ubicacion: string;

  fechaCertificacion: Date;
  vencimientoCertificacion: Date;

  estado: EquipmentStatus;

  observaciones: string;

  foto?: string;
}
