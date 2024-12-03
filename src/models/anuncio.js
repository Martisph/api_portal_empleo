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
  static async getAllAnuncios ({ id }) {
    try {
      const { rows } = await pool.query(
        `SELECT anun.id_anuncio, ubic.nombre AS ubicacion, anun.discapacitados,
          are.nombre AS area, anun.titulo, anun.descripcion, anun.beneficios,
          anun.direccion, anun.fecha_actualizacion AS fecha, anun.estado
          FROM Anuncios anun 
        JOIN Empresas emp ON anun.fk_id_empresa = emp.id_empresa
        JOIN Ubicaciones ubic ON anun.fk_id_ubicacion = ubic.id_ubicacion
        JOIN Areas are ON anun.fk_id_area = are.id_area 
        WHERE emp.fk_id_usuario = $1 ORDER BY anun.fecha_actualizacion DESC LIMIT 5 OFFSET 0`,
        [id]
      )
      return rows
    } catch (e) {
      throw new Error('Internal error' + e.message)
    }
  }

  static async getAnuncioByParams ({ params }) {
    const { area, ubicacion } = cleanParams(params)

    let baseQuery = `SELECT emp.nombre AS empresa, are.nombre AS area, 
          ubic.nombre AS ubicacion, anun.id_anuncio, anun.direccion, anun.titulo, anun.descripcion,
          anun.estudio, anun.experiencia_anios AS experiencia, anun.horario_trabajo AS horario,
          anun.salario_minimo AS salario, anun.discapacitados, anun.fecha_actualizacion AS fecha
          FROM Anuncios anun  
        JOIN Empresas emp ON anun.fk_id_empresa = emp.id_empresa
        JOIN Ubicaciones ubic ON anun.fk_id_ubicacion = ubic.id_ubicacion
        JOIN Areas are ON anun.fk_id_area = are.id_area
        WHERE 1=1 AND anun.estado = true`

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
      baseQuery += ' ORDER BY anun.fecha_actualizacion DESC'
      const { rows } = await pool.query(
        baseQuery,
        queryParams
      )
      return rows
    } catch (e) {
      throw new Error(' Internal error ')
    }
  }

  static async getAnuncioByIdDash ({ id }) {
    try {
      const { rows } = await pool.query(
        `SELECT anun.id_anuncio,
          are.nombre AS area, anun.titulo, anun.descripcion, anun.modalidad,
          anun.cantidad_vacantes, anun.direccion, anun.fecha_actualizacion AS fecha
          FROM Anuncios anun 
        JOIN Empresas emp ON anun.fk_id_empresa = emp.id_empresa
        JOIN Areas are ON anun.fk_id_area = are.id_area 
        WHERE emp.fk_id_usuario = $1 ORDER BY anun.fecha_actualizacion DESC LIMIT 5 OFFSET 0`,
        [id]
      )
      return rows
    } catch (e) {
      throw new Error(' Internal error ')
    }
  }

  static async getAnuncioById ({ id }) {
    try {
      const { rows } = await pool.query(
        `SELECT emp.id_empresa AS empresa_id, emp.nombre AS empresa, ubic.nombre AS ubicacion, are.nombre AS area,
          cat_est.nombre AS estudios, anun.id_anuncio, anun.titulo, anun.descripcion,
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
        JOIN Categoria_Estudios cat_est ON cat_est.id_categoria_estudio = anun.fk_id_categoria_estudio
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
        `UPDATE Anuncios SET ${setClause} WHERE id_anuncio = $${
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
