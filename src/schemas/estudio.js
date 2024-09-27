import z from 'zod'

const estudioSchema = z.object({
  fk_id_categoria_estudio: z.number(),
  fk_id_candidato: z.number(),
  titulo: z.string(),
  descripcion: z.string(),
  estado: z.string()
})

export function validateEstudio (object) {
  return estudioSchema.safeParse(object)
}

export function validatePartialEstudio (object) {
  return estudioSchema.partial().safeParse(object)
}
