import z from 'zod'

const candidatoSchema = z.object({
  fk_id_area: z.number(),
  apellido: z.string(),
  genero: z.enum([
    'masculino',
    'femenino',
    'otro'
  ]),
  estado_civil: z.enum([
    'soltero',
    'casado',
    'divorciado',
    'viudo',
    'separado',
    'comprometido'
  ]),
  fecha_nacimiento: z.string().date(),
  direccion: z.string().optional(),
  telefono: z.number().optional(),
  linkedin: z.string().url().optional()
})

export function validateCandidato (object) {
  return candidatoSchema.safeParse(object)
}

export function validatePartialCandidato (object) {
  return candidatoSchema.partial().safeParse(object)
}
