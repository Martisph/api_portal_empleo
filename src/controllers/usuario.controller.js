import { Usuario } from '../models/usuario.js'
import { validateUsuario, validateEmailUsuario } from '../schemas/usuario.js'

export const getUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.getUsuarios()
    return res.status(200).json(usuarios)
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}

export const getUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.getUsuario(req.params)
    if (!usuario) {
      return res.status(404).json({ message: ' Usuario no encontrado ' })
    }
    return res.status(200).json(usuario)
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}

export const postUsuario = async (req, res) => {
  try {
    const data = validateUsuario(req.body)
    const email = await Usuario.existsEmail(validateEmailUsuario(req.body))
    if (email) return res.status(400).json({ message: ' Email ya existe ' })
    const usuario = await Usuario.postUsuario(data)
    return res.status(200).json(usuario)
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}

export const deleteUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.deleteUsuario(req.params)
    if (usuario) {
      return res.status(200).json({ message: ' Usuario eliminado ' })
    }
    return res.status(404).json({ message: ' Usuario no eliminado ' })
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}

export const putUsuario = async (req, res) => {
  try {
    const data = validateUsuario(req.body)
    const usuario = await Usuario.putUsuario(req.params, data)
    return res.json(usuario)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}
