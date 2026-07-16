import { User } from "../types/User";

export async function login(
  correo: string,
  password: string,
): Promise<User | null> {
  if (correo === "admin@segea.cl" && password === "123456") {
    return {
      id: "1",
      nombre: "Administrador",
      apellido: "SEGEA",
      correo,
      rol: "administrador",
      activo: true,
    };
  }

  return null;
}
