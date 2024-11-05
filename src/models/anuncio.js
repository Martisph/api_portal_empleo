import { pool } from '../database/db.js'

function cleanParams (id) {
  const clean = id
    .split('empleos-de-')
    .join('')
    .split('empleos-en-')
    .join('')
    .split('-en-')
    .join('.')
    .split('-')
    .join(' ')
  const ruta = clean.split('.')
  const ubicacion = ruta.length === 2 ? ruta[1] : id.startsWith('empleos-en-') ? ruta[0] : ''
  const area =
    ruta.length === 2
      ? ruta[0]
      : id.startsWith('empleos-de-')
        ? ruta[0].split('-').join(' ')
        : ''
  return { area, ubicacion }
}

export class Anuncio {
  static async getAllAnuncios () {
    try {
      const { rows } = await pool.query(
        `SELECT anun.id_anuncio, emp.nombre AS empresa, ubic.nombre AS ubicacion,
          are.nombre AS area, anun.titulo, anun.descripcion,
          anun.direccion, anun.discapacitados
          FROM Anuncios anun 
        JOIN Empresas emp ON anun.fk_id_empresa = emp.id_empresa
        JOIN Ubicaciones ubic ON anun.fk_id_ubicacion = ubic.id_ubicacion
        JOIN Areas are ON anun.fk_id_area = are.id_area ORDER BY anun.fecha_creacion DESC LIMIT 5 OFFSET 5`
      )
      return rows
    } catch (e) {
      throw new Error('Internal error' + e.message)
    }
  }

  static async getAnuncioByParams ({ params }) {
    const { area, ubicacion } = cleanParams(params)

    let baseQuery = `SELECT anun.id_anuncio, emp.nombre AS empresa, ubic.nombre AS ubicacion,
          are.nombre AS area, anun.titulo, anun.descripcion,
          anun.direccion, anun.discapacitados
          FROM Anuncios anun  
        JOIN Empresas emp ON anun.fk_id_empresa = emp.id_empresa
        JOIN Ubicaciones ubic ON anun.fk_id_ubicacion = ubic.id_ubicacion
        JOIN Areas are ON anun.fk_id_area = are.id_area
        WHERE 1=1`

    const queryParams = []

    if (area) {
      baseQuery += ` AND LOWER(are.nombre) = LOWER($${queryParams.length + 1})`
      queryParams.push(area)
    }
    if (ubicacion) {
      baseQuery += ` AND LOWER(ubic.nombre) = LOWER($${queryParams.length + 1})`
      queryParams.push(ubicacion)
    }

    try {
      const { rows } = await pool.query(baseQuery, queryParams)
      return rows
    } catch (e) {
      throw new Error(' Internal error ')
    }
  }

  static async getAnuncioById ({ id }) {
    try {
      const { rows } = await pool.query(
        `SELECT emp.nombre AS empresa, ubic.nombre AS ubicacion, are.nombre AS area,
          anun.fk_id_categoria_estudio, anun.titulo, anun.descripcion,
          anun.funciones, anun.requisitos, anun.habilidades,
          anun.requerimientos, anun.beneficios, anun.direccion,
          anun.fecha_entrevista, anun.tipo_contrato, anun.modalidad,
          anun.jornada_laboral, anun.horario_trabajo, anun.cantidad_vacantes,
          anun.salario_minimo, anun.edad_minima, anun.edad_maxima, 
          anun.experiencia_anios, anun.estudio, anun.discapacitados 
          FROM Anuncios anun 
        JOIN Empresas emp ON anun.fk_id_empresa = emp.id_empresa
        JOIN Ubicaciones ubic ON anun.fk_id_ubicacion = ubic.id_ubicacion
        JOIN Areas are ON anun.fk_id_area = are.id_area
        WHERE anun.id_anuncio =$1`,
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
