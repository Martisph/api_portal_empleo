import z from 'zod'

const areaSchema = z.object({
  nombre: z.string(),
  descripcion: z.string()
})

export function validateArea (object) {
  return areaSchema.safeParse(object)
}

export function validatePartialArea (object) {
  return areaSchema.partial().safeParse(object)
}
