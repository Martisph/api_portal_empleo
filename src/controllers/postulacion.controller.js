import { Postulacion } from '../models/postulacion.js'
import { validatePostulacion } from '../schemas/postulacion.js'

export const getPostulaciones = async (req, res) => {
  try {
    const postulaciones = await Postulacion.getAreas()
    return res.status(200).json(postulaciones)
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}

export const getPostulacion = async (req, res) => {
  try {
    const postulacion = await Postulacion.getArea(req.params)
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
    const postulacion = await Postulacion.postArea(data)
    return res.status(200).json(postulacion)
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}

export const deletePostulacion = async (req, res) => {
  try {
    const postulacion = await Postulacion.deleteArea(req.params)
    if (postulacion) {
      return res.status(200).json({ message: 'Categoria de Postulacion eliminado' })
    }
    return res.status(404).json({ message: 'Categoria de Postulacion no encontrado' })
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}

export const putPostulacion = async (req, res) => {
  try {
    const data = validatePostulacion(req.body)
    const postulacion = await Postulacion.putArea(req.params, data)
    return res.json(postulacion)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}
