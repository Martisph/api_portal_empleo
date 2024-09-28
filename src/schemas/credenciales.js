import z from 'zod'

const credencialesSchema = z.object({
  email: z.string(),
  contrasena: z.string()
})

export function validateCredenciales (object) {
  return credencialesSchema.safeParse(object)
}
