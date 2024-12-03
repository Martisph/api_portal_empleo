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
  habilidades: z.string().optional(),
  requerimientos: z.string().optional(),
  beneficios: z.string(),
  direccion: z.string().optional(),
  fecha_entrevista: z.string().date().optional(),
  tipo_contrato: z.string(),
  modalidad: z.string(),
  jornada_laboral: z.string(),
  horario_trabajo: z.string(),
  cantidad_vacantes: z.number().int().optional(),
  salario_minimo: z.number().optional(),
  edad_minima: z.number().int().optional(),
  edad_maxima: z.number().int().optional(),
  experiencia_anios: z.number().int().default(0),
  estudio: z
    .enum(['basico', 'secundaria', 'tecnico', 'universitario', 'postgrado'])
    .default('basico').optional(),
  discapacitados: z.boolean().default(false),
  estado: z.boolean().optional()
})

export function validateAnuncio (object) {
  return anuncioScrema.safeParse(object)
}
export function validatePartialAnuncio (object) {
  return anuncioScrema.partial().safeParse(object)
}
