export type MemberRole =
  | "Administrador"
  | "Supervisor"
  | "Conductor"
  | "Mecánico";

export interface Member {
  id: string;
  nombre: string;
  cargo: MemberRole;
  telefono: string;
  correo: string;
  foto?: string;
}