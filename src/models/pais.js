import { pool } from "../database/db.js";
export class Pais {

    static async getPaises(){
        const { rows } = await pool.query("SELECT id_pais, nombre FROM Paises");
        return rows;
    }

    static async getPais(id){
        const { rows } = await pool.query(
            "SELECT id_pais, nombre FROM Paises WHERE id_pais =$1",
            [id]
        );
        if (rows.length == 0) {
            return res.status(404).json({ message: "User no encontrado" });
        }
        return rows[0]
    }

    static async postPais({data}){
        try {
            const { rows } = await pool.query(
                "INSERT INTO Paises (nombre) VALUES($1) RETURNING *",
                [data.nombre]
            );
            return rows[0];
        } catch (e) {
            return { message: "error de registro de datos" };
        }
    }

    static async deletePais(id){
        const { rowCount } = await pool.query(
            "DELETE FROM Paises WHERE id_pais = $1 RETURNING *",
            [id]
        );
        if (rowCount === 0) {
            return { message: "User no encontrado" };
        }
        return { message: "Usuario eliminado"};
    }

    static async putPais(id, {data}){
        console.log(id, data.nombre)
        const {rows} = await pool.query(
            "UPDATE Paises SET nombre = $1 WHERE id_pais = $2 RETURNING *",
            [data.nombre, id]
        );
        return rows[0];
    }
}