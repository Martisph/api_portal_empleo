import z from 'zod'

const candidatoSchema = z.object({
  fk_id_usuario: z.number(),
  fk_id_area: z.number(),
  apellido: z.string(),
  genero: z.string(),
  estado_civil: z.string(),
  fecha_nacimiento: z.string().date(),
  direccion: z.string(),
  telefono: z.number(),
  linkedin: z.string().url()
})

export function validateCandidato (object) {
  return candidatoSchema.safeParse(object)
}

export function validatePartialCandidato (object) {
  return candidatoSchema.partial().safeParse(object)
}
