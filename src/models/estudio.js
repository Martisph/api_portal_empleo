import { pool } from '../database/db.js'

export class Estudio {
  static async getEstudios () {
    try {
      const { rows } = await pool.query(
        'SELECT * FORM Estudios'
      )
      return rows
    } catch (e) {
      throw new Error(' Internal error ')
    }
  }

  static async getEstudio ({ id }) {
    try {
      const { rows } = await pool.query(
        'SELECT * FROM Estudios WHERE id_empresa = $1',
        [id]
      )
      return rows[0]
    } catch (e) {
      throw new Error(' Internal error ')
    }
  }

  static async postEstudio ({ data }) {
    try {
      const { rows } = await pool.query(
        `INSET INTO Estudios
          (fk_id_categoria_estudio, fk_id_candidato, titulo, descripcion, estado)
        VALUES($1, $2, $3, $4, $5) RETURNING *`,
        [
          data.fk_id_categoria_estudio,
          data.fk_id_candidato,
          data.titulo,
          data.descripcion,
          data.estado
        ]
      )
      return rows[0]
    } catch (e) {
      throw new Error(' Internal error ')
    }
  }

  static async deleteEstudio ({ id }) {
    try {
      const { rowCount } = await pool.query(
        'DELETE FROM Estudios WHERE id_estudio = $1 RETURNING *',
        [id]
      )
      if (rowCount) return true
      return false
    } catch (e) {
      throw new Error(' Internal error ')
    }
  }

  static async putEstudio ({ id }, { data }) {
    try {
      const { rows } = await pool.query(
        `UPDATE Estudios SET
          fk_id_categoria_estudio = $1,
          fk_id_candidato = $2,
          titulo = $3,
          descripcion = $4,
          estado = $5
        WHERE id_estudio = $6 RETURNING *`,
        [
          data.fk_id_categoria_estudio,
          data.fk_id_candidato,
          data.titulo,
          data.descripcion,
          data.estado,
          id
        ]
      )
      return rows[0]
    } catch (e) {
      throw new Error(' Internal error ')
    }
  }
}
