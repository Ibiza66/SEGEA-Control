import bcrypt from "bcrypt";
import { User, IUser, UserRole } from "../models/User.js";
import { AppError } from "../errors/AppError.js";

interface RegisterUserDTO {
  nombre: string;
  apellido: string;
  correo: string;
  password: string;
  role?: UserRole;
}

export async function registerUser(data: RegisterUserDTO): Promise<IUser> {
  const { nombre, apellido, correo, password, role } = data;

  // Verificar si ya existe el correo
  const existingUser = await User.findOne({ correo });

  if (existingUser) {
    throw new AppError("El correo ya está registrado", 409);
  }

  // Encriptar contraseña
  const hashedPassword = await bcrypt.hash(password, 10);

  // Crear usuario
  const user = await User.create({
    nombre,
    apellido,
    correo,
    password: hashedPassword,
    role: role ?? UserRole.WORKER,
  });

  return user;
}