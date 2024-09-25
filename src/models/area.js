import { pool } from '../database/db.js'

export class Area {
  static async getAreas () {
    try {
      const { rows } = await pool.query('SELECT * FROM Areas')
      return rows
    } catch (e) {
      throw new Error(' Error interno ' + e.message)
    }
  }

  static async getArea ({ id }) {
    try {
      const { rows } = await pool.query(
        'SELECT * FROM Areas WHERE id_area =$1',
        [id]
      )
      return rows[0]
    } catch (e) {
      throw new Error(' Error interno ' + e.message)
    }
  }

  static async postArea ({ data }) {
    try {
      const { rows } = await pool.query(
        'INSERT INTO Areas (nombre, descripcion) VALUES($1, $2) RETURNING *',
        [data.nombre, data.descripcion]
      )
      return rows[0]
    } catch (e) {
      throw new Error(' Error al registrar los datos ' + e.message)
    }
  }

  static async deleteArea ({ id }) {
    try {
      const { rowCount } = await pool.query(
        'DELETE FROM Areas WHERE id_area = $1 RETURNING *',
        [id]
      )
      if (rowCount) return true
      return false
    } catch (e) {
      throw new Error(' Internal error ' + e.message)
    }
  }

  static async putArea ({ id }, { data }) {
    try {
      console.log(data)
      const { rows } = await pool.query(
        'UPDATE Areas SET nombre = $1, descripcion = $2 WHERE id_area = $3 RETURNING *',
        [data.nombre, data.descripcion, id]
      )
      return rows[0]
    } catch (e) {
      throw new Error(' Error al editar los datos ' + e.message)
    }
  }
}
