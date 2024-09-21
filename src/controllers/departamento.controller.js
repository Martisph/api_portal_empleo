import { pool } from "../database/db.js";

/* Seleccionar Departamentos */
export const getDepartamentos = async (req, res) => {
    const { rows } = await pool.query("SELECT * FROM Departamento");
    return res.json(rows);
};
/* Seleccionar un Departamento */
export const getDepartamento = async (req, res) => {
    const { id } = req.params;
    const { rows } = await pool.query("SELECT * FROM Departamento WHERE idDepartamento =$1", [
        id,
    ]);
    if (rows.length == 0) {
        return res.status(404).json({ message: "User no encontrado" });
    }
    return res.json(rows[0]);
};
/* Insertar Departamento */
export const postDepartamento = async (req, res) => {
    const data = req.body;
    const { rows } = await pool.query(
        "INSERT INTO Departamento(nombre) VALUES($1) RETURNING *",
        [data.nombre]
    );
    return res.json(rows[0]);
};
/* Eliminar un Departamento */
export const deleteDepartamento = async (req, res) => {
    const { id } = req.params;
    const { rowCount } = await pool.query(
        "DELETE FROM Departamento WHERE idDepartamento = $1 RETURNING *",
        [id]
    );
    if (rowCount === 0) {
        return res.status(404).json({ message: "User no encontrado" });
    }
    return res.sendStatus(204);
};
/* Editar un Departamento */
export const putDepartamento = async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    const { rows } = await pool.query(
        "UPDATE Departamento SET nombre = $1 WHERE idDepartamento = $2 RETURNING *",
        [data.nombre, id]
    );
    return res.json(rows[0]);
};
