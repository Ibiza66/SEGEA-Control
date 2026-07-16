export interface User {
  id: string;

  nombre: string;

  apellido: string;

  correo: string;

  rol: "trabajador" | "inspector" | "supervisor" | "administrador";

  activo: boolean;
}
