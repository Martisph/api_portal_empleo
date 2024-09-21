export class Anuncio {
    static async getAnuncios(req, res) {
        const { rows } = await pool.query("SELECT * FROM Anuncios");
        return res.json(rows);
    }

    static async getAnuncio(req, res) {
        const { id } = req.params;
        const { rows } = await pool.query(
            "SELECT * FROM Anuncios WHERE id_anuncio =$1",
            [id]
        );
        if (rows.length == 0) {
            return res.status(404).json({ message: "User no encontrado" });
        }
        return res.json(rows[0]);
    }

    static async postAnuncio(req, res) {
        const data = req.body;
        const { rows } = await pool.query(
            `INSERT INTO Anuncios(
            id_anuncio,
            fk_id_empresa,
            fk_id_ubicacion,
            fk_id_area,
            fk_id_categoria_estudio,
            titulo,
            descripcion,
            funciones,
            requisitos,
            habilidades,
            requerimientos,
            beneficios,
            direccion,
            fecha_entrevista,
            fecha_publicacion,
            tipo_contrato,
            modalidad,
            jornada_laboral,
            horario_trabajo,
            cantidad_vacantes,
            salario_minimo,
            edad_minima,
            edad_maxima,
            experiencia_años,
            estudio,
            discapacitados,
                ) VALUES(
                $1, $2, $3, $4, $5,
                $6, $7, $8, $9, $10,
                $11, $12, $13, $14, $15,
                $16, $17, $18, $19, $20,
                $21, $22, $23, $24, $25,
                $26
                ) RETURNING *`,
            [
                data.id_anuncio,
                data.fk_id_empresa,
                data.fk_id_ubicacion,
                data.fk_id_area,
                data.fk_id_categoria_estudio,
                data.titulo,
                data.descripcion,
                data.funciones,
                data.requisitos,
                data.habilidades,
                data.requerimientos,
                data.beneficios,
                data.direccion,
                data.fecha_entrevista,
                data.fecha_publicacion,
                data.tipo_contrato,
                data.modalidad,
                data.jornada_laboral,
                data.horario_trabajo,
                data.cantidad_vacantes,
                data.salario_minimo,
                data.salario,
                data.edad_minima,
                data.edad_maxima,
                data.experiencia_años,
                data.estudio,
                data.discapacitados,
                id,
            ]
        );
        return res.json(rows[0]);
    }

    static async deleteAnuncio(req, res) {
        const { id } = req.params;
        const { rowCount } = await pool.query(
            "DELETE FROM Anuncios WHERE id_anuncio = $1 RETURNING *",
            [id]
        );
        if (rowCount === 0) {
            return res.status(404).json({ message: "User no encontrado" });
        }
        return res.sendStatus(204);
    }

    static async putAnuncio(req, res) {
        const { id } = req.params;
        const data = req.body;
        const { rows } = await pool.query(
            `UPDATE Anuncios SET 
            id_anuncio = $1,
            fk_id_empresa = $2,
            fk_id_ubicacion = $3,
            fk_id_area = $4,
            fk_id_categoria_estudio = $5,
            titulo = $6,
            descripcion = $7,
            funciones = $8,
            requisitos = $9,
            habilidades = $10,
            requerimientos = $11,
            beneficios = $12,
            direccion = $13,
            fecha_entrevista = $14,
            fecha_publicacion = $15,
            tipo_contrato = $16,
            modalidad = $17,
            jornada_laboral = $18,
            horario_trabajo = $19,
            cantidad_vacantes = $20,
            salario_minimo = $21,
            edad_minima = $22,
            edad_maxima = $23,
            experiencia_años = $24,
            estudio = $25,
            discapacitados = $26,
            WHERE id_anuncio = $27 RETURNING *`,
            [
                data.id_anuncio,
                data.fk_id_empresa,
                data.fk_id_ubicacion,
                data.fk_id_area,
                data.fk_id_categoria_estudio,
                data.titulo,
                data.descripcion,
                data.funciones,
                data.requisitos,
                data.habilidades,
                data.requerimientos,
                data.beneficios,
                data.direccion,
                data.fecha_entrevista,
                data.fecha_publicacion,
                data.tipo_contrato,
                data.modalidad,
                data.jornada_laboral,
                data.horario_trabajo,
                data.cantidad_vacantes,
                data.salario_minimo,
                data.edad_minima,
                data.edad_maxima,
                data.experiencia_años,
                data.estudio,
                data.discapacitados,
                id,
            ]
        );
        return res.json(rows[0]);
    }
}