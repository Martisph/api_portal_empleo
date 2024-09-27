import { pool } from '../database/db.js'
export class Pais {
  static async getPaises () {
    try {
      const { rows } = await pool.query('SELECT id_pais, nombre FROM Paises')
      return rows
    } catch (e) {
      throw new Error(' Internal error ' + e.message)
    }
  }

  static async getPais ({ id }) {
    try {
      const { rows } = await pool.query(
        'SELECT id_pais, nombre FROM Paises WHERE id_pais =$1',
        [id]
      )
      return rows[0]
    } catch (e) {
      throw new Error(' Internal error ' + e.message)
    }
  }

  static async postPais ({ data }) {
    try {
      const { rows } = await pool.query(
        'INSERT INTO Paises (nombre) VALUES($1) RETURNING *',
        [data.nombre]
      )
      return rows[0]
    } catch (e) {
      throw new Error(' Internal error ' + e.message)
    }
  }

  static async deletePais ({ id }) {
    try {
      const { rowCount } = await pool.query(
        'DELETE FROM Paises WHERE id_pais = $1 RETURNING *',
        [id]
      )
      if (rowCount) return true
      return false
    } catch (e) {
      throw new Error(' Internal error ' + e.message)
    }
  }

  static async putPais ({ id }, { data }) {
    try {
      const { rows } = await pool.query(
        'UPDATE Paises SET nombre = $1 WHERE id_pais = $2 RETURNING *',
        [data.nombre, id]
      )
      return rows[0]
    } catch (e) {
      throw new Error(' Internal error ' + e.message)
    }
  }
}
