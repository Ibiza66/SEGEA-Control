import { Maintenance } from "../types/Maintenance";

export const maintenances: Maintenance[] = [
  {
    id: "1",
    vehicleId: "1",
    tipo: "Preventivo",
    fecha: "10/07/2026",
    kilometraje: "25000",
    costo: "85000",
    descripcion: "Cambio de aceite y filtros",
  },
  {
    id: "2",
    vehicleId: "2",
    tipo: "Correctivo",
    fecha: "02/07/2026",
    kilometraje: "56000",
    costo: "230000",
    descripcion: "Cambio de pastillas de freno",
  },
];