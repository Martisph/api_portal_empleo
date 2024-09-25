import z from "zod";

const paisSchema = z.object({
    nombre: z.string(),
});

export function validatePais(object){
    return paisSchema.safeParse(object);
}
export function validatePartialPais(object){
    return paisSchema.partial().safeParse(object);
}
