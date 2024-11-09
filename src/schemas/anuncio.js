import z from 'zod'

const anuncioScrema = z.object({
  fk_id_empresa: z.number(),
  fk_id_ubicacion: z.number(),
  fk_id_area: z.number(),
  fk_id_categoria_estudio: z.number(),
  titulo: z.string(),
  descripcion: z.string(),
  funciones: z.string(),
  requisitos: z.string(),
  habilidades: z.string(),
  requerimientos: z.string(),
  beneficios: z.string(),
  direccion: z.string(),
  fecha_entrevista: z.string().date(),
  tipo_contrato: z.string(),
  modalidad: z.string(),
  jornada_laboral: z.string(),
  horario_trabajo: z.string(),
  cantidad_vacantes: z.number().int(),
  salario_minimo: z.number(),
  edad_minima: z.number().int(),
  edad_maxima: z.number().int(),
  experiencia_anios: z.number().int().default(0),
  estudio: z.string(),
  discapacitados: z.boolean().default(false)
})

export function validateAnuncio (object) {
  return anuncioScrema.safeParse(object)
}
export function validatePartialAnuncio (object) {
  return anuncioScrema.partial().safeParse(object)
}
