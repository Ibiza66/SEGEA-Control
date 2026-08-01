import { Schema, model, Document } from "mongoose";

export enum UserRole {
  ADMIN = "ADMIN",
  INSPECTOR = "INSPECTOR",
  WORKER = "WORKER",
}

export interface IUser extends Document {
  nombre: string;
  apellido: string;
  correo: string;
  password: string;
  role: UserRole;
  activo: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
    },

    apellido: {
      type: String,
      required: true,
      trim: true,
    },

    correo: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.WORKER,
    },

    activo: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export const User = model<IUser>("User", userSchema);