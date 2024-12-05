import { pool } from '../database/db.js'

export class PostulacionQuery {
  static async postulacionQuery (data) {
    try {
      const {
        idioma,
        edadMin,
        edadMax,
        categoria,
        ubicacion,
        estudios,
        experiencia,
        aniosExperiencia,
        genero,
        id
      } = data

      let query = `
          WITH Candidato_Info AS (
            SELECT
              post.id_postulacion,
              post.fk_id_empresa AS id_empresa,
              post.estado,
              are.nombre AS categoria,
              usu.nombre AS nomUsuario,
              cand.id_candidato,
              cand.apellido,
              cand.genero,
              DATE_PART('year', AGE(cand.fecha_nacimiento)) AS edad,
              CONCAT( ubic.nombre, ', ', dep.nombre) AS ubicacion,
              STRING_AGG(DISTINCT idiom.nombre || ' (' || idiom.nivel || ')', ', ') AS idiomas,
              STRING_AGG(DISTINCT exp.titulo || ' (' || exp.estado || ')', ' ') AS experiencias,
              STRING_AGG(DISTINCT est.titulo || ' en ' || COALESCE(cat_est.nombre, 'Sin Categoría'), ' ') AS estudios,
              SUM(COALESCE(
              DATE_PART('year', COALESCE(exp.fecha_fin, CURRENT_DATE)) - DATE_PART('year', exp.fecha_inicio),
                0
              )) AS total_experiencia
            FROM 
              Candidatos cand 
            LEFT JOIN Usuarios usu ON cand.fk_id_usuario = usu.id_usuario
            LEFT JOIN Postulaciones post ON post.fk_id_candidato = cand.id_candidato
            LEFT JOIN Ubicaciones ubic ON usu.fk_id_ubicacion = ubic.id_ubicacion
            LEFT JOIN Departamentos dep ON ubic.fk_id_departamento = dep.id_departamento
            LEFT JOIN Areas are ON cand.fk_id_area = are.id_area
            LEFT JOIN Idiomas idiom ON cand.id_candidato = idiom.fk_id_candidato
            LEFT JOIN Experiencias exp ON cand.id_candidato = exp.fk_id_candidato
            LEFT JOIN Estudios est ON cand.id_candidato = est.fk_id_candidato
            LEFT JOIN Categoria_Estudios cat_est ON est.fk_id_categoria_estudio = cat_est.id_categoria_estudio
            GROUP BY post.id_postulacion, cand.id_candidato, cand.apellido,
            cand.fecha_nacimiento, ubic.nombre, are.nombre, dep.nombre, nomUsuario
          )
          SELECT total_experiencia,
            estudios, experiencias, idiomas, ubicacion, edad, genero, apellido,
            id_candidato, nomUsuario, categoria, estado, id_postulacion
          FROM Candidato_Info cand
          LEFT JOIN Empresas emp ON cand.id_empresa = emp.id_empresa
          WHERE 1=1 
        `

      const params = []
      // Filtros dinámicos
      if (idioma) {
        query += ` AND regexp_replace(
                            unaccent(lower(idiomas)), 
                            '[^a-z0-9 ]', '', 'g'
                        ) ILIKE $${params.length + 1}`
        params.push(
          `%${idioma
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9 ]/gi, '')
            .toLowerCase()}%`
        )
      }

      if (edadMin) {
        query += ` AND edad >= $${params.length + 1}`
        params.push(parseInt(edadMin))
      }

      if (edadMax) {
        query += ` AND edad <= $${params.length + 1}`
        params.push(parseInt(edadMax))
      }

      if (experiencia) {
        query += ` AND regexp_replace(
                    unaccent(lower(experiencias)), 
                    '[^a-z0-9 ]', '', 'g'
                  ) ILIKE $${params.length + 1}`
        params.push(
          `%${experiencia
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9 ]/gi, '')
            .toLowerCase()}%`
        )
      }

      if (aniosExperiencia) {
        query += ` AND total_experiencia >= $${params.length + 1}`
        params.push(parseInt(aniosExperiencia))
      }

      if (estudios) {
        query += ` AND regexp_replace(
                    unaccent(lower(estudios)), 
                    '[^a-z0-9 ]', '', 'g'
                  ) ILIKE $${params.length + 1}`
        params.push(
          `%${estudios
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9 ]/gi, '')
            .toLowerCase()}%`
        )
      }

      if (genero) {
        query += ` AND genero = $${params.length + 1}`
        params.push(genero.toLowerCase())
      }

      if (categoria) {
        query += ` AND translate(
                regexp_replace(
                  unaccent(lower(categoria)), 
                  '[^a-z0-9 ]', '', 'g'
                ), 
                'áéíóúüñ', 
                'aeiouun'
              ) ILIKE $${params.length + 1}`
        params.push(
          `%${categoria
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9 ]/gi, '')
            .toLowerCase()}%`
        )
      }

      if (ubicacion) {
        query += ` AND regexp_replace(
                    unaccent(lower(ubicacion)), 
                    '[^a-z0-9 ]', '', 'g'
                  ) ILIKE $${params.length + 1}`
        params.push(
          `%${ubicacion
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9 ]/gi, '')
            .toLowerCase()}%`
        )
      }
      if (id) {
        query += ` AND emp.fk_id_usuario = $${params.length + 1}`
        params.push(id)
      }

      const { rows } = await pool.query(query, params)
      return rows
    } catch (e) {
      throw new Error(' Internal error ' + e.message)
    }
  }
}
