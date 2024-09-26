import { Estudio } from '../models/estudio.js'
import { validateEstudio } from '../schemas/estudio.js'

export const getEstudios = async (req, res) => {
  try {
    const estudios = await Estudio.getAreas()
    return res.status(200).json(estudios)
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}

export const getEstudio = async (req, res) => {
  try {
    const estudio = await Estudio.getArea(req.params)
    if (!estudio) {
      return res.status(404).json({ message: ' Dato no encontrado ' })
    }
    return res.status(200).json(estudio)
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}

export const postEstudio = async (req, res) => {
  try {
    const data = validateEstudio(req.body)
    const estudio = await Estudio.postArea(data)
    return res.status(200).json(estudio)
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}

export const deleteEstudio = async (req, res) => {
  try {
    const estudio = await Estudio.deleteArea(req.params)
    if (estudio) {
      return res.status(200).json({ message: 'Categoria de estudio eliminado' })
    }
    return res.status(404).json({ message: 'Categoria de estudio no encontrado' })
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}

export const putEstudio = async (req, res) => {
  try {
    const data = validateEstudio(req.body)
    const estudio = await Estudio.putArea(req.params, data)
    return res.json(estudio)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}
