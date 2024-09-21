import { pool } from "../database/db.js";

/* Seleccionar Postulantes */
export const getPostulantes = async (req, res) => {
    const { rows } = await pool.query("SELECT * FROM Postulante");
    return res.json(rows);
};
/* Seleccionar un Postulante */
export const getPostulante = async (req, res) => {
    const { id } = req.params;
    const { rows } = await pool.query("SELECT * FROM Postulante WHERE idPostulante =$1", [
        id,
    ]);
    if (rows.length == 0) {
        return res.status(404).json({ message: "User no encontrado" });
    }
    return res.json(rows[0]);
};
/* Insertar Postulante */
export const postPostulante = async (req, res) => {
    const data = req.body;
    const { rows } = await pool.query(
        "INSERT INTO Postulante(nombre) VALUES($1) RETURNING *",
        [data.nombre]
    );
    return res.json(rows[0]);
};
/* Eliminar un Postulante */
export const deletePostulante = async (req, res) => {
    const { id } = req.params;
    const { rowCount } = await pool.query(
        "DELETE FROM Postulante WHERE idPostulante = $1 RETURNING *",
        [id]
    );
    if (rowCount === 0) {
        return res.status(404).json({ message: "User no encontrado" });
    }
    return res.sendStatus(204);
};
/* Editar un Postulante */
export const putPostulante = async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    const { rows } = await pool.query(
        "UPDATE Postulante SET nombre = $1 WHERE idPostulante = $2 RETURNING *",
        [data.nombre, id]
    );
    return res.json(rows[0]);
};
