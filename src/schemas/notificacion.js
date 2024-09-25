import z from 'zod'

const notificacionSchema = z.object({
    fk_id_empresa: z.number(),
    fk_id_candidato: z.number(),
    titulo: z.string(),
    descripcion: z.string(),
    estado_publicacion: z.string(),
    fecha_hora: z.datetimeRegex(),
});