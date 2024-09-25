import { pool } from '../database/db.js'
export class Ubicacion {
  static async getUbicaciones () {
    try {
      const { rows } = await pool.query('SELECT * FROM Ubicaciones')
      return rows
    } catch (e) {
      throw new Error(' Internal error')
    }
  }

  static async getUbicacion ({ id }) {
    try {
      const { rows } = await pool.query(
        'SELECT * FROM Ubicaciones WHERE id_ubicacion =$1',
        [id]
      )
      return rows[0]
    } catch (e) {
      throw new Error(' Internal errord')
    }
  }

  static async postUbicacion ({ data }) {
    try {
      const { rows } = await pool.query(
        'INSERT INTO Ubicaciones (id_ubicacion, fk_id_departamento, nombre) VALUES($1, $2, $3) RETURNING *',
        [data.id_ubicacion, data.fk_id_departamento, data.nombre]
      )
      return rows[0]
    } catch (e) {
      throw new Error(' Internal errord')
    }
  }

  static async deleteUbicacion ({ id }) {
    try {
      const { rowCount } = await pool.query(
        'DELETE FROM Ubicaciones WHERE id_ubicacion = $1 RETURNING *',
        [id]
      )
      if (rowCount) return true
      return false
    } catch (e) {
      throw new Error(' Internal errord')
    }
  }

  static async putUbicacion ({ id }, { data }) {
    try {
      const { rows } = await pool.query(
        'UPDATE Ubicaciones SET id_ubicacion = $1, fk_id_departamento = $2, nombre = $3 WHERE id_ubicacion = $4 RETURNING *',
        [data.id_ubicacion, data.fk_id_departamento, data.nombre, id]
      )
      return rows[0]
    } catch (e) {
      throw new Error(' Internal errord')
    }
  }
}
