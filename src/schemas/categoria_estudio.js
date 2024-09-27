import z from 'zod'

const categoriaEstudioSchema = z.object({
  nombre: z.string(),
  descripcion: z.string()
})

export function validateCategoriaEstudio (object) {
  return categoriaEstudioSchema.safeParse(object)
}
export function validatePartialCategoriaEstudio (object) {
  return categoriaEstudioSchema.partial().safeParse(object)
}
