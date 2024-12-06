import mongoose from "mongoose";

const ventaSchema = new mongoose.Schema(
  {
    producto: {
      type: String,
      required: true,
    },
    monto: {
      type: Number,
      required: true,
    },
    metodopago: {
      type: String,
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

export default mongoose.model("Venta", ventaSchema);
