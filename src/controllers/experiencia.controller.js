import { pool } from "../database/db.js";

/* Seleccionar Experiencias */
export const getExperiencias = async (req, res) => {
    const { rows } = await pool.query("SELECT * FROM Experiencia");
    return res.json(rows);
};
/* Seleccionar un Experiencia */
export const getExperiencia = async (req, res) => {
    const { id } = req.params;
    const { rows } = await pool.query("SELECT * FROM Experiencia WHERE idExperiencia =$1", [
        id,
    ]);
    if (rows.length == 0) {
        return res.status(404).json({ message: "User no encontrado" });
    }
    return res.json(rows[0]);
};
/* Insertar Experiencia */
export const postExperiencia = async (req, res) => {
    const data = req.body;
    const { rows } = await pool.query(
        "INSERT INTO Experiencia(nombre) VALUES($1) RETURNING *",
        [data.nombre]
    );
    return res.json(rows[0]);
};
/* Eliminar un Experiencia */
export const deleteExperiencia = async (req, res) => {
    const { id } = req.params;
    const { rowCount } = await pool.query(
        "DELETE FROM Experiencia WHERE idExperiencia = $1 RETURNING *",
        [id]
    );
    if (rowCount === 0) {
        return res.status(404).json({ message: "User no encontrado" });
    }
    return res.sendStatus(204);
};
/* Editar un Experiencia */
export const putExperiencia = async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    const { rows } = await pool.query(
        "UPDATE Experiencia SET nombre = $1 WHERE idExperiencia = $2 RETURNING *",
        [data.nombre, id]
    );
    return res.json(rows[0]);
};
