import { pool } from "../database/db.js";

/* Seleccionar Anuncios */
export const getAnuncios = async (req, res) => {
    const { rows } = await pool.query("SELECT * FROM Anuncio");
    return res.json(rows);
};
/* Seleccionar un Anuncio */
export const getAnuncio = async (req, res) => {
    const { id } = req.params;
    const { rows } = await pool.query("SELECT * FROM Anuncio WHERE idAnuncio =$1", [
        id,
    ]);
    if (rows.length == 0) {
        return res.status(404).json({ message: "User no encontrado" });
    }
    return res.json(rows[0]);
};
/* Insertar Anuncio */
export const postAnuncio = async (req, res) => {
    const data = req.body;
    const { rows } = await pool.query(
        "INSERT INTO Anuncio(nombre) VALUES($1) RETURNING *",
        [data.nombre]
    );
    return res.json(rows[0]);
};
/* Eliminar un Anuncio */
export const deleteAnuncio = async (req, res) => {
    const { id } = req.params;
    const { rowCount } = await pool.query(
        "DELETE FROM Anuncio WHERE idAnuncio = $1 RETURNING *",
        [id]
    );
    if (rowCount === 0) {
        return res.status(404).json({ message: "User no encontrado" });
    }
    return res.sendStatus(204);
};
/* Editar un Anuncio */
export const putAnuncio = async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    const { rows } = await pool.query(
        "UPDATE Anuncio SET nombre = $1 WHERE idAnuncio = $2 RETURNING *",
        [data.nombre, id]
    );
    return res.json(rows[0]);
};
