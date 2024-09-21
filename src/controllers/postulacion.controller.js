import { pool } from "../database/db.js";

/* Seleccionar Postulaciones */
export const getPostulaciones = async (req, res) => {
    const { rows } = await pool.query("SELECT * FROM Postulacion");
    return res.json(rows);
};
/* Seleccionar un Postulacion */
export const getPostulacion = async (req, res) => {
    const { id } = req.params;
    const { rows } = await pool.query("SELECT * FROM Postulacion WHERE idPostulacion =$1", [
        id,
    ]);
    if (rows.length == 0) {
        return res.status(404).json({ message: "User no encontrado" });
    }
    return res.json(rows[0]);
};
/* Insertar Postulacion */
export const postPostulacion = async (req, res) => {
    const data = req.body;
    const { rows } = await pool.query(
        "INSERT INTO Postulacion(nombre) VALUES($1) RETURNING *",
        [data.nombre]
    );
    return res.json(rows[0]);
};
/* Eliminar un Postulacion */
export const deletePostulacion = async (req, res) => {
    const { id } = req.params;
    const { rowCount } = await pool.query(
        "DELETE FROM Postulacion WHERE idPostulacion = $1 RETURNING *",
        [id]
    );
    if (rowCount === 0) {
        return res.status(404).json({ message: "User no encontrado" });
    }
    return res.sendStatus(204);
};
/* Editar un Postulacion */
export const putPostulacion = async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    const { rows } = await pool.query(
        "UPDATE Postulacion SET nombre = $1 WHERE idPostulacion = $2 RETURNING *",
        [data.nombre, id]
    );
    return res.json(rows[0]);
};
