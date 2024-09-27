import { Comentario } from '../models/comentario.js'
import { validateComentario } from '../schemas/comentario.js'

export const getComentarios = async (req, res) => {
  try {
    const comentarios = await Comentario.getComentarios()
    return res.status(200).json(comentarios)
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}

export const getComentario = async (req, res) => {
  try {
    const comentario = await Comentario.getComentario(req.params)
    if (!comentario) {
      return res.status(404).json({ message: ' Comentario no encontrado ' })
    }
    return res.status(200).json(comentario)
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}

export const postComentario = async (req, res) => {
  try {
    const data = validateComentario(req.body)
    const comentario = await Comentario.postComentario(data)
    return res.status(200).json(comentario)
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}

export const deleteComentario = async (req, res) => {
  try {
    const comentario = await Comentario.deleteComentario(req.params)
    if (comentario) {
      return res.status(200).json({ message: ' Comentario eliminado ' })
    }
    return res.status(404).json({ message: ' Comentario no eliminado ' })
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}

export const putComentario = async (req, res) => {
  try {
    const data = validateComentario(req.body)
    const comentario = await Comentario.putComentario(req.params, data)
    return res.json(comentario)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}
