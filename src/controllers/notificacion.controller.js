import { pool } from "../database/db.js";

/* Seleccionar Notificaiones */
export const getNotificaiones = async (req, res) => {
    const { rows } = await pool.query("SELECT * FROM Notificaion");
    return res.json(rows);
};
/* Seleccionar un Notificaion */
export const getNotificaion = async (req, res) => {
    const { id } = req.params;
    const { rows } = await pool.query("SELECT * FROM Notificaion WHERE idNotificaion =$1", [
        id,
    ]);
    if (rows.length == 0) {
        return res.status(404).json({ message: "User no encontrado" });
    }
    return res.json(rows[0]);
};
/* Insertar Notificaion */
export const postNotificaion = async (req, res) => {
    const data = req.body;
    const { rows } = await pool.query(
        "INSERT INTO Notificaion(nombre) VALUES($1) RETURNING *",
        [data.nombre]
    );
    return res.json(rows[0]);
};
/* Eliminar un Notificaion */
export const deleteNotificaion = async (req, res) => {
    const { id } = req.params;
    const { rowCount } = await pool.query(
        "DELETE FROM Notificaion WHERE idNotificaion = $1 RETURNING *",
        [id]
    );
    if (rowCount === 0) {
        return res.status(404).json({ message: "User no encontrado" });
    }
    return res.sendStatus(204);
};
/* Editar un Notificaion */
export const putNotificaion = async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    const { rows } = await pool.query(
        "UPDATE Notificaion SET nombre = $1 WHERE idNotificaion = $2 RETURNING *",
        [data.nombre, id]
    );
    return res.json(rows[0]);
};
