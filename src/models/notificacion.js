import { pool } from '../database/db.js'

export class Notificacion {
  static async getNotificaciones () {
    try {
      const { rows } = await pool.query('SELECT * FROM Notificaciones')
      return rows
    } catch (e) {
      throw new Error(' Internal error ' + e.message)
    }
  }

  static async getNotificacion ({ id }) {
    try {
      const { rows } = await pool.query(
        'SELECT * FROM Notificaciones WHERE id_notificacion =$1',
        [id]
      )
      return rows[0]
    } catch (e) {
      throw new Error(' Internal error ' + e.message)
    }
  }

  static async postNotificacion ({ data }) {
    try {
      const { rows } = await pool.query(
        `INSERT INTO Notificaciones
            (fk_id_empresa, fk_id_candidato, titulo, descripcion)
            VALUES($1, $2, $3, $4) RETURNING *`,
        [
          data.fk_id_empresa,
          data.fk_id_candidato,
          data.titulo,
          data.descripcion
        ]
      )
      return rows[0]
    } catch (e) {
      throw new Error(' Internal error ' + e.message)
    }
  }

  static async deleteNotificacion ({ id }) {
    try {
      const { rowCount } = await pool.query(
        'DELETE FROM Notificaciones WHERE id_notificacion = $1 RETURNING *',
        [id]
      )
      if (rowCount) return true
      return false
    } catch (e) {
      throw new Error(' Internal error ' + e.message)
    }
  }

  static async putNotificacion ({ id }, { data }) {
    try {
      const { rows } = await pool.query(
        `UPDATE Notificaciones SET
          fk_id_empresa = $1,
          fk_id_candidato = $2,
          titulo = $3,
          descripcion = $4,
          estado = $5,
          WHERE id_notificacion = $6 RETURNING *`,
        [
          data.fk_id_empresa,
          data.fk_id_candidato,
          data.titulo,
          data.descripcion,
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
