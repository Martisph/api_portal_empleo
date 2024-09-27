import z from 'zod'

const ubicacionSchema = z.object({
  fk_id_departamento: z.number(),
  nombre: z.string()
})

export function validateUbicacion (object) {
  return ubicacionSchema.safeParse(object)
}

export function validatePartialUbicacion (object) {
  return ubicacionSchema.partial().safeParse(object)
}
