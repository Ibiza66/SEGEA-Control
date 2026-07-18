import { Equipment } from "../types/Equipment";

export const equipments: Equipment[] = [
  {
    id: "1",
    nfcId: "",

    codigo: "EQ-001",
    nombre: "Extintor PQS 6 Kg",

    categoria: "Extintor",

    marca: "Ansul",
    modelo: "ABC-6KG",

    numeroSerie: "SN-123456",

    ubicacion: "Bodega Central",

    fechaCertificacion: new Date("2026-01-15"),
    vencimientoCertificacion: new Date("2027-01-15"),

    estado: "Operativo",

    observaciones: "Equipo operativo.",

    foto: "",
  },

  {
    id: "2",
    nfcId: "",

    codigo: "EQ-002",
    nombre: "Botiquín de Primeros Auxilios",

    categoria: "Seguridad",

    marca: "First Aid",
    modelo: "FA-100",

    numeroSerie: "SN-654321",

    ubicacion: "Camión 03",

    fechaCertificacion: new Date("2025-10-10"),
    vencimientoCertificacion: new Date("2026-10-10"),

    estado: "En mantenimiento",

    observaciones: "Faltan insumos.",

    foto: "",
  },

  {
    id: "3",
    nfcId: "",

    codigo: "EQ-003",
    nombre: "Arnés de Seguridad",

    categoria: "EPP",

    marca: "3M",
    modelo: "Protecta",

    numeroSerie: "SN-987654",

    ubicacion: "Bodega EPP",

    fechaCertificacion: new Date("2025-05-20"),
    vencimientoCertificacion: new Date("2026-05-20"),

    estado: "Fuera de servicio",

    observaciones: "Presenta desgaste.",

    foto: "",
  },
];