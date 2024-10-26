import { Usuario } from '../models/usuario.js'
import { Candidato } from '../models/candidato.js'
import { pool } from '../database/db.js'
import { validateUsuario, validateEmailUsuario } from '../schemas/usuario.js'
import { validateCandidato } from '../schemas/candidato.js'

export const postUsuario = async (req, res) => {
  try {
    console.log(req.body)
    const dataUsuario = validateUsuario(req.body)
    const dataCandidato = validateCandidato(req.body)
    if (dataUsuario.success && dataCandidato.success) {
      console.log(dataUsuario)
      const email = await Usuario.existsEmail(validateEmailUsuario(req.body))
      if (email) return res.status(401).json({ error: ' Email ya existe ' })
    } else {
      return res.status(400).json({ error: ' Ingreso de datos erroneos ' })
    }
    console.log('pasando los filtros de registro de usuario')
    await pool.query('BEGIN')
    const usuario = await Usuario.postUsuario(dataUsuario)
    const candidato = await Candidato.postCandidato(usuario, dataCandidato)

    await pool.query('COMMIT')
    return res.status(200).json({ ...usuario, ...candidato })
  } catch (e) {
    await pool.query('ROLLBACK')
    return res.status(500).json({ error: e.message })
  }
}

export const deleteUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.deleteUsuario(req.params)
    if (usuario) {
      return res.status(200).json({ message: ' Usuario eliminado ' })
    }
    return res.status(404).json({ error: ' Usuario no eliminado ' })
  } catch (e) {
    return res.status(500).json({ error: e.message })
  }
}

export const putUsuario = async (req, res) => {
  try {
    const data = validateUsuario(req.body)
    const usuario = await Usuario.putUsuario(req.params, data)
    return res.json(usuario)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
}
