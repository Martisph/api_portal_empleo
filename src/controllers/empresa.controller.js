import { pool } from "../database/db.js";

/* Seleccionar Empresas */
export const getEmpresas = async (req, res) => {
    const { rows } = await pool.query("SELECT * FROM Empresa");
    return res.json(rows);
};
/* Seleccionar un Empresa */
export const getEmpresa = async (req, res) => {
    const { id } = req.params;
    const { rows } = await pool.query("SELECT * FROM Empresa WHERE idEmpresa =$1", [
        id,
    ]);
    if (rows.length == 0) {
        return res.status(404).json({ message: "User no encontrado" });
    }
    return res.json(rows[0]);
};
/* Insertar Empresa */
export const postEmpresa = async (req, res) => {
    const data = req.body;
    const { rows } = await pool.query(
        "INSERT INTO Empresa(nombre) VALUES($1) RETURNING *",
        [data.nombre]
    );
    return res.json(rows[0]);
};
/* Eliminar un Empresa */
export const deleteEmpresa = async (req, res) => {
    const { id } = req.params;
    const { rowCount } = await pool.query(
        "DELETE FROM Empresa WHERE idEmpresa = $1 RETURNING *",
        [id]
    );
    if (rowCount === 0) {
        return res.status(404).json({ message: "User no encontrado" });
    }
    return res.sendStatus(204);
};
/* Editar un Empresa */
export const putEmpresa = async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    const { rows } = await pool.query(
        "UPDATE Empresa SET nombre = $1 WHERE idEmpresa = $2 RETURNING *",
        [data.nombre, id]
    );
    return res.json(rows[0]);
};
