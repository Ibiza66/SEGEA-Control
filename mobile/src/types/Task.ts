export type TaskStatus =
  | "pendiente"
  | "en_proceso"
  | "completada";

export type TaskPriority =
  | "alta"
  | "media"
  | "baja";

export interface Task {
  id: string;

  titulo: string;

  descripcion: string;

  asignadoA: string;

  fechaCreacion: Date;

  fechaLimite: Date;

  prioridad: TaskPriority;

  estado: TaskStatus;
}