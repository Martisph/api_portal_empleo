export class CategoriaEstudio{
    
    static async getCategoriaEstudios(req, res) {
        const { rows } = await pool.query("SELECT * FROM Categoria_Estudios");
        return res.json(rows);
    }

    static async getCategoriaEstudio(req, res) {
        const { id } = req.params;
        const { rows } = await pool.query(
            "SELECT * FROM Categoria_Estudios WHERE id_categoria_estudio =$1",
            [id]
        );
        if (rows.length == 0) {
            return res.status(404).json({ message: "User no encontrado" });
        }
        return res.json(rows[0]);
    }

    static async postCategoriaEstudiogetCategoriaEstudio(req, res) {
        const data = req.body;
        const { rows } = await pool.query(
            `INSERT INTO Categoria_Estudios (id_categoria_estudio, nombre, descripcion) VALUES($1, $2, $3) RETURNING *`,
            [data.id_categoria_estudio, data.nombre, data.descripcion]
        );
        return res.json(rows[0]);
    }

    static async deleteCategoriaEstudiogetCategoriaEstudio(req, res) {
        const { id } = req.params;
        const { rowCount } = await pool.query(
            "DELETE FROM Categoria_Estudios WHERE id_categoria_estudio = $1 RETURNING *",
            [id]
        );
        if (rowCount === 0) {
            return res.status(404).json({ message: "User no encontrado" });
        }
        return res.sendStatus(204);
    }

    static async putCategoriaEstudiogetCategoriaEstudio(req, res) {
        const { id } = req.params;
        const data = req.body;
        const { rows } = await pool.query(
            `UPDATE Categoria_Estudios SET
            id_categoria_estudio = $1,
            nombre = $2,
            descripcion = $3
            WHERE id_categoria_estudio = $4 RETURNING *`,
            [data.id_categoria_estudio, data.nombre, data.descripcion, id]
        );
        return res.json(rows[0]);
    }
}