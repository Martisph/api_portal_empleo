export class Notificacion {
    static async getNotificacion(req, res) {
        const { rows } = await pool.query("SELECT * FROM Notificaciones");
        return res.json(rows);
    }

    static async getNotificacion(req, res) {
        const { id } = req.params;
        const { rows } = await pool.query(
            "SELECT * FROM Notificaciones WHERE id_notificacion =$1",
            [id]
        );
        if (rows.length == 0) {
            return res.status(404).json({ message: "User no encontrado" });
        }
        return res.json(rows[0]);
    }

    static async postNotificacion(req, res) {
        const data = req.body;
        const { rows } = await pool.query(
            `INSERT INTO Notificaciones
            (id_notificacion, fk_id_empresa, fk_id_candidato, titulo, descripcion, estado_publicacion, fecha_hora)
            VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
            [
                data.id_notificacion,
                data.fk_id_empresa,
                data.fk_id_candidato,
                data.titulo,
                data.descripcion,
                data.estado_publicacion,
                data.fecha_hora,
            ]
        );
        return res.json(rows[0]);
    }

    static async deleteNotificacion(req, res) {
        const { id } = req.params;
        const { rowCount } = await pool.query(
            "DELETE FROM Notificaciones WHERE id_notificacion = $1 RETURNING *",
            [id]
        );
        if (rowCount === 0) {
            return res.status(404).json({ message: "User no encontrado" });
        }
        return res.sendStatus(204);
    }

    static async putNotificacion(req, res) {
        const { id } = req.params;
        const data = req.body;
        const { rows } = await pool.query(
            `UPDATE Notificaciones SET
            id_notificacion = $1,
            fk_id_empresa = $2,
            fk_id_candidato = $3,
            titulo = $4,
            descripcion = $5,
            estado_publicacion = $6,
            fecha_hora = $7,
            WHERE id_notificacion = $7 RETURNING *`,
            [
                data.id_notificacion,
                data.fk_id_empresa,
                data.fk_id_candidato,
                data.titulo,
                data.descripcion,
                data.estado_publicacion,
                data.fecha_hora,
                id,
            ]
        );
        return res.json(rows[0]);
    }
}