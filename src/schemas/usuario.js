import z from 'zod'

const usuarioSchema = z.object({
  fk_id_ubicacion: z.number(),
  nombre: z.string(),
  email: z.string(),
  contrasena: z.string(),
  rol: z.string()
})

export function validateUsuario (object) {
  return usuarioSchema.safeParse(object)
}
export function validatePartialUsuario (object) {
  return usuarioSchema.partial().safeParse(object)
}
