import { pool } from "../database/db.js";

/* Seleccionar Areas */
export const getAreas = async (req, res) => {
    const { rows } = await pool.query("SELECT * FROM Area");
    return res.json(rows);
};
/* Seleccionar un Area */
export const getArea = async (req, res) => {
    const { id } = req.params;
    const { rows } = await pool.query("SELECT * FROM Area WHERE idArea =$1", [
        id,
    ]);
    if (rows.length == 0) {
        return res.status(404).json({ message: "User no encontrado" });
    }
    return res.json(rows[0]);
};
/* Insertar Area */
export const postArea = async (req, res) => {
    const data = req.body;
    const { rows } = await pool.query(
        "INSERT INTO Area(nombre) VALUES($1) RETURNING *",
        [data.nombre]
    );
    return res.json(rows[0]);
};
/* Eliminar un Area */
export const deleteArea = async (req, res) => {
    const { id } = req.params;
    const { rowCount } = await pool.query(
        "DELETE FROM Area WHERE idArea = $1 RETURNING *",
        [id]
    );
    if (rowCount === 0) {
        return res.status(404).json({ message: "User no encontrado" });
    }
    return res.sendStatus(204);
};
/* Editar un Area */
export const putArea = async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    const { rows } = await pool.query(
        "UPDATE Area SET nombre = $1 WHERE idArea = $2 RETURNING *",
        [data.nombre, id]
    );
    return res.json(rows[0]);
};
