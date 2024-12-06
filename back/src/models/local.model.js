import mongoose from "mongoose";

const localSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    distrito: {
      type: String,
      required: true,
    },
    telefono: {
      type: Number,
      required: true,
      min: 0,
    },
    codigo: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Local", localSchema);
