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

  static async getPostulacionByEmpresa ({ id }) {
    try {
      const { rows } = await pool.query(
        `SELECT cand.apellido, anun.titulo, post.estado, 
          post.fecha_creacion AS fecha
          FROM Postulaciones post
          JOIN Candidatos cand ON post.fk_id_candidato = cand.id_candidato
          JOIN Empresas emp ON post.fk_id_empresa = emp.id_empresa
          JOIN Anuncios anun ON post.fk_id_anuncio = anun.id_anuncio
          WHERE emp.fk_id_usuario = $1 ORDER BY post.fecha_creacion DESC LIMIT 10`,
        [id]
      )
      return rows
    } catch (e) {
      throw new Error(' Internal error ' + e.message)
    }
  }

  static async getPostulacionByEmpresaAll ({ id }) {
    try {
      const { rows } = await pool.query(
        `SELECT emp.razon_social AS empresa, anun.titulo, 
          anun.descripcion, post.fecha_creacion AS fecha,
          FROM Postulaciones post 
          JOIN Candidatos cand ON post.fk_id_candidato = cand.id_candidato
          JOIN Empresas emp ON post.fk_id_empresa = emp.id_empresa
          JOIN Anuncios anun ON post.fk_id_anuncio = anun.id_anuncio
          WHERE cand.fk_id_usuario = $1 ORDER BY post.fecha_creacion DESC`,
        [id]
      )
      return rows
    } catch (e) {
      throw new Error(' Internal error ' + e.message)
    }
  }

  static async getPostulacionByCandidato ({ id }) {
    try {
      const { rows } = await pool.query(
        `SELECT emp.razon_social AS empresa, anun.titulo, 
          anun.descripcion, post.fecha_creacion AS fecha
          FROM Postulaciones post 
          JOIN Candidatos cand ON post.fk_id_candidato = cand.id_candidato
          JOIN Empresas emp ON post.fk_id_empresa = emp.id_empresa
          JOIN Anuncios anun ON post.fk_id_anuncio = anun.id_anuncio
          WHERE cand.fk_id_usuario = $1 ORDER BY post.fecha_creacion DESC`,
        [id]
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
