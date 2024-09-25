import z from 'zod'

const anuncioScrema = z.object({
    fk_id_empresa: z.string(),
    fk_id_ubicacion: z.string(),
    fk_id_area: z.number().int(),
    fk_id_categoria_estudio: z.number().int(),
    titulo: z.string(),
    descripcion: z.string(),
    funciones: z.string(),
    requisitos: z.string(),
    habilidades: z.string(),
    requerimientos: z.string(),
    beneficios: z.string(),
    direccion: z.string(),
    fecha_entrevista: z.date(),
    fecha_publicacion: z.datetimeRegex(),
    tipo_contrato: z.string(),
    modalidad: z.string(),
    jornada_laboral: z.string(),
    horario_trabajo: z.number(),
    cantidad_vacantes: z.number().int(),
    salario_minimo: z.number(),
    edad_minima: z.number().int,
    edad_maxima: z.number().int,
    experiencia_años: z.number().int().default(0),
    estudio: z.string(),
    discapacitados: z.boolean(),
})

export function validateAnuncio(object){
    return anuncioScrema.safeParse(object)
}
export function validatePartialAnuncio(object){
    return anuncioScrema.partial().safeParse(object)
}