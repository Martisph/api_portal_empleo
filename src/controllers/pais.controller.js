import { Pais } from '../models/pais.js'
import { validatePais } from '../schemas/pais.js'

export const getPaises = async (req, res) => {
  try {
    const paises = await Pais.getAreas()
    return res.status(200).json(paises)
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}

export const getPais = async (req, res) => {
  try {
    const pais = await Pais.getArea(req.params)
    if (!pais) {
      return res.status(404).json({ message: ' Dato no encontrado ' })
    }
    return res.status(200).json(pais)
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}

export const postPais = async (req, res) => {
  try {
    const data = validatePais(req.body)
    const pais = await Pais.postArea(data)
    return res.status(200).json(pais)
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}

export const deletePais = async (req, res) => {
  try {
    const pais = await Pais.deleteArea(req.params)
    if (pais) {
      return res.status(200).json({ message: 'Categoria de Pais eliminado' })
    }
    return res.status(404).json({ message: 'Categoria de Pais no encontrado' })
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}

export const putPais = async (req, res) => {
  try {
    const data = validatePais(req.body)
    const pais = await Pais.putArea(req.params, data)
    return res.json(pais)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}
