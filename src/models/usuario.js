export class Usuario {

    static async getUsuarios(req, res) {
        const { rows } = await pool.query("SELECT * FROM Usuarios");
        return res.json(rows);
    }

    static async getUsuario(req, res) {
        const { id } = req.params;
        const { rows } = await pool.query(
            "SELECT * FROM Usuarios WHERE id_usuario =$1",
            [id]
        );
        if (rows.length == 0) {
            return res.status(404).json({ message: "User no encontrado" });
        }
        return res.json(rows[0]);
    }

    static async postUsuario(req, res) {
        const data = req.body;
        const { rows } = await pool.query(
            `INSERT INTO Usuarios
            (id_usuario, fk_id_ubicacion, nombre, email, contrasena, rol, fecha_creacion)
            VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
            [
                data.id_usuario,
                data.fk_id_ubicacion,
                data.nombre,
                data.email,
                data.contrasena,
                data.rol,
                data.fecha_creacion,
            ]
        );
        return res.json(rows[0]);
    }

    static async deleteUsuario(req, res) {
        const { id } = req.params;
        const { rowCount } = await pool.query(
            "DELETE FROM Usuarios WHERE id_usuario = $1 RETURNING *",
            [id]
        );
        if (rowCount === 0) {
            return res.status(404).json({ message: "User no encontrado" });
        }
        return res.sendStatus(204);
    }

    static async putUsuario(req, res) {
        const { id } = req.params;
        const data = req.body;
        const { rows } = await pool.query(
            `UPDATE Usuarios SET 
            id_usuario = $1
            fk_id_ubicacion = $2
            nombre = $3
            email = $4
            contrasena = $5
            rol = $6
            fecha_creacion = $7
            WHERE id_usuario = $8 RETURNING *`,
            [
                data.id_usuario,
                data.fk_id_ubicacion,
                data.nombre,
                data.email,
                data.contrasena,
                data.rol,
                data.fecha_creacion,
                id,
            ]
        );
        return res.json(rows[0]);
    }
}