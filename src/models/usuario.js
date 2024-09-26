import { pool } from '../database/db.js'

export class Usuario {
  static async getUsuarios () {
    try {
      const { rows } = await pool.query('SELECT * FROM Usuarios')
      return rows
    } catch (e) {
      throw new Error(' Internal error ')
    }
  }

  static async getUsuario ({ id }) {
    try {
      const { rows } = await pool.query(
        'SELECT * FROM Usuarios WHERE id_usuario =$1',
        [id]
      )
      return rows[0]
    } catch (e) {
      throw new Error(' Internal error ')
    }
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

  static async deleteUsuario ({ id }) {
    try {
      const { rowCount } = await pool.query(
        'DELETE FROM Usuarios WHERE id_usuario = $1 RETURNING *',
        [id]
      )
      if (rowCount) return true
      return false
    } catch (e) {
      throw new Error(' Internal error ')
    }
  }

  static async putUsuario ({ id }, { data }) {
    try {
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
    } catch (e) {
      throw new Error(' Internal error ')
    }
  }
}
