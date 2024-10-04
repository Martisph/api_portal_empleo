import { pool } from '../database/db.js'
import bcrypt from 'bcrypt'

export class Usuario {
  constructor ({ data }) {
    this.email = data.email
    this.contrasena = data.contrasena
  }

  static async getUsuarios () {
    try {
      const { rows } = await pool.query('SELECT * FROM Usuarios')
      return rows
    } catch (e) {
      throw new Error(' Internal error ' + e.message)
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
      throw new Error(' Internal error ' + e.message)
    }
  }

  static async postUsuario ({ data }) {
    try {
      const hashedpass = await bcrypt.hash(data.contrasena, 10)
      const { rows } = await pool.query(
        `INSERT INTO Usuarios
                (fk_id_ubicacion, nombre, email, contrasena, rol)
                VALUES($1, $2, $3, $4, $5) RETURNING *`,
        [
          data.fk_id_ubicacion,
          data.nombre,
          data.email,
          hashedpass,
          data.rol
        ]
      )
      return rows[0]
    } catch (e) {
      throw new Error(' Internal error ' + e.message)
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
      throw new Error(' Internal error ' + e.message)
    }
  }

  static async putUsuario ({ id }, { data }) {
    try {
      const hashedpass = await bcrypt.hash(data.contrasena, 10)
      const { rows } = await pool.query(
        `UPDATE Usuarios SET 
              fk_id_ubicacion = $1,
              nombre = $2,
              email = $3,
              contrasena = $4,
              rol = $5
              WHERE id_usuario = $6 RETURNING *`,
        [
          data.fk_id_ubicacion,
          data.nombre,
          data.email,
          hashedpass,
          data.rol,
          id
        ]
      )
      return rows[0]
    } catch (e) {
      throw new Error(' Internal error ' + e.message)
    }
  }

  static async existsEmail ({ data }) {
    try {
      const email = await pool.query(
        'SELECT email FROM Usuarios WHERE email = $1',
        [data.email]
      )
      return email
    } catch (e) {
      return { message: 'error' }
    }
  }

  async loginUsuario () {
    try {
      const { rows } = await pool.query(
        'SELECT id_usuario, nombre, email, contrasena FROM Usuarios WHERE email = $1',
        [this.email]
      )
      if (rows[0]) {
        const valores = rows[0]
        const isValid = await bcrypt.compare(this.contrasena, valores.contrasena)
        if (isValid) {
          return {
            _id: valores.id_usuario,
            nombre: valores.nombre,
            email: valores.email
          }
        }
        throw new Error(' Credenciales invalidos ')
      }
      throw new Error(' Usuario no existe ')
    } catch (e) {
      throw new Error(e.message)
    }
  }
}
