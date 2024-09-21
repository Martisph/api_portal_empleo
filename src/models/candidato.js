export class Candidato {
    static async getCandidato(req, res) {
        const { rows } = await pool.query("SELECT * FROM Candidatos");
        return res.json(rows);
    }

    static async getCandidato(req, res) {
        const { id } = req.params;
        const { rows } = await pool.query(
            "SELECT * FROM Candidatos WHERE id_candidato =$1",
            [id]
        );
        if (rows.length == 0) {
            return res.status(404).json({ message: "User no encontrado" });
        }
        return res.json(rows[0]);
    }

    static async postCandidato(req, res) {
        const data = req.body;
        const { rows } = await pool.query(
            `INSERT INTO Candidatos
            (id_candidato, fk_id_usuario, fk_id_area, apellido, genero, estado_civil, fecha_nacimiento, direccion, telefono, linkedin)
            VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
            [
                data.id_candidato,
                data.fk_id_usuario,
                data.fk_id_area,
                data.apellido,
                data.genero,
                data.estado_civil,
                data.fecha_nacimiento,
                data.direccion,
                data.telefono,
                data.linkedin,
            ]
        );
        return res.json(rows[0]);
    }

    static async deleteCandidato(req, res) {
        const { id } = req.params;
        const { rowCount } = await pool.query(
            "DELETE FROM Candidatos  WHERE id_candidato = $1 RETURNING *",
            [id]
        );
        if (rowCount === 0) {
            return res.status(404).json({ message: "User no encontrado" });
        }
        return res.sendStatus(204);
    }

    static async putCandidato(req, res) {
        const { id } = req.params;
        const data = req.body;
        const { rows } = await pool.query(
            `UPDATE Candidatos SET 
            id_candidato = $1, 
            fk_id_usuario = $2, 
            fk_id_area = $3, 
            apellido = $4, 
            genero = $5, 
            estado_civil = $6,
            fecha_nacimiento = $7, 
            direccion = $8,
            telefono = $9, 
            linkedin = $10 
            WHERE id_candidato = $11 RETURNING *`,
            [
                data.id_candidato,
                data.fk_id_usuario,
                data.fk_id_area,
                data.apellido,
                data.genero,
                data.estado_civil,
                data.fecha_nacimiento,
                data.direccion,
                data.telefono,
                data.linkedin,
                id,
            ]
        );
        return res.json(rows[0]);
    }
}