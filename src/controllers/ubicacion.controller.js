import { pool } from "../database/db.js";

/* Seleccionar Ubicaciones */
export const getUbicaciones = async (req, res) => {
    const { rows } = await pool.query("SELECT * FROM Ubicacion");
    return res.json(rows);
};
/* Seleccionar un Ubicacion */
export const getUbicacion = async (req, res) => {
    const { id } = req.params;
    const { rows } = await pool.query("SELECT * FROM Ubicacion WHERE idUbicacion =$1", [
        id,
    ]);
    if (rows.length == 0) {
        return res.status(404).json({ message: "User no encontrado" });
    }
    return res.json(rows[0]);
};
/* Insertar Ubicacion */
export const postUbicacion = async (req, res) => {
    const data = req.body;
    const { rows } = await pool.query(
        "INSERT INTO Ubicacion(nombre) VALUES($1) RETURNING *",
        [data.nombre]
    );
    return res.json(rows[0]);
};
/* Eliminar un Ubicacion */
export const deleteUbicacion = async (req, res) => {
    const { id } = req.params;
    const { rowCount } = await pool.query(
        "DELETE FROM Ubicacion WHERE idUbicacion = $1 RETURNING *",
        [id]
    );
    if (rowCount === 0) {
        return res.status(404).json({ message: "User no encontrado" });
    }
    return res.sendStatus(204);
};
/* Editar un Ubicacion */
export const putUbicacion = async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    const { rows } = await pool.query(
        "UPDATE Ubicacion SET nombre = $1 WHERE idUbicacion = $2 RETURNING *",
        [data.nombre, id]
    );
    return res.json(rows[0]);
};
