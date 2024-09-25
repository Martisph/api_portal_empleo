import { pool } from '../database/db.js'

export class Candidato {
  static async getCandidatos () {
    try {
      const { rows } = await pool.query('SELECT * FROM Candidatos')
      return rows
    } catch (e) {
      throw new Error(' Internal error ' + e)
    }
  }

  static async getCandidato ({ id }) {
    try {
      const { rows } = await pool.query(
        'SELECT * FROM Candidatos WHERE id_candidato =$1',
        [id]
      )
      return rows[0]
    } catch (e) {
      throw new Error(' Internal error ' + e)
    }
  }

  static async postCandidato ({ data }) {
    try {
      const { rows } = await pool.query(
        `INSERT INTO Candidatos
              (fk_id_usuario, fk_id_area, apellido, genero, estado_civil, fecha_nacimiento, direccion, telefono, linkedin)
              VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
        [
          data.fk_id_usuario,
          data.fk_id_area,
          data.apellido,
          data.genero,
          data.estado_civil,
          data.fecha_nacimiento,
          data.direccion,
          data.telefono,
          data.linkedin
        ]
      )
      return rows[0]
    } catch (e) {
      throw new Error(' Interna error ' + e)
    }
  }

  static async deleteCandidato ({ id }) {
    try {
      const { rowCount } = await pool.query(
        'DELETE FROM Candidatos  WHERE id_candidato = $1 RETURNING *',
        [id]
      )
      if (rowCount) return true
      return false
    } catch (e) {
      throw new Error(' Internal error ' + e)
    }
  }

  static async putCandidato ({ id }, { data }) {
    try {
      const { rows } = await pool.query(
        `UPDATE Candidatos SET
              fk_id_usuario = $1,
              fk_id_area = $2,
              apellido = $3,
              genero = $4,
              estado_civil = $5,
              fecha_nacimiento = $6,
              direccion = $7,
              telefono = $8,
              linkedin = $9
              WHERE id_candidato = $10 RETURNING *`,
        [
          data.fk_id_usuario,
          data.fk_id_area,
          data.apellido,
          data.genero,
          data.estado_civil,
          data.fecha_nacimiento,
          data.direccion,
          data.telefono,
          data.linkedin,
          id
        ]
      )
      return rows[0]
    } catch (e) {
      throw new Error(' Internal error' + e)
    }
  }
}
