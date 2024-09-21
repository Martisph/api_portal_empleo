export class Comentario {
    static async getComentario(req, res) {
        const { rows } = await pool.query("SELECT * FROM Comentarios");
        return res.json(rows);
    }

    static async getComentario(req, res) {
        const { id } = req.params;
        const { rows } = await pool.query(
            "SELECT * FROM Comentarios WHERE id_comentario =$1",
            [id]
        );
        if (rows.length == 0) {
            return res.status(404).json({ message: "User no encontrado" });
        }
        return res.json(rows[0]);
    }

    static async postComentario(req, res) {
        const data = req.body;
        const { rows } = await pool.query(
            `INSERT INTO Comentarios
            (id_comentario, fk_id_candidato, fk_id_empresa, descripcion, puntaje, estado)
            VALUES($1, $2, $3, $4, $5, $6) RETURNING *`,
            [
                data.id_comentario,
                data.fk_id_candidato,
                data.fk_id_empresa,
                data.descripcion,
                data.puntaje,
                data.estado,
            ]
        );
        return res.json(rows[0]);
    }

    static async deleteComentario(req, res) {
        const { id } = req.params;
        const { rowCount } = await pool.query(
            "DELETE FROM Comentarios WHERE id_comentario = $1 RETURNING *",
            [id]
        );
        if (rowCount === 0) {
            return res.status(404).json({ message: "User no encontrado" });
        }
        return res.sendStatus(204);
    }

    static async putComentario(req, res) {
        const { id } = req.params;
        const data = req.body;
        const { rows } = await pool.query(
            `UPDATE Comentarios SET 
            id_comentario = $1, 
            fk_id_candidato = $2, 
            fk_id_empresa = $3, 
            descripcion = $4, 
            puntaje = $5, 
            estado = $6,
            WHERE id_comentario = $7 RETURNING *`,
            [
                data.id_comentario,
                data.fk_id_candidato,
                data.fk_id_empresa,
                data.descripcion,
                data.puntaje,
                data.estado,
                id,
            ]
        );
        return res.json(rows[0]);
    }
}