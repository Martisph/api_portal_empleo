import z from 'zod'

const empresaSchema = z.object({
  fk_id_usuario: z.string(),
  nombre: z.string(),
  razon_social: z.string(),
  descripcion: z.string().optional(),
  ruc: z.number(),
  vision: z.string().optional(),
  mision: z.string().optional(),
  valores: z.string().optional(),
  sector: z.string(),
  direccion: z.string().optional(),
  telefono: z.number().optional(),
  email: z.string().email().optional()
})

export function validateEmpresa (object) {
  return empresaSchema.safeParse(object)
}

export function validatePartialEmpresa (object) {
  return empresaSchema.partial().safeParse(object)
}
