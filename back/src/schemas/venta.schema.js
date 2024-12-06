import { z } from "zod";

export const ventaSchema = z.object({
  producto: z.string({
    required_error: "El nombre del producto es obligatorio",
  }),
  codigo: z.string({
    required_error: "El codigo del producto es obligatorio",
  }),
  monto: z
    .number({
      required_error: "El monto es obligatorio",
    })
    .positive({
      message: "El monto debe ser un número mayor a 0",
    }),
  metodopago: z.string({
      required_error: "El metodo de pago es obligatorio",
    }),
});
