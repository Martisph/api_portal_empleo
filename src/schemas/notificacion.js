import z from 'zod'

const notificacionSchema = z.object({
  fk_id_empresa: z.number(),
  fk_id_candidato: z.number(),
  titulo: z.string(),
  descripcion: z.string()
})

export function validateNotificacion (object) {
  return notificacionSchema.safeParse(object)
}

export function validatePartialNotificacion (object) {
  return notificacionSchema.partial().safeParse(object)
}
