import { Estudio } from '../models/estudio.js'
import { validateEstudio } from '../schemas/estudio.js'

export const getEstudios = async (req, res) => {
  try {
    const estudios = await Estudio.getEstudios()
    return res.status(200).json(estudios)
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}

export const getEstudioAllById = async (req, res) => {
  try {
    const estudio = await Estudio.getEstudioAllById(req.params)
    if (!estudio) {
      return res.status(404).json({ message: ' Estudio no encontrado ' })
    }
    return res.status(200).json(estudio)
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}

export const getEstudio = async (req, res) => {
  try {
    const estudio = await Estudio.getEstudio(req.params)
    if (!estudio) {
      return res.status(404).json({ message: ' Estudio no encontrado ' })
    }
    return res.status(200).json(estudio)
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}

export const postEstudio = async (req, res) => {
  try {
    const data = validateEstudio(req.body)
    const estudio = await Estudio.postEstudio(data)
    return res.status(200).json(estudio)
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}

export const deleteEstudio = async (req, res) => {
  try {
    const estudio = await Estudio.deleteEstudio(req.params)
    if (estudio) {
      return res.status(200).json({ message: ' Estudio eliminado ' })
    }
    return res.status(404).json({ message: ' Estudio no eliminado ' })
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}

export const putEstudio = async (req, res) => {
  try {
    const data = validateEstudio(req.body)
    const estudio = await Estudio.putEstudio(req.params, data)
    return res.json(estudio)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}
