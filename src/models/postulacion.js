import { pool } from '../database/db.js'

export class Postulacion {
  static async getPostulaciones () {
    try {
      const { rows } = await pool.query(
        `SELECT post.id_postulacion, cand.apellido, anun.titulo, post.estado
          FROM Postulaciones post 
          JOIN Candidatos cand ON post.fk_id_candidato = cand.id_candidato
          JOIN Anuncios anun ON post.fk_id_anuncio = anun.id_anuncio ORDER BY post.fecha_creacion DESC`
      )
      return rows
    } catch (e) {
      throw new Error(' Internal error ' + e.message)
    }
  }

  static async getPostulacion ({ id }) {
    try {
      const { rows } = await pool.query(
        `SELECT cand.apellido, anun.titulo, post.estado, post.fecha_creacion
          FROM Postulaciones post 
          JOIN Candidatos cand ON post.fk_id_candidato = cand.id_candidato
          JOIN Anuncios anun ON post.fk_id_anuncio = anun.id_anuncio
          WHERE post.id_postulacion = $1`,
        [id]
      )
      return rows[0]
    } catch (e) {
      throw new Error(' Internal error ' + e.message)
    }
  }

  static async postPostulacion ({ data }) {
    console.log(data)
    try {
      const { rows } = await pool.query(
      `INSERT INTO Postulaciones
            (fk_id_candidato, fk_id_empresa, fk_id_anuncio, estado)
            VALUES($1, $2, $3, $4) RETURNING *`,
      [
        data.fk_id_candidato,
        data.fk_id_empresa,
        data.fk_id_anuncio,
        data.estado
      ]
      )
      return rows[0]
    } catch (e) {
      throw new Error(' Internal error ' + e.message)
    }
  }

  static async deletePostulacion ({ id }) {
    try {
      const { rowCount } = await pool.query(
        'DELETE FROM Postulaciones WHERE id_postulacion = $1 RETURNING *',
        [id]
      )
      if (rowCount) return true
      return false
    } catch (e) {
      throw new Error(' Internal error ' + e.message)
    }
  }

  static async putPostulacion ({ id }, { data }) {
    try {
      const { rows } = await pool.query(
      `UPDATE Postulaciones SET
            fk_id_candidato = $1,
            fk_id_empresa = $2,
            fk_id_anuncio = $3,
            estado = $4
            WHERE id_postulacion = $5 RETURNING *`,
      [
        data.fk_id_candidato,
        data.fk_id_empresa,
        data.fk_id_anuncio,
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
