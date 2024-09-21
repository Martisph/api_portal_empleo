import { pool } from "../database/db.js";

/* Seleccionar CategoriaEstudios */
export const getCategoriaEstudios = async (req, res) => {
    const { rows } = await pool.query("SELECT * FROM CategoriaEstudios");
    return res.json(rows);
};
/* Seleccionar un CategoriaEstudios */
export const getCategoriaEstudio = async (req, res) => {
    const { id } = req.params;
    const { rows } = await pool.query("SELECT * FROM CategoriaEstudios WHERE idCategoriaEstudios =$1", [
        id,
    ]);
    if (rows.length == 0) {
        return res.status(404).json({ message: "User no encontrado" });
    }
    return res.json(rows[0]);
};
/* Insertar CategoriaEstudios */
export const postCategoriaEstudios = async (req, res) => {
    const data = req.body;
    const { rows } = await pool.query(
        "INSERT INTO CategoriaEstudios(nombre) VALUES($1) RETURNING *",
        [data.nombre]
    );
    return res.json(rows[0]);
};
/* Eliminar un CategoriaEstudios */
export const deleteCategoriaEstudios = async (req, res) => {
    const { id } = req.params;
    const { rowCount } = await pool.query(
        "DELETE FROM CategoriaEstudios WHERE idCategoriaEstudios = $1 RETURNING *",
        [id]
    );
    if (rowCount === 0) {
        return res.status(404).json({ message: "User no encontrado" });
    }
    return res.sendStatus(204);
};
/* Editar un CategoriaEstudios */
export const putCategoriaEstudios = async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    const { rows } = await pool.query(
        "UPDATE CategoriaEstudios SET nombre = $1 WHERE idCategoriaEstudios = $2 RETURNING *",
        [data.nombre, id]
    );
    return res.json(rows[0]);
};
