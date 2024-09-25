import { pool } from '../database/db.js'

export class Postulacion {
  static async getPostulaciones () {
    try {
      const { rows } = await pool.query('SELECT * FROM Postulaciones')
      return rows
    } catch (e) {
      throw new Error(' Internal error ')
    }
  }

  static async getPostulacion ({ id }) {
    try {
      const { rows } = await pool.query(
        'SELECT * FROM Postulaciones WHERE id_postulacion =$1',
        [id]
      )
      return rows[0]
    } catch (e) {
      throw new Error(' Internal error ')
    }
  }

  static async postPostulacion ({ data }) {
    try {
      const { rows } = await pool.query(
      `INSERT INTO Postulaciones
            (fk_id_candidato, fk_id_empresa, fk_id_anuncio, estado, fecha_hora)
            VALUES($1, $2, $3, $4, $5) RETURNING *`,
      [
        data.fk_id_candidato,
        data.fk_id_empresa,
        data.fk_id_anuncio,
        data.estado,
        data.fecha_hora
      ]
      )
      return rows[0]
    } catch (e) {
      throw new Error(' Internal error ')
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
      throw new Error(' Internal error ')
    }
  }

  static async putPostulacion ({ id }, { data }) {
    try {
      const { rows } = await pool.query(
      `UPDATE Postulaciones SET 
            id_postulacion = $1, 
            fk_id_candidato = $2, 
            fk_id_empresa = $3, 
            fk_id_anuncio = $4, 
            estado = $5, 
            fecha_hora = $6
            WHERE id_postulacion = $7 RETURNING *`,
      [
        data.id_postulacion,
        data.fk_id_candidato,
        data.fk_id_empresa,
        data.fk_id_anuncio,
        data.estado,
        data.fecha_hora,
        id
      ]
      )
      return rows[0]
    } catch (e) {
      throw new Error(' Internal error ')
    }
  }
}
