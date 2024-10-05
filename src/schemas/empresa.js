import z from 'zod'

const empresaSchema = z.object({
  fk_id_usuario: z.string(),
  nombre: z.string(),
  razon_social: z.string(),
  descripcion: z.string(),
  ruc: z.number(),
  vision: z.string(),
  mision: z.string(),
  valores: z.string(),
  sector: z.string(),
  direccion: z.string(),
  telefono: z.number(),
  email: z.string().email()
})

export function validateEmpresa (object) {
  return empresaSchema.safeParse(object)
}

export function validatePartialEmpresa (object) {
  return empresaSchema.partial().safeParse(object)
}
