import z from 'zod'

const postulacionSchema = z.object({
  fk_id_candidato: z.number(),
  fk_id_empresa: z.number(),
  fk_id_anuncio: z.number(),
  estado: z.enum([
    'pendiente',
    'preseleccionado',
    'aceptado',
    'rechazado'
  ]).default('pendiente')
})

export function validatePostulacion (object) {
  return postulacionSchema.safeParse(object)
}

export function validatePartialPostulacion (object) {
  return postulacionSchema.partial().safeParse(object)
}
