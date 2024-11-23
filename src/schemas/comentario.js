import z from 'zod'

const comentarioSchema = z.object({
  fk_id_candidato: z.number(),
  fk_id_empresa: z.number(),
  descripcion: z.string(),
  puntaje: z.number(),
  estado: z.enum(['no leido', 'leido']).default('no leido')
})

export function validateComentario (object) {
  return comentarioSchema.safeParse(object)
}
export function validatePartialComentario (object) {
  return comentarioSchema.partial().safeParse(object)
}
