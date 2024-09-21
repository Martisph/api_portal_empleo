import { pool } from "../database/db.js";

/* Seleccionar Usuarios */
export const getUsuarios = async (req, res) => {
    const { rows } = await pool.query("SELECT * FROM Usuario");
    return res.json(rows);
};
/* Seleccionar un Usuario */
export const getUsuario = async (req, res) => {
    const { id } = req.params;
    const { rows } = await pool.query("SELECT * FROM Usuario WHERE idUsuario =$1", [
        id,
    ]);
    if (rows.length == 0) {
        return res.status(404).json({ message: "User no encontrado" });
    }
    return res.json(rows[0]);
};
/* Insertar Usuario */
export const postUsuario = async (req, res) => {
    const data = req.body;
    const { rows } = await pool.query(
        "INSERT INTO Usuario(nombre) VALUES($1) RETURNING *",
        [data.nombre]
    );
    return res.json(rows[0]);
};
/* Eliminar un Usuario */
export const deleteUsuario = async (req, res) => {
    const { id } = req.params;
    const { rowCount } = await pool.query(
        "DELETE FROM Usuario WHERE idUsuario = $1 RETURNING *",
        [id]
    );
    if (rowCount === 0) {
        return res.status(404).json({ message: "User no encontrado" });
    }
    return res.sendStatus(204);
};
/* Editar un Usuario */
export const putUsuario = async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    const { rows } = await pool.query(
        "UPDATE Usuario SET nombre = $1 WHERE idUsuario = $2 RETURNING *",
        [data.nombre, id]
    );
    return res.json(rows[0]);
};
