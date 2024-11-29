/* eslint-disable camelcase */
import { pool } from '../database/db.js'

export class Empresa {
  static async getEmpresas () {
    try {
      const { rows } = await pool.query(
        'SELECT * FROM Empresas'
      )
      return rows
    } catch (e) {
      throw new Error(' Internal error ' + e.message)
    }
  }

  static async getEmpresaBasicInfo ({ id }) {
    try {
      const { rows } = await pool.query(
        `SELECT id_empresa, nombre, razon_social, ruc, telefono, email
        FROM Empresas
        WHERE fk_id_usuario = $1`,
        [id]
      )
      return rows[0]
    } catch (e) {
      throw new Error(' Internal error ' + e.message)
    }
  }

  static async getEmpresa ({ id }) {
    try {
      const { rows } = await pool.query(
        `SELECT e.fk_id_usuario, e.nombre, e.razon_social, e.descripcion, e.ruc,
          e.vision, e.mision, e.valores, e.sector, e.direccion, e.telefono, e.email
          FROM Empresas e 
          JOIN Usuarios u ON e.fk_id_usuario = u.id_usuario 
        WHERE fk_id_usuario = $1`,
        [id]
      )
      return rows[0]
    } catch (e) {
      throw new Error(' Internal error ' + e.message)
    }
  }

  static async postEmpresa ({ id_usuario }, { data }) {
    try {
      const { rows } = await pool.query(
        `INSERT INTO Empresas
        (fk_id_usuario, nombre, razon_social, descripcion, ruc, vision, mision, valores, sector, direccion, telefono, email)
        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *`,
        [
          id_usuario,
          data.nombre,
          data.razon_social,
          data.descripcion,
          data.ruc,
          data.vision,
          data.mision,
          data.valores,
          data.sector,
          data.direccion,
          data.telefono,
          data.email
        ]
      )
      return rows[0]
    } catch (e) {
      throw new Error(' Internal error ' + e.message)
    }
  }

  static async deleteEmpresa ({ id }) {
    try {
      const { rowCount } = await pool.query(
        'DELETE FROM Empresas WHERE id_empresa = $1 RETURNING *',
        [id]
      )
      if (rowCount) return true
      return false
    } catch (e) {
      throw new Error(' Internal error ' + e.message)
    }
  }

  static async putEmpresa ({ id }, { data }) {
    try {
      const keys = Object.keys(data).filter((key) => data[key] !== undefined)

      if (keys.length === 0) {
        throw new Error('No se proporcionaron datos para actualizar')
      }

      const setClause = keys
        .map((key, index) => `${key} = $${index + 1}`)
        .join(', ')
      const values = keys.map((key) => data[key])

      values.push(id)

      const { rows } = await pool.query(
        `UPDATE Empresas SET ${setClause} WHERE id_empresa = $${
          keys.length + 1
        } RETURNING *`,
        values
      )
      return rows[0]
    } catch (e) {
      throw new Error(' Internal error ' + e.message)
    }
  }
}
