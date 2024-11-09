import { Postulacion } from '../models/postulacion.js'
import { validatePostulacion } from '../schemas/postulacion.js'

export const getPostulaciones = async (req, res) => {
  try {
    const postulaciones = await Postulacion.getPostulaciones()
    return res.status(200).json(postulaciones)
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}

export const getPostulacionByEmpresa = async (req, res) => {
  try {
    const postulacion = await Postulacion.getPostulacionByEmpresa(req.params)
    if (!postulacion) {
      return res.status(404).json({ message: ' Dato no encontrado ' })
    }
    return res.status(200).json(postulacion)
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}

export const getPostulacionByCandidato = async (req, res) => {
  try {
    const postulacion = await Postulacion.getPostulacionByCandidato(req.params)
    if (!postulacion) {
      return res.status(404).json({ message: ' Dato no encontrado ' })
    }
    return res.status(200).json(postulacion)
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}

export const getPostulacion = async (req, res) => {
  try {
    const postulacion = await Postulacion.getPostulacion(req.params)
    if (!postulacion) {
      return res.status(404).json({ message: ' Dato no encontrado ' })
    }
    return res.status(200).json(postulacion)
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}

export const postPostulacion = async (req, res) => {
  try {
    const data = validatePostulacion(req.body)
    const postulacion = await Postulacion.postPostulacion(data)
    return res.status(200).json(postulacion)
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}

export const deletePostulacion = async (req, res) => {
  try {
    const postulacion = await Postulacion.deletePostulacion(req.params)
    if (postulacion) {
      return res.status(200).json({ message: ' Dato de postulacion eliminado ' })
    }
    return res.status(404).json({ message: ' Dato de postulacion no eliminado ' })
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}

export const putPostulacion = async (req, res) => {
  try {
    const data = validatePostulacion(req.body)
    const postulacion = await Postulacion.putPostulacion(req.params, data)
    return res.json(postulacion)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}
