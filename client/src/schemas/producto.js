import { z } from "zod";

export const productoSchema = z.object({
  nombre: z.string({
    required_error: "El nombre del producto es obligatorio",
  }),
  codigo: z.string({
    required_error: "El codigo del producto es obligatorio",
  }),
  precio: z
    .number({
      required_error: "El precio del producto es obligatorio",
    })
    .positive({
      message: "El precio debe ser un número mayor a 0",
    }),
  stock: z
    .number({
      required_error: "El stock del producto es obligatorio",
    })
    .int({
      message: "El stock debe ser un número entero",
    })
    .positive({
      message: "El stock debe ser un número mayor a 0",
    }),
});
