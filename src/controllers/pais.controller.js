import { Pais } from '../models/pais.js'
import { validatePais } from '../schemas/pais.js'

export const getPaises = async (req, res) => {
  try {
    const paises = await Pais.getPaises()
    return res.status(200).json(paises)
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}

export const getPais = async (req, res) => {
  try {
    const pais = await Pais.getPais(req.params)
    if (!pais) {
      return res.status(404).json({ message: ' Pais no encontrado ' })
    }
    return res.status(200).json(pais)
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}

export const postPais = async (req, res) => {
  try {
    const data = validatePais(req.body)
    const pais = await Pais.postPais(data)
    return res.status(200).json(pais)
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}

export const deletePais = async (req, res) => {
  try {
    const pais = await Pais.deletePais(req.params)
    if (pais) {
      return res.status(200).json({ message: ' Pais eliminado ' })
    }
    return res.status(404).json({ message: ' Pais no eliminado ' })
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}

export const putPais = async (req, res) => {
  try {
    const data = validatePais(req.body)
    const pais = await Pais.putPais(req.params, data)
    return res.json(pais)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}
