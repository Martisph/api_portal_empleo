import { pool } from '../database/db.js'

export class Comentario {
  static async getComentarios () {
    try {
      const { rows } = await pool.query(
        'SELECT * FROM Comentarios'
      )
      return rows
    } catch (e) {
      throw new Error(' Internal error ')
    }
  }

  static async getComentario ({ id }) {
    try {
      const { rows } = await pool.query(
        'SELECT * FROM Comentario WHERE id_comentario = $1',
        [id]
      )
      return rows[0]
    } catch (e) {
      throw new Error(' Internal error ')
    }
  }

  static async postComentario ({ data }) {
    try {
      const { rows } = await pool.query(
        `INSERT INTO Comentario
        (id_comentario, fk_id_candidato, fk_id_empresa, descripcion, puntaje, estado)
        VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
        [
          data.id_comentario,
          data.fk_id_candidato,
          data.fk_id_empresa,
          data.descripcion,
          data.puntaje,
          data.estado
        ]
      )
      return rows[0]
    } catch (e) {
      throw new Error(' Internal error ')
    }
  }

  static async deleteComentario ({ id }) {
    try {
      const { rowCount } = await pool.query(
        'DELETE FROM Comentario WHERE id_comentario = $1 RETURNING *',
        [id]
      )
      if (rowCount) return true
      return false
    } catch (e) {
      throw new Error(' Internal error ')
    }
  }

  static async putComentario ({ id }, { data }) {
    try {
      const { rows } = await pool.query(
        `UPDATE Comentarios SET
          id_comentario = $1, 
          fk_id_candidato = $2, 
          fk_id_empresa = $3, 
          descripcion = $4, 
          puntaje = $5, 
          estado = $6,
        WHERE id_comentario = $7 RETURNING *`,
        [
          data.id_comentario,
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
      throw new Error(' Internal error ')
    }
  }
}
