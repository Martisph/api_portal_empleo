import { Experiencia } from '../models/experiencia.js'
import { validateExperiencia } from '../schemas/experiencia.js'

export const getExperiencias = async (req, res) => {
  try {
    const experiencias = await Experiencia.getAreas()
    return res.status(200).json(experiencias)
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}

export const getExperiencia = async (req, res) => {
  try {
    const experiencia = await Experiencia.getArea(req.params)
    if (!experiencia) {
      return res.status(404).json({ message: ' Dato no encontrado ' })
    }
    return res.status(200).json(experiencia)
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}

export const postExperiencia = async (req, res) => {
  try {
    const data = validateExperiencia(req.body)
    const experiencia = await Experiencia.postArea(data)
    return res.status(200).json(experiencia)
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}

export const deleteExperiencia = async (req, res) => {
  try {
    const experiencia = await Experiencia.deleteArea(req.params)
    if (experiencia) {
      return res.status(200).json({ message: 'Categoria de Experiencia eliminado' })
    }
    return res.status(404).json({ message: 'Categoria de Experiencia no encontrado' })
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}

export const putExperiencia = async (req, res) => {
  try {
    const data = validateExperiencia(req.body)
    const experiencia = await Experiencia.putArea(req.params, data)
    return res.json(experiencia)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}
