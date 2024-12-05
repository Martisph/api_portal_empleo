/* eslint-disable camelcase */
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
        `SELECT
         u.id_usuario AS usuario, u.fk_id_ubicacion, u.nombre, u.email, c.id_candidato AS candidato,
         c.apellido, c.genero, c.estado_civil, c.fecha_nacimiento, c.direccion, c.telefono, c.linkedin
         FROM Candidatos c JOIN Usuarios u ON c.fk_id_usuario = u.id_usuario
         WHERE c.fk_id_usuario = $1`,
        [id]
      )
      return rows[0]
    } catch (e) {
      throw new Error(' Internal error ' + e)
    }
  }

  static async getCandidatoById ({ id }) {
    try {
      const { rows } = await pool.query(
        `WITH Candidato_cv AS(
          SELECT us.email, us.nombre, cand.id_candidato, cand.apellido, cand.genero,
            cand.estado_civil, cand.fecha_nacimiento,
            cand.direccion, cand.telefono, cand.linkedin, CONCAT( ubic.nombre, ', ', dep.nombre) AS ubicacion,
            DATE_PART('year', AGE(cand.fecha_nacimiento)) AS edad,
            STRING_AGG(idi.nombre || ' \n ' || idi.nivel, ',') AS idiomas,
            STRING_AGG(est.titulo || ' \n ' || est.descripcion || ' \n ' || est.estado, ',') AS estudios,
            STRING_AGG(ex.titulo || ' \n '|| ex.descripcion || ' \n '|| ex.estado || ' \n '|| ex.fecha_inicio || ' \n '|| ex.fecha_fin, ',') AS experiencias
          FROM Candidatos cand 
          INNER JOIN Usuarios us ON cand.fk_id_usuario = us.id_usuario
          INNER JOIN Ubicaciones ubic ON us.fk_id_ubicacion = ubic.id_ubicacion
          INNER JOIN Departamentos dep ON ubic.fk_id_departamento = dep.id_departamento
          LEFT JOIN Idiomas idi ON idi.fk_id_candidato = cand.id_candidato
          LEFT JOIN Estudios est ON est.fk_id_candidato = cand.id_candidato
          LEFT JOIN Experiencias ex ON ex.fk_id_candidato = cand.id_candidato
          GROUP BY cand.id_candidato, us.id_usuario, ubic.nombre, dep.nombre
          )
          SELECT * FROM Candidato_cv
          WHERE id_candidato = $1`,
        [id]
      )
      return rows[0]
    } catch (e) {
      throw new Error(' Internal error ' + e)
    }
  }

  static async postCandidato ({ id_usuario }, { data }) {
    try {
      const { rows } = await pool.query(
        `INSERT INTO Candidatos
              (fk_id_usuario, fk_id_area, apellido, genero, estado_civil, fecha_nacimiento, direccion, telefono, linkedin)
              VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
        [
          id_usuario,
          data.area,
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
          fk_id_area = $1,
          apellido = $2,
          genero = $3,
          estado_civil = $4,
          fecha_nacimiento = $5,
          direccion = $6,
          telefono = $7,
          linkedin = $8
          WHERE id_candidato = $9 RETURNING *`,
        [
          data.area,
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
