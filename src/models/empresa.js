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

  static async getEmpresa ({ id }) {
    try {
      const { rows } = await pool.query(
        'SELECT * FROM Empresas e JOIN Usuarios u ON e.fk_id_usuario = u.id_usuario WHERE id_empresa = $1',
        [id]
      )
      return rows[0]
    } catch (e) {
      throw new Error(' Internal error ' + e.message)
    }
  }

  static async postEmpresa ({ data }) {
    try {
      const { rows } = await pool.query(
        `INSERT INTO Empresas
        (fk_id_usuario, nombre, razon_social, descripcion, ruc, vision, mision, valores, sector, direccion, telefono, email)
        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *`,
        [
          data.fk_id_usuario,
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
      const { rows } = await pool.query(
        `UPDATE Empresas SET 
          nombre = $1,
          razon_social = $2,
          descripcion = $3,
          ruc = $4,
          vision = $5,
          mision = $6,
          valores = $7,
          sector = $8,
          direccion = $9,
          telefono = $10,
          email = $11
        WHERE id_empresa = $12 RETURNING *`,
        [
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
          data.email,
          id
        ]
      )
      return rows[0]
    } catch (e) {
      throw new Error(' Internal error ' + e.message)
    }
  }
}
