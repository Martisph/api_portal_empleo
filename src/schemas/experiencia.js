import z from 'zod';

const experienciaSchema = z.object({
    fk_id_candidato: z.number(),
    titulo: z.string(),
    descripcion: z.string(),
    fecha_inicio: z.date(),
    fecha_fin: z.date(),
    estado: z.string(),
})

export function validateExperiencia(object){
    return experienciaSchema.safeParse(object)
}

export function validatePartialExperiencia(object){
    return experienciaSchema.partial().safeParse(object)
}