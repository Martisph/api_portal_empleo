import { Idioma } from '../models/idioma.js'
import { validateIdioma } from '../schemas/idioma.js'

export const getIdiomas = async (req, res) => {
  try {
    const idiomas = await Idioma.getAreas()
    return res.status(200).json(idiomas)
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}

export const getIdioma = async (req, res) => {
  try {
    const idioma = await Idioma.getArea(req.params)
    if (!idioma) {
      return res.status(404).json({ message: ' Dato no encontrado ' })
    }
    return res.status(200).json(idioma)
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}

export const postIdioma = async (req, res) => {
  try {
    const data = validateIdioma(req.body)
    const idioma = await Idioma.postArea(data)
    return res.status(200).json(idioma)
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}

export const deleteIdioma = async (req, res) => {
  try {
    const idioma = await Idioma.deleteArea(req.params)
    if (idioma) {
      return res.status(200).json({ message: 'Categoria de Idioma eliminado' })
    }
    return res.status(404).json({ message: 'Categoria de Idioma no encontrado' })
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}

export const putIdioma = async (req, res) => {
  try {
    const data = validateIdioma(req.body)
    const idioma = await Idioma.putArea(req.params, data)
    return res.json(idioma)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}
