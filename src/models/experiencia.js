export class Experiencia {
    static async getExperiencia(req, res) {
        const { rows } = await pool.query("SELECT * FROM Experiencias");
        return res.json(rows);
    }

    static async getExperiencia(req, res) {
        const { id } = req.params;
        const { rows } = await pool.query(
            "SELECT * FROM Experiencias WHERE id_experiencia =$1",
            [id]
        );
        if (rows.length == 0) {
            return res.status(404).json({ message: "User no encontrado" });
        }
        return res.json(rows[0]);
    }

    static async postExperiencia(req, res) {
        const data = req.body;
        const { rows } = await pool.query(
            `INSERT INTO Experiencias
            (id_experiencia, fk_id_candidato, titulo, descripcion, fecha_inicio, fecha_fin, estado)
            VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
            [
                data.id_experiencia,
                data.fk_id_candidato,
                data.titulo,
                data.descripcion,
                data.fecha_inicio,
                data.fecha_fin,
                data.estado,
            ]
        );
        return res.json(rows[0]);
    }

    static async deleteExperiencia(req, res) {
        const { id } = req.params;
        const { rowCount } = await pool.query(
            "DELETE FROM Experiencias WHERE id_experiencia = $1 RETURNING *",
            [id]
        );
        if (rowCount === 0) {
            return res.status(404).json({ message: "User no encontrado" });
        }
        return res.sendStatus(204);
    }

    static async putExperiencia(req, res) {
        const { id } = req.params;
        const data = req.body;
        const { rows } = await pool.query(
            `UPDATE Experiencias SET 
            id_experiencia = $1,
            fk_id_candidato = $2,
            titulo = $3,
            descripcion = $4,
            fecha_inicio = $5,
            fecha_fin = $6,
            estado = $7
            WHERE id_experiencia = $8 RETURNING *`,
            [
                data.id_experiencia,
                data.fk_id_candidato,
                data.titulo,
                data.descripcion,
                data.fecha_inicio,
                data.fecha_fin,
                data.estado,
                id,
            ]
        );
        return res.json(rows[0]);
    }
}