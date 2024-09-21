export class Area {
    static async getAreas(req, res) {
        const { rows } = await pool.query("SELECT * FROM Areas");
        return res.json(rows);
    }

    static async getArea(req, res) {
        const { id } = req.params;
        const { rows } = await pool.query(
            "SELECT * FROM Areas WHERE id_Area =$1",
            [id]
        );
        if (rows.length == 0) {
            return res.status(404).json({ message: "User no encontrado" });
        }
        return res.json(rows[0]);
    }

    static async postArea(req, res) {
        const data = req.body;
        const { rows } = await pool.query(
            "INSERT INTO Areas (id_Area, nombre, descripcion) VALUES($1, $2, $3) RETURNING *",
            [data.id_Area, data.nombre, data.descripcion]
        );
        return res.json(rows[0]);
    }

    static async deleteArea(req, res) {
        const { id } = req.params;
        const { rowCount } = await pool.query(
            "DELETE FROM Areas WHERE id_Area = $1 RETURNING *",
            [id]
        );
        if (rowCount === 0) {
            return res.status(404).json({ message: "User no encontrado" });
        }
        return res.sendStatus(204);
    }

    static async putArea(req, res) {
        const { id } = req.params;
        const data = req.body;
        const { rows } = await pool.query(
            "UPDATE Areas SET id_Area = $1, nombre = $2, descripcion = $3 WHERE id_Area = $4 RETURNING *",
            [data.id_Area, data.nombre, data.descripcion, id]
        );
        return res.json(rows[0]);
    }
}