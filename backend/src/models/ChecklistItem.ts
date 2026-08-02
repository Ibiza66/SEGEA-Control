import mongoose, { Schema, Document } from "mongoose";

export interface IChecklistItem extends Document {
  nombre: string;
  categoria: string;
  obligatorio: boolean;
  tipoVehiculo: string;
}

const checklistItemSchema = new Schema<IChecklistItem>(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
    },

    categoria: {
      type: String,
      required: true,
      trim: true,
    },

    obligatorio: {
      type: Boolean,
      default: true,
    },

    tipoVehiculo: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const ChecklistItem = mongoose.model<IChecklistItem>(
  "ChecklistItem",
  checklistItemSchema
);