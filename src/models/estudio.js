export class Estudio {
    static async getEstudio(req, res) {
        const { rows } = await pool.query("SELECT * FROM Estudios");
        return res.json(rows);
    }

    static async getEstudio(req, res) {
        const { id } = req.params;
        const { rows } = await pool.query(
            "SELECT * FROM Estudios WHERE id_estudio =$1",
            [id]
        );
        if (rows.length == 0) {
            return res.status(404).json({ message: "User no encontrado" });
        }
        return res.json(rows[0]);
    }

    static async postEstudio(req, res) {
        const data = req.body;
        const { rows } = await pool.query(
            `INSERT INTO Estudios
            (id_estudio, fk_id_categoria_estudio, fk_id_candidato, titulo, descripcion, estado)
            VALUES($1, $2, $3, $4, $5, $6) RETURNING *`,
            [
                data.id_estudio,
                data.fk_id_categoria_estudio,
                data.fk_id_candidato,
                data.titulo,
                data.descripcion,
                data.estado,
            ]
        );
        return res.json(rows[0]);
    }

    static async deleteEstudio(req, res) {
        const { id } = req.params;
        const { rowCount } = await pool.query(
            "DELETE FROM Estudios WHERE id_estudio = $1 RETURNING *",
            [id]
        );
        if (rowCount === 0) {
            return res.status(404).json({ message: "User no encontrado" });
        }
        return res.sendStatus(204);
    }

    static async putEstudio(req, res) {
        const { id } = req.params;
        const data = req.body;
        const { rows } = await pool.query(
            `UPDATE Estudios SET 
            id_estudio = $1, 
            fk_id_categoria_estudio = $2, 
            fk_id_candidato = $3, 
            titulo = $4, 
            descripcion = $5, 
            estado = $6
            WHERE id_estudio = $7 RETURNING *`,
            [
                data.id_estudio,
                data.fk_id_categoria_estudio,
                data.fk_id_candidato,
                data.titulo,
                data.descripcion,
                data.estado,
                id,
            ]
        );
        return res.json(rows[0]);
    }
}