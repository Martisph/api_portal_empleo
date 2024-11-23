import { Experiencia } from '../models/experiencia.js'
import { validateExperiencia } from '../schemas/experiencia.js'

export const getExperiencias = async (req, res) => {
  try {
    const experiencias = await Experiencia.getExperiencias()
    return res.status(200).json(experiencias)
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}

export const getExperienciaAllById = async (req, res) => {
  try {
    const experiencia = await Experiencia.getExperienciaAllById(req.params)
    if (!experiencia) {
      return res.status(404).json({ message: ' Experiencia laboral no encontrado ' })
    }
    return res.status(200).json(experiencia)
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}

export const getExperiencia = async (req, res) => {
  try {
    const experiencia = await Experiencia.getExperiencia(req.params)
    if (!experiencia) {
      return res.status(404).json({ message: ' Experiencia laboral no encontrado ' })
    }
    return res.status(200).json(experiencia)
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}

export const postExperiencia = async (req, res) => {
  try {
    const data = validateExperiencia(req.body)
    const experiencia = await Experiencia.postExperiencia(data)
    return res.status(200).json(experiencia)
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}

export const deleteExperiencia = async (req, res) => {
  try {
    const experiencia = await Experiencia.deleteExperiencia(req.params)
    if (experiencia) {
      return res.status(200).json({ message: ' Experiencia laboral eliminado ' })
    }
    return res.status(404).json({ message: ' Experiencia laboral no eliminado ' })
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}

export const putExperiencia = async (req, res) => {
  try {
    const data = validateExperiencia(req.body)
    const experiencia = await Experiencia.putExperiencia(req.params, data)
    return res.json(experiencia)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}
