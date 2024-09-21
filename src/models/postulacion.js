export class Postulacion {
    static async getPostulaciones(req, res) {
        const { rows } = await pool.query("SELECT * FROM Postulaciones");
        return res.json(rows);
    }

    static async getPostulacion(req, res) {
        const { id } = req.params;
        const { rows } = await pool.query(
            "SELECT * FROM Postulaciones WHERE id_postulacion =$1",
            [id]
        );
        if (rows.length == 0) {
            return res.status(404).json({ message: "User no encontrado" });
        }
        return res.json(rows[0]);
    }

    static async postPostulacion(req, res) {
        const data = req.body;
        const { rows } = await pool.query(
            `INSERT INTO Postulaciones
            (id_postulacion, fk_id_candidato, fk_id_empresa, fk_id_anuncio, estado, fecha_hora)
            VALUES($1, $2, $3, $4, $5, $6) RETURNING *`,
            [
                data.id_postulacion,
                data.fk_id_candidato,
                data.fk_id_empresa,
                data.fk_id_anuncio,
                data.estado,
                data.fecha_hora,
            ]
        );
        return res.json(rows[0]);
    }

    static async deletePostulacion(req, res) {
        const { id } = req.params;
        const { rowCount } = await pool.query(
            "DELETE FROM Postulaciones WHERE id_postulacion = $1 RETURNING *",
            [id]
        );
        if (rowCount === 0) {
            return res.status(404).json({ message: "User no encontrado" });
        }
        return res.sendStatus(204);
    }

    static async putPostulacion(req, res) {
        const { id } = req.params;
        const data = req.body;
        const { rows } = await pool.query(
            `UPDATE Postulaciones SET 
            id_postulacion = $1, 
            fk_id_candidato = $2, 
            fk_id_empresa = $3, 
            fk_id_anuncio = $4, 
            estado = $5, 
            fecha_hora = $6
            WHERE id_postulacion = $7 RETURNING *`,
            [
                data.id_postulacion,
                data.fk_id_candidato,
                data.fk_id_empresa,
                data.fk_id_anuncio,
                data.estado,
                data.fecha_hora,
                id,
            ]
        );
        return res.json(rows[0]);
    }
}