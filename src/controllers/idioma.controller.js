import { pool } from "../database/db.js";

/* Seleccionar Idiomas */
export const getIdiomas = async (req, res) => {
    const { rows } = await pool.query("SELECT * FROM Idioma");
    return res.json(rows);
};
/* Seleccionar un Idioma */
export const getIdioma = async (req, res) => {
    const { id } = req.params;
    const { rows } = await pool.query("SELECT * FROM Idioma WHERE idIdioma =$1", [
        id,
    ]);
    if (rows.length == 0) {
        return res.status(404).json({ message: "User no encontrado" });
    }
    return res.json(rows[0]);
};
/* Insertar Idioma */
export const postIdioma = async (req, res) => {
    const data = req.body;
    const { rows } = await pool.query(
        "INSERT INTO Idioma(nombre) VALUES($1) RETURNING *",
        [data.nombre]
    );
    return res.json(rows[0]);
};
/* Eliminar un Idioma */
export const deleteIdioma = async (req, res) => {
    const { id } = req.params;
    const { rowCount } = await pool.query(
        "DELETE FROM Idioma WHERE idIdioma = $1 RETURNING *",
        [id]
    );
    if (rowCount === 0) {
        return res.status(404).json({ message: "User no encontrado" });
    }
    return res.sendStatus(204);
};
/* Editar un Idioma */
export const putIdioma = async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    const { rows } = await pool.query(
        "UPDATE Idioma SET nombre = $1 WHERE idIdioma = $2 RETURNING *",
        [data.nombre, id]
    );
    return res.json(rows[0]);
};
