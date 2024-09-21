export class Idioma {
    static async getIdiomas(req, res) {
        const { rows } = await pool.query("SELECT * FROM Idiomas");
        return res.json(rows);
    }

    static async getIdioma(req, res) {
        const { id } = req.params;
        const { rows } = await pool.query(
            "SELECT * FROM Idiomas WHERE id_idioma =$1",
            [id]
        );
        if (rows.length == 0) {
            return res.status(404).json({ message: "User no encontrado" });
        }
        return res.json(rows[0]);
    }

    static async postIdioma(req, res) {
        const data = req.body;
        const { rows } = await pool.query(
            "INSERT INTO Idiomas (id_idioma, fk_id_candidato, nombre, nivel) VALUES($1, $2, $3, $4) RETURNING *",
            [data.id_idioma, data.fk_id_candidato, data.nombre, data.nivel]
        );
        return res.json(rows[0]);
    }

    static async deleteIdioma(req, res) {
        const { id } = req.params;
        const { rowCount } = await pool.query(
            "DELETE FROM Idiomas WHERE id_idioma = $1 RETURNING *",
            [id]
        );
        if (rowCount === 0) {
            return res.status(404).json({ message: "User no encontrado" });
        }
        return res.sendStatus(204);
    }

    static async putIdioma(req, res) {
        const { id } = req.params;
        const data = req.body;
        const { rows } = await pool.query(
            `UPDATE Idiomas SET 
            id_idioma = $1, 
            fk_id_candidato = $2, 
            nombre = $3, 
            nivel = $4
            WHERE id_idioma = $5 RETURNING *`,
            [data.id_idioma, data.fk_id_candidato, data.nombre, data.nivel, id]
        );
        return res.json(rows[0]);
    }
}