import { pool } from "../database/db.js";
export class Pais {

    static async getPaises(req, res){
        const { rows } = await pool.query("SELECT id_pais, nombre FROM Paises");
        return res.json(rows);
    }

    static async getPais(req, res){
        const { id } = req.params;
        const { rows } = await pool.query(
            "SELECT id_pais, nombre FROM Paises WHERE id_pais =$1",
            [id]
        );
        if (rows.length == 0) {
            return res.status(404).json({ message: "User no encontrado" });
        }
        return res.json(rows[0]);
    }

    static async postPais(req, res){
        try {
            const data = req.body;
            const { rows } = await pool.query(
                "INSERT INTO Paises (nombre) VALUES($1) RETURNING *",
                [data.nombre]
            );
            return res.json(rows[0]);
        } catch (e) {
            return res.status(500).json({ message: "error de registro de datos" });
        }
    }

    static async deletePais(req, res){
        const { id } = req.params;
        const { rowCount } = await pool.query(
            "DELETE FROM Paises WHERE id_pais = $1 RETURNING *",
            [id]
        );
        if (rowCount === 0) {
            return res.status(404).json({ message: "User no encontrado" });
        }
        return res.sendStatus(204);
    }

    static async putPais(req, res){
        const { id } = req.params;
        const data = req.body;
        const { rows } = await pool.query(
            "UPDATE Paises SET nombre = $1 WHERE id_pais = $2 RETURNING *",
            [data.nombre, id]
        );
        return res.json(rows[0]);
    }
}