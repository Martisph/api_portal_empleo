import { pool } from '../database/db.js'

export class Experiencia {
  static async getExperiencias () {
    try {
      const { rows } = await pool.query('SELECT * FROM Experiencias')
      return rows
    } catch (e) {
      throw new Error(' Internal error' + e.message)
    }
  }

  static async getExperienciaAllById ({ id }) {
    try {
      const { rows } = await pool.query(
        `SELECT exp.id_experiencia, exp.titulo, exp.descripcion,
          exp.fecha_inicio AS inicio, exp.fecha_fin AS fin, exp.estado
        FROM Experiencias exp
        JOIN Candidatos cand ON exp.fk_id_candidato = cand.id_candidato
        WHERE cand.fk_id_usuario =$1`,
        [id]
      )
      return rows
    } catch (e) {
      throw new Error(' Internal error' + e.message)
    }
  }

  static async getExperiencia ({ id }) {
    try {
      const { rows } = await pool.query(
        'SELECT * FROM Experiencias WHERE id_experiencia =$1',
        [id]
      )
      return rows[0]
    } catch (e) {
      throw new Error(' Internal error' + e.message)
    }
  }

  static async postExperiencia ({ data }) {
    try {
      const { rows } = await pool.query(
        `INSERT INTO Experiencias
            (fk_id_candidato, titulo, descripcion, fecha_inicio, fecha_fin, estado)
            VALUES($1, $2, $3, $4, $5, $6) RETURNING *`,
        [
          data.fk_id_candidato,
          data.titulo,
          data.descripcion,
          data.fecha_inicio,
          data.fecha_fin,
          data.estado
        ]
      )
      return rows[0]
    } catch (e) {
      throw new Error(' Internal error' + e.message)
    }
  }

  static async deleteExperiencia ({ id }) {
    try {
      const { rowCount } = await pool.query(
        'DELETE FROM Experiencias WHERE id_experiencia = $1 RETURNING *',
        [id]
      )
      if (rowCount) return true
      return false
    } catch (e) {
      throw new Error(' Internal error' + e.message)
    }
  }

  static async putExperiencia ({ id }, { data }) {
    try {
      const { rows } = await pool.query(
        `UPDATE Experiencias SET
            fk_id_candidato = $1,
            titulo = $2,
            descripcion = $3,
            fecha_inicio = $4,
            fecha_fin = $5,
            estado = $6
            WHERE id_experiencia = $7 RETURNING *`,
        [
          data.fk_id_candidato,
          data.titulo,
          data.descripcion,
          data.fecha_inicio,
          data.fecha_fin,
          data.estado,
          id
        ]
      )
      return rows[0]
    } catch (e) {
      throw new Error(' Internal error' + e.message)
    }
  }
}
