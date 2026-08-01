import mongoose, { Schema, Document } from "mongoose";

export interface IVehicle extends Document {
  patente: string;
  marca: string;
  modelo: string;
  anio: number;
  tipo: string;
  empresa: string;
  activo: boolean;
}

const vehicleSchema = new Schema(
  {
    patente: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },

    marca: {
      type: String,
      required: true,
    },

    modelo: {
      type: String,
      required: true,
    },

    anio: {
      type: Number,
      required: true,
    },

    tipo: {
      type: String,
      required: true,
    },

    empresa: {
      type: String,
      required: true,
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

export const Vehicle = mongoose.model<IVehicle>(
  "Vehicle",
  vehicleSchema
);