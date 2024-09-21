export class Empresa {
    static async getEmpresa(req, res) {
        const { rows } = await pool.query("SELECT * FROM Empresas");
        return res.json(rows);
    }

    static async getEmpresa(req, res) {
        const { id } = req.params;
        const { rows } = await pool.query(
            "SELECT * FROM Empresas WHERE id_empresa =$1",
            [id]
        );
        if (rows.length == 0) {
            return res.status(404).json({ message: "User no encontrado" });
        }
        return res.json(rows[0]);
    }

    static async postEmpresa(req, res) {
        const data = req.body;
        const { rows } = await pool.query(
            `INSERT INTO Empresas
            (id_empresa, nombre, razon_social, descripcion, ruc, vision, mision, valores, sector, direccion, telefono, email)
            VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *`,
            [
                data.id_empresa,
                data.nombre,
                data.razon_social,
                data.descripcion,
                data.ruc,
                data.vision,
                data.mision,
                data.valores,
                data.sector,
                data.direccion,
                data.telefono,
                data.email,
            ]
        );
        return res.json(rows[0]);
    }

    static async deleteEmpresa(req, res) {
        const { id } = req.params;
        const { rowCount } = await pool.query(
            "DELETE FROM Empresas WHERE id_empresa = $1 RETURNING *",
            [id]
        );
        if (rowCount === 0) {
            return res.status(404).json({ message: "User no encontrado" });
        }
        return res.sendStatus(204);
    }

    static async putEmpresa(req, res) {
        const { id } = req.params;
        const data = req.body;
        const { rows } = await pool.query(
            `UPDATE Empresas SET 
            id_empresa = $1,
            nombre = $2,
            razon_social = $3,
            descripcion = $4,
            ruc = $5,
            vision = $6,
            mision = $7,
            valores = $8,
            sector = $9,
            direccion = $10,
            telefono = $11,
            email = $12
            WHERE id_empresa = $13 RETURNING *`,
            [
                data.id_empresa,
                data.nombre,
                data.razon_social,
                data.descripcion,
                data.ruc,
                data.vision,
                data.mision,
                data.valores,
                data.sector,
                data.direccion,
                data.telefono,
                data.email,
                id,
            ]
        );
        return res.json(rows[0]);
    }
}