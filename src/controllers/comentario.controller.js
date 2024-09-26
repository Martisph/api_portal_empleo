import { Comentario } from '../models/comentario.js'
import { validateComentario } from '../schemas/comentario.js'

export const getComentarios = async (req, res) => {
  try {
    const comentarios = await Comentario.getAreas()
    return res.status(200).json(comentarios)
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}

export const getComentario = async (req, res) => {
  try {
    const comentario = await Comentario.getArea(req.params)
    if (!comentario) {
      return res.status(404).json({ message: ' Dato no encontrado ' })
    }
    return res.status(200).json(comentario)
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}

export const postComentario = async (req, res) => {
  try {
    const data = validateComentario(req.body)
    const comentario = await Comentario.postArea(data)
    return res.status(200).json(comentario)
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}

export const deleteComentario = async (req, res) => {
  try {
    const comentario = await Comentario.deleteArea(req.params)
    if (comentario) {
      return res.status(200).json({ message: 'Categoria de estudio eliminado' })
    }
    return res.status(404).json({ message: 'Categoria de estudio no encontrado' })
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}

export const putComentario = async (req, res) => {
  try {
    const data = validateComentario(req.body)
    const comentario = await Comentario.putArea(req.params, data)
    return res.json(comentario)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}
