import { pool } from "../database/db.js";

/* Seleccionar dEstudios */
export const getdEstudios = async (req, res) => {
    const { rows } = await pool.query("SELECT * FROM dEstudio");
    return res.json(rows);
};
/* Seleccionar un dEstudio */
export const getdEstudio = async (req, res) => {
    const { id } = req.params;
    const { rows } = await pool.query("SELECT * FROM dEstudio WHERE iddEstudio =$1", [
        id,
    ]);
    if (rows.length == 0) {
        return res.status(404).json({ message: "User no encontrado" });
    }
    return res.json(rows[0]);
};
/* Insertar dEstudio */
export const postdEstudio = async (req, res) => {
    const data = req.body;
    const { rows } = await pool.query(
        "INSERT INTO dEstudio(nombre) VALUES($1) RETURNING *",
        [data.nombre]
    );
    return res.json(rows[0]);
};
/* Eliminar un dEstudio */
export const deletedEstudio = async (req, res) => {
    const { id } = req.params;
    const { rowCount } = await pool.query(
        "DELETE FROM dEstudio WHERE iddEstudio = $1 RETURNING *",
        [id]
    );
    if (rowCount === 0) {
        return res.status(404).json({ message: "User no encontrado" });
    }
    return res.sendStatus(204);
};
/* Editar un dEstudio */
export const putdEstudio = async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    const { rows } = await pool.query(
        "UPDATE dEstudio SET nombre = $1 WHERE iddEstudio = $2 RETURNING *",
        [data.nombre, id]
    );
    return res.json(rows[0]);
};
