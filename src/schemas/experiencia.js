import z from 'zod'

const experienciaSchema = z.object({
  fk_id_candidato: z.number(),
  titulo: z.string(),
  descripcion: z.string(),
  fecha_inicio: z.string().date(),
  fecha_fin: z.string().date().optional(),
  estado: z.enum(['cursando', 'finalizado']).default('cursando')
})

export function validateExperiencia (object) {
  return experienciaSchema.safeParse(object)
}

export function validatePartialExperiencia (object) {
  return experienciaSchema.partial().safeParse(object)
}
