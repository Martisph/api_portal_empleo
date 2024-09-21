import { pool } from "../database/db.js";

/* Seleccionar Comentarios */
export const getComentarios = async (req, res) => {
    const { rows } = await pool.query("SELECT * FROM Comentario");
    return res.json(rows);
};
/* Seleccionar un Comentario */
export const getComentario = async (req, res) => {
    const { id } = req.params;
    const { rows } = await pool.query("SELECT * FROM Comentario WHERE idComentario =$1", [
        id,
    ]);
    if (rows.length == 0) {
        return res.status(404).json({ message: "User no encontrado" });
    }
    return res.json(rows[0]);
};
/* Insertar Comentario */
export const postComentario = async (req, res) => {
    const data = req.body;
    const { rows } = await pool.query(
        "INSERT INTO Comentario(nombre) VALUES($1) RETURNING *",
        [data.nombre]
    );
    return res.json(rows[0]);
};
/* Eliminar un Comentario */
export const deleteComentario = async (req, res) => {
    const { id } = req.params;
    const { rowCount } = await pool.query(
        "DELETE FROM Comentario WHERE idComentario = $1 RETURNING *",
        [id]
    );
    if (rowCount === 0) {
        return res.status(404).json({ message: "User no encontrado" });
    }
    return res.sendStatus(204);
};
/* Editar un Comentario */
export const putComentario = async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    const { rows } = await pool.query(
        "UPDATE Comentario SET nombre = $1 WHERE idComentario = $2 RETURNING *",
        [data.nombre, id]
    );
    return res.json(rows[0]);
};
