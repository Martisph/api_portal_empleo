import { pool } from '../database/db.js'

export class CategoriaEstudio {
  static async getCategoriaEstudios () {
    try {
      const { rows } = await pool.query('SELECT * FROM Categoria_Estudios')
      return rows
    } catch (e) {
      throw new Error(' Internal error ' + e.message)
    }
  }

  static async getCategoriaEstudio ({ id }) {
    try {
      const { rows } = await pool.query(
        'SELECT * FROM Categoria_Estudios WHERE id_categoria_estudio = $1',
        [id]
      )
      return rows[0]
    } catch (e) {
      throw new Error(' Internal Error ' + e.message)
    }
  }

  static async postCategoriaEstudio ({ data }) {
    try {
      const { rows } = await pool.query(
        `INSERT INTO Categoria_Estudios 
      (nombre, descripcion) 
      VALUES($1, $2) RETURNING *`,
        [data.nombre, data.descripcion]
      )
      return rows[0]
    } catch (e) {
      throw new Error(' Internal error ' + e.message)
    }
  }

  static async deleteCategoriaEstudio ({ id }) {
    try {
      const { rowCount } = await pool.query(
        'DELETE FROM Categoria_Estudios WHERE id_categoria_estudio = $1 RETURNING *',
        [id]
      )
      if (rowCount) return true
      return false
    } catch (e) {
      throw new Error(' Internal error ' + e.message)
    }
  }

  static async putCategoriaEstudio ({ id }, { data }) {
    try {
      const { rows } = await pool.query(
        `UPDATE Categoria_estudios SET
          nombre = $1,
          descripcion = $2
          WHERE id_categoria_estudio = $3 RETURNING *`,
        [data.nombre, data.descripcion, id]
      )
      return rows[0]
    } catch (e) {
      throw new Error(' Internal error ' + e.message)
    }
  }
}
