import { pool } from '../database/db.js'

export class Anuncio {
  static async getAnuncios () {
    try {
      const { rows } = await pool.query('SELECT * FROM Anuncios')
      return rows
    } catch (e) {
      throw new Error('Internal error' + e.message)
    }
  }

  static async getAnuncio ({ id }) {
    try {
      const { rows } = await pool.query(
        'SELECT * FROM Anuncios WHERE id_anuncio =$1',
        [id]
      )
      return rows[0]
    } catch (e) {
      throw new Error(' Internal error ')
    }
  }

  static async postAnuncio ({ data }) {
    try {
      const { rows } = await pool.query(
        `INSERT INTO Anuncios(
        fk_id_empresa,
        fk_id_ubicacion,
        fk_id_area,
        fk_id_categoria_estudio,
        titulo,
        descripcion,
        funciones,
        requisitos,
        habilidades,
        requerimientos,
        beneficios,
        direccion,
        fecha_entrevista,
        tipo_contrato,
        modalidad,
        jornada_laboral,
        horario_trabajo,
        cantidad_vacantes,
        salario_minimo,
        edad_minima,
        edad_maxima,
        experiencia_anios,
        estudio,
        discapacitados) VALUES(
          $1, $2, $3, $4, $5,
          $6, $7, $8, $9, $10,
          $11, $12, $13, $14, $15,
          $16, $17, $18, $19, $20,
          $21, $22, $23, $24) RETURNING *`,
        [
          data.fk_id_empresa,
          data.fk_id_ubicacion,
          data.fk_id_area,
          data.fk_id_categoria_estudio,
          data.titulo,
          data.descripcion,
          data.funciones,
          data.requisitos,
          data.habilidades,
          data.requerimientos,
          data.beneficios,
          data.direccion,
          data.fecha_entrevista,
          data.tipo_contrato,
          data.modalidad,
          data.jornada_laboral,
          data.horario_trabajo,
          data.cantidad_vacantes,
          data.salario_minimo,
          data.edad_minima,
          data.edad_maxima,
          data.experiencia_anios,
          data.estudio,
          data.discapacitados
        ]
      )
      return rows[0]
    } catch (e) {
      throw new Error(' Internal error ' + e.message)
    }
  }

  static async deleteAnuncio ({ id }) {
    try {
      const { rowCount } = await pool.query(
        'DELETE FROM Anuncios WHERE id_anuncio = $1 RETURNING *',
        [id]
      )
      if (rowCount) return true
      return false
    } catch (e) {
      throw new Error(' Internal error ' + e.message)
    }
  }

  static async putAnuncio ({ id }, { data }) {
    try {
      const { rows } = await pool.query(
        `UPDATE Anuncios SET 
        fk_id_empresa = $1,
        fk_id_ubicacion = $2,
        fk_id_area = $3,
        fk_id_categoria_estudio = $4,
        titulo = $5,
        descripcion = $6,
        funciones = $7,
        requisitos = $8,
        habilidades = $9,
        requerimientos = $10,
        beneficios = $11,
        direccion = $12,
        fecha_entrevista = $13,
        tipo_contrato = $14,
        modalidad = $15,
        jornada_laboral = $16,
        horario_trabajo = $17,
        cantidad_vacantes = $18,
        salario_minimo = $19,
        edad_minima = $20,
        edad_maxima = $21,
        experiencia_anios = $22,
        estudio = $23,
        discapacitados = $24
        WHERE id_anuncio = $25 RETURNING *`,
        [
          data.fk_id_empresa,
          data.fk_id_ubicacion,
          data.fk_id_area,
          data.fk_id_categoria_estudio,
          data.titulo,
          data.descripcion,
          data.funciones,
          data.requisitos,
          data.habilidades,
          data.requerimientos,
          data.beneficios,
          data.direccion,
          data.fecha_entrevista,
          data.tipo_contrato,
          data.modalidad,
          data.jornada_laboral,
          data.horario_trabajo,
          data.cantidad_vacantes,
          data.salario_minimo,
          data.edad_minima,
          data.edad_maxima,
          data.experiencia_anios,
          data.estudio,
          data.discapacitados,
          id
        ]
      )
      return rows[0]
    } catch (e) {
      throw new Error(' Internal error ' + e.message)
    }
  }
}
