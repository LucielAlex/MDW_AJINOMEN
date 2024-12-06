import { z } from "zod";

export const ventaSchema = z.object({
  nombre: z.string({
    required_error: "El nombre del local es obligatorio",
  }),
  codigo: z.string({
    required_error: "El codigo del local es obligatorio",
  }),
  telefono: z
    .number({
      required_error: "El número de telefono es obligatorio",
    })
    .positive({
      message: "El telefono debe ser numeros mayor a 0",
    }),
    distrito: z.string({
      required_error: "El ditrito es obligatorio",
    }),
});
