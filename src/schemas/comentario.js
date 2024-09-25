import z from 'zod'

const comentarioSchema = z.object({
    fk_id_candidato: z.string(), 
    fk_id_empresa: z.string(), 
    descripcion: z.string(), 
    puntaje: z.number(), 
    estado: z.string(),
})

export function validateComentario(object){
    return comentarioSchema.safeParse(object)
}
export function validatePartialComentario(object){
    return comentarioSchema.partial().safeParse(object)
}