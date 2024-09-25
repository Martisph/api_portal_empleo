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
              (id_candidato, fk_id_usuario, fk_id_area, apellido, genero, estado_civil, fecha_nacimiento, direccion, telefono, linkedin)
              VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
        [
          data.id_candidato,
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
              id_candidato = $1, 
              fk_id_usuario = $2, 
              fk_id_area = $3, 
              apellido = $4, 
              genero = $5, 
              estado_civil = $6,
              fecha_nacimiento = $7, 
              direccion = $8,
              telefono = $9, 
              linkedin = $10 
              WHERE id_candidato = $11 RETURNING *`,
        [
          data.id_candidato,
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
