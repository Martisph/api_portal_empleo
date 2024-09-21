export class Departamento {

    static async getDepartamentos(req, res){
        const { rows } = await pool.query("SELECT id_departamento, fk_id_pais, nombre FROM Departamentos");
        return res.json(rows);
    }

    static async getDepartamento(req, res){
        const { id } = req.params;
        const { rows } = await pool.query(
            "SELECT id_departamento, fk_id_pais, nombre FROM Departamentos WHERE id_departamento =$1",
            [id]
        );
        if (rows.length == 0) {
            return res.status(404).json({ message: "User no encontrado" });
        }
        return res.json(rows[0]);
    }

    static async postDepartamento(req, res){
        try {
            const data = req.body;
            const { rows } = await pool.query(
                "INSERT INTO Departamentos (id_departamento, fk_id_pais, nombre) VALUES($1, $2, $3) RETURNING *",
                [data.nombre]
            );
            return res.json(rows[0]);
        } catch (e) {
            return res
                .status(500)
                .json({ message: "error de registro de datos" });
        }
    }

    static async deleteDepartamento(req, res){
        const { id } = req.params;
        const { rowCount } = await pool.query(
            "DELETE FROM Departamentos WHERE id_departamento = $1 RETURNING *",
            [id]
        );
        if (rowCount === 0) {
            return res.status(404).json({ message: "User no encontrado" });
        }
        return res.sendStatus(204);
    }

    static async putDepartamento(req, res){
        const { id } = req.params;
        const data = req.body;
        const { rows } = await pool.query(
            "UPDATE Departamentos SET id_departamento = $1, fk_id_pais = $2, nombre = $3 WHERE id_departamento = $4 RETURNING *",
            [data.id_departamento, data.fk_id_pais, data.nombre, id]
        );
        return res.json(rows[0]);
    }
}