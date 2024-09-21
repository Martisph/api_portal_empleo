export class Ubicacion {

    static async getUbicaciones(req, res) {
        const { rows } = await pool.query("SELECT * FROM Ubicaciones");
        return res.json(rows);
    }

    static async getUbicacion(req, res) {
        const { id } = req.params;
        const { rows } = await pool.query(
            "SELECT * FROM Ubicaciones WHERE id_ubicacion =$1",
            [id]
        );
        if (rows.length == 0) {
            return res.status(404).json({ message: "User no encontrado" });
        }
        return res.json(rows[0]);
    }

    static async postUbicacion(req, res) {
        const data = req.body;
        const { rows } = await pool.query(
            "INSERT INTO Ubicaciones (id_ubicacion, fk_id_departamento, nombre) VALUES($1, $2, $3) RETURNING *",
            [data.id_ubicacion, data.fk_id_departamento, data.nombre]
        );
        return res.json(rows[0]);
    }

    static async deleteUbicacion(req, res) {
        const { id } = req.params;
        const { rowCount } = await pool.query(
            "DELETE FROM Ubicaciones WHERE id_ubicacion = $1 RETURNING *",
            [id]
        );
        if (rowCount === 0) {
            return res.status(404).json({ message: "User no encontrado" });
        }
        return res.sendStatus(204);
    }

    static async putUbicacion(req, res) {
        const { id } = req.params;
        const data = req.body;
        const { rows } = await pool.query(
            "UPDATE Ubicaciones SET id_ubicacion = $1, fk_id_departamento = $2, nombre = $3 WHERE id_ubicacion = $4 RETURNING *",
            [data.id_ubicacion, data.fk_id_departamento, data.nombre, id]
        );
        return res.json(rows[0]);
    }
}