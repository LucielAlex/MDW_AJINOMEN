import { z } from "zod";

export const clienteSchema = z.object({
    nombre: z.string({
    required_error: "El nombre del cliente es obligatorio",
  }),
  codigo: z.string({
    required_error: "El codigo del cliente es obligatorio",
  }),
  direccion: z.string({
    required_error: "La direccion del cliente es obligatoria",
  }),
    apellido: z.string({
      required_error: "El apellido del cliente es obligatorio",
    }),
});
