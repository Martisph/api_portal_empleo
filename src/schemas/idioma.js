import z from 'zod'

const idiomaSchema = z.object({
    fk_id_candidato: z.number(),
    nombre: z.string(),
    nivel: z.string(),
})

export function validateIdioma(object){
    return idiomaSchema.safeParse(object)
}

export function validatePartialIdioma(object){
    return idiomaSchema.partial().safeParse(object)
}