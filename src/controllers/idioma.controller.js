import { Idioma } from '../models/idioma.js'
import { validateIdioma } from '../schemas/idioma.js'

export const getIdiomas = async (req, res) => {
  try {
    const idiomas = await Idioma.getIdiomas()
    return res.status(200).json(idiomas)
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}

export const getIdiomaAllById = async (req, res) => {
  try {
    const idioma = await Idioma.getIdiomaAllById(req.params)
    if (!idioma) {
      return res.status(404).json({ message: ' Idioma no encontrado ' })
    }
    return res.status(200).json(idioma)
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}

export const getIdioma = async (req, res) => {
  try {
    const idioma = await Idioma.getIdioma(req.params)
    if (!idioma) {
      return res.status(404).json({ message: ' Idioma no encontrado ' })
    }
    return res.status(200).json(idioma)
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}

export const postIdioma = async (req, res) => {
  try {
    const data = validateIdioma(req.body)
    const idioma = await Idioma.postIdioma(data)
    return res.status(200).json(idioma)
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}

export const deleteIdioma = async (req, res) => {
  try {
    const idioma = await Idioma.deleteIdioma(req.params)
    if (idioma) {
      return res.status(200).json({ message: ' Idioma eliminado ' })
    }
    return res.status(404).json({ message: ' Idioma no eliminado ' })
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}

export const putIdioma = async (req, res) => {
  try {
    const data = validateIdioma(req.body)
    const idioma = await Idioma.putIdioma(req.params, data)
    return res.json(idioma)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}
