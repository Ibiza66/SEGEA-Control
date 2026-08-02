import mongoose, { Schema, Document } from "mongoose";

export enum ChecklistResult {
  GOOD = "BUENO",
  BAD = "MALO",
  NOT_APPLICABLE = "NO_APLICA",
}

export interface IInspectionAnswer extends Document {
  inspection: mongoose.Types.ObjectId;
  checklistItem: mongoose.Types.ObjectId;

  resultado: ChecklistResult;

  observacion?: string;

  foto?: string;
}

const inspectionAnswerSchema = new Schema<IInspectionAnswer>(
  {
    inspection: {
      type: Schema.Types.ObjectId,
      ref: "Inspection",
      required: true,
    },

    checklistItem: {
      type: Schema.Types.ObjectId,
      ref: "ChecklistItem",
      required: true,
    },

    resultado: {
      type: String,
      enum: Object.values(ChecklistResult),
      required: true,
    },

    observacion: {
      type: String,
      default: "",
    },

    foto: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export const InspectionAnswer =
  mongoose.model<IInspectionAnswer>(
    "InspectionAnswer",
    inspectionAnswerSchema
  );