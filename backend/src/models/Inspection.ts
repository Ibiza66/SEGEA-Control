import mongoose, { Schema, Document } from "mongoose";

export enum InspectionStatus {
  PENDING = "PENDIENTE",
  IN_PROGRESS = "EN_PROCESO",
  COMPLETED = "COMPLETADA",
}

export interface IInspection extends Document {
  vehicle: mongoose.Types.ObjectId;
  inspector: mongoose.Types.ObjectId;
  fecha: Date;
  observaciones: string;
  estado: InspectionStatus;
}

const inspectionSchema = new Schema<IInspection>(
  {
    vehicle: {
      type: Schema.Types.ObjectId,
      ref: "Vehicle",
      required: true,
    },

    inspector: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    fecha: {
      type: Date,
      default: Date.now,
    },

    observaciones: {
      type: String,
      default: "",
    },

    estado: {
      type: String,
      enum: Object.values(InspectionStatus),
      default: InspectionStatus.PENDING,
    },
  },
  {
    timestamps: true,
  }
);

export const Inspection = mongoose.model<IInspection>(
  "Inspection",
  inspectionSchema
);