import { pool } from '../database/db.js'

export class Comentario {
  static async getComentarios () {
    try {
      const { rows } = await pool.query(
        'SELECT * FROM Comentarios'
      )
      return rows
    } catch (e) {
      throw new Error(' Internal error ' + e.message)
    }
  }

  static async getComentario ({ id }) {
    try {
      const { rows } = await pool.query(
        'SELECT * FROM Comentarios WHERE id_comentario = $1',
        [id]
      )
      return rows[0]
    } catch (e) {
      throw new Error(' Internal error ' + e.message)
    }
  }

  static async postComentario ({ data }) {
    try {
      const { rows } = await pool.query(
        `INSERT INTO Comentarios
        (fk_id_candidato, fk_id_empresa, descripcion, puntaje, estado)
        VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [
          data.fk_id_candidato,
          data.fk_id_empresa,
          data.descripcion,
          data.puntaje,
          data.estado
        ]
      )
      return rows[0]
    } catch (e) {
      throw new Error(' Internal error ' + e.message)
    }
  }

  static async deleteComentario ({ id }) {
    try {
      const { rowCount } = await pool.query(
        'DELETE FROM Comentarios WHERE id_comentario = $1 RETURNING *',
        [id]
      )
      if (rowCount) return true
      return false
    } catch (e) {
      throw new Error(' Internal error ' + e.message)
    }
  }

  static async putComentario ({ id }, { data }) {
    try {
      const { rows } = await pool.query(
        `UPDATE Comentarios SET
          fk_id_candidato = $1,
          fk_id_empresa = $2,
          descripcion = $3,
          puntaje = $4,
          estado = $5
        WHERE id_comentario = $6 RETURNING *`,
        [
          data.fk_id_candidato,
          data.fk_id_empresa,
          data.descripcion,
          data.puntaje,
          data.estado,
          id
        ]
      )
      return rows[0]
    } catch (e) {
      throw new Error(' Internal error ' + e.message)
    }
  }
}
