import { pool } from '../database/db.js'

export class CategoriaEstudio {
  static async getCategoriaEstudios () {
    try {
      const { rows } = await pool.query('SELECT * FROM Categoria_Estudios')
      return rows
    } catch (e) {
      throw new Error(' Internal error ')
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
      throw new Error(' Internal Error ')
    }
  }

  static async postCategoriaEstudio ({ data }) {
    try {
      const { rows } = await pool.query(
        `INSERT INTO Categoria_Estudios 
      (id_categoria_estudio, nombre, descripcion) 
      VALUES($1, $2, $3) RETURNING *`,
        [data.id_categoria_estudio, data.nombre, data.descripcion]
      )
      return rows[0]
    } catch (e) {
      throw new Error(' Internal error ')
    }
  }

  static async deleteCategoriaEstudio ({ id }) {
    try {
      const { rowCount } = await pool.query(
        'DELETE FROM Categoria_estudio WHERE id_categoria_estudio = $1 RETURNING *',
        [id]
      )
      if (rowCount) return true
      return false
    } catch (error) {
      throw new Error(' Internal error ')
    }
  }

  static async putCategoriaEstudio ({ id }, { data }) {
    try {
      const { row } = await pool.query(
        `UPDATE Categoria_estudios SET
          id_categoria_estudio = $1,
          nombre = $2,
          descripcion = $3
          WHERE id_categoria_estudio = $4 RETURNING *`,
        [data.id_categoria_estudio, data.nombre, data.descripcion, id]
      )
      return row[0]
    } catch (e) {
      throw new Error(' Internal error ')
    }
  }
}
