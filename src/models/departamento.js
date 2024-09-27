import { pool } from '../database/db.js'

export class Departamento {
  static async getDepartamentos () {
    try {
      const { rows } = await pool.query(
        'SELECT * FROM Departamentos'
      )
      return rows
    } catch (e) {
      throw new Error(' Internal error ' + e.message)
    }
  }

  static async getDepartamento ({ id }) {
    try {
      const { rows } = await pool.query(
        'SELECT * FROM Departamentos WHERE id_departamento = $1',
        [id]
      )
      return rows[0]
    } catch (e) {
      throw new Error(' Internal error ' + e.message)
    }
  }

  static async postDepartamento ({ data }) {
    try {
      const { rows } = await pool.query(
        `INSERT INTO Departamentos(fk_id_pais, nombre)
        VALUES($1, $2) RETURNING *`,
        [
          data.fk_id_pais,
          data.nombre
        ]
      )
      return rows[0]
    } catch (e) {
      throw new Error(' Internal error ' + e.message)
    }
  }

  static async deleteDepartamento ({ id }) {
    try {
      const { rowCount } = await pool.query(
        'DELETE FROM Departamentos WHERE id_departamento = $1 RETURNING *',
        [id]
      )
      if (rowCount) return true
      return false
    } catch (e) {
      throw new Error(' Internar error ' + e.message)
    }
  }

  static async putDepartamento ({ id }, { data }) {
    try {
      const { rows } = await pool.query(
        `UPDATE Departamentos SET
        fk_id_pais = $1, nombre = $2
        WHERE id_departamento = $3 RETURNING *`,
        [data.fk_id_pais, data.nombre, id]
      )
      return rows[0]
    } catch (e) {
      throw new Error(' Internal error ' + e.message)
    }
  }
}
