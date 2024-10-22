import z from 'zod'

const usuarioSchema = z.object({
  fk_id_ubicacion: z.number(),
  nombre: z.string(),
  email: z.string().email(),
  contrasena: z.string(),
  rol: z.string().default('candidato').transform(data => {
    data = (data === 'empresa' || data === 'candidato') ? data : 'candidato'
    return data
  })
})

const usuarioEmailSchema = z.object({
  email: z.string().email()
})

export function validateEmailUsuario (object) {
  return usuarioEmailSchema.safeParse(object)
}
export function validateUsuario (object) {
  return usuarioSchema.safeParse(object)
}
export function validatePartialUsuario (object) {
  return usuarioSchema.partial().safeParse(object)
}
