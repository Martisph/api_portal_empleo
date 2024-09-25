import z from 'zod'

const departamentoSchema = z.object({
    fk_id_pais: z.number().int(),
    nombre: z.string(),
})
    
export function validateDepartamento(object){
    return departamentoSchema.safeParse(object)
}

export function validatePartialDepartamento(object){
    return departamentoSchema.partial().safeParse(object)
}