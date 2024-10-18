import z from 'zod'

const credencialesSchema = z.object({
  email: z.string().email(),
  contrasena: z.string()
})

export function validateCredenciales (object) {
  return credencialesSchema.safeParse(object)
}
