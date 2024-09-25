import { pool } from '../database/db.js'

export class Idioma {
  static async getIdiomas () {
    try {
      const { rows } = await pool.query('SELECT * FROM Idiomas')
      return rows
    } catch (e) {
      throw new Error(' Interanl error ')
    }
  }

  static async getIdioma ({ id }) {
    try {
      const { rows } = await pool.query(
        'SELECT * FROM Idiomas WHERE id_idioma =$1',
        [id]
      )
      return rows[0]
    } catch (e) {
      throw new Error(' Interanl error ')
    }
  }

  static async postIdioma ({ data }) {
    try {
      const { rows } = await pool.query(
        'INSERT INTO Idiomas (fk_id_candidato, nombre, nivel) VALUES($1, $2, $3, $4) RETURNING *',
        [data.fk_id_candidato, data.nombre, data.nivel]
      )
      return rows[0]
    } catch (e) {
      throw new Error(' Interanl error ')
    }
  }

  static async deleteIdioma ({ id }) {
    try {
      const { rowCount } = await pool.query(
        'DELETE FROM Idiomas WHERE id_idioma = $1 RETURNING *',
        [id]
      )
      if (rowCount) return true
      return false
    } catch (e) {
      throw new Error(' Interanl error ')
    }
  }

  static async putIdioma ({ id }, { data }) {
    try {
      const { rows } = await pool.query(
        `UPDATE Idiomas SET
            fk_id_candidato = $1,
            nombre = $2,
            nivel = $3
            WHERE id_idioma = $4 RETURNING *`,
        [data.fk_id_candidato, data.nombre, data.nivel, id]
      )
      return rows[0]
    } catch (e) {
      throw new Error(' Interanl error ')
    }
  }
}
