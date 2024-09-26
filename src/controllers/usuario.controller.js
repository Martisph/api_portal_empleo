import { Usuario } from '../models/usuario.js'
import { validateUsuario } from '../schemas/usuario.js'

export const getUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.getAreas()
    return res.status(200).json(usuarios)
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}

export const getUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.getArea(req.params)
    if (!usuario) {
      return res.status(404).json({ message: ' Dato no encontrado ' })
    }
    return res.status(200).json(usuario)
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}

export const postUsuario = async (req, res) => {
  try {
    const data = validateUsuario(req.body)
    const usuario = await Usuario.postArea(data)
    return res.status(200).json(usuario)
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}

export const deleteUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.deleteArea(req.params)
    if (usuario) {
      return res.status(200).json({ message: 'Categoria de Usuario eliminado' })
    }
    return res.status(404).json({ message: 'Categoria de Usuario no encontrado' })
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}

export const putUsuario = async (req, res) => {
  try {
    const data = validateUsuario(req.body)
    const usuario = await Usuario.putArea(req.params, data)
    return res.json(usuario)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}
