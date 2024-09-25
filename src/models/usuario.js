import { pool } from '../database/db.js'

export class Usuario {
  static async getUsuarios () {
    const { rows } = await pool.query('SELECT * FROM Usuarios')
    return rows
  }

  static async getUsuario (id) {
    const { rows } = await pool.query(
      'SELECT * FROM Usuarios WHERE id_usuario =$1',
      [id]
    )
    if (rows.length === 0) {
      return { message: 'User no encontrado' }
    }
    return rows[0]
  }

  static async postUsuario ({ data }) {
    try {
      const { rows } = await pool.query(
        `INSERT INTO Usuarios
                (fk_id_ubicacion, nombre, email, contrasena, rol)
                VALUES($1, $2, $3, $4, $5) RETURNING *`,
        [
          data.fk_id_ubicacion,
          data.nombre,
          data.email,
          data.contrasena,
          data.rol
        ]
      )
      return rows[0]
    } catch (e) {
      return { message: 'error en el modelo' }
    }
  }

  static async deleteUsuario (id) {
    const { rowCount } = await pool.query(
      'DELETE FROM Usuarios WHERE id_usuario = $1 RETURNING *',
      [id]
    )
    if (rowCount === 0) {
      return { message: 'User no encontrado' }
    }
    return { message: 'usuario eliminado' }
  }

  static async putUsuario (id, { data }) {
    const { rows } = await pool.query(
      `UPDATE Usuarios SET 
            fk_id_ubicacion = $1
            nombre = $2
            email = $3
            contrasena = $4
            rol = $5
            fecha_creacion = $6
            WHERE id_usuario = $7 RETURNING *`,
      [
        data.fk_id_ubicacion,
        data.nombre,
        data.email,
        data.contrasena,
        data.rol,
        data.fecha_creacion,
        id
      ]
    )
    return rows[0]
  }
}
