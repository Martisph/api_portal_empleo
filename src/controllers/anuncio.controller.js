import { Anuncio } from '../models/anuncio.js'
import { validateAnuncio, validatePartialAnuncio } from '../schemas/anuncio.js'

export const getAllAnuncios = async (req, res) => {
  try {
    const anuncios = await Anuncio.getAllAnuncios(req.params)
    return res.status(200).json(anuncios)
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}

export const getAnuncioByParams = async (req, res) => {
  try {
    const anuncio = await Anuncio.getAnuncioByParams(req.params)
    if (!anuncio) {
      return res.status(404).json({ message: ' Anuncio no encontrado ' })
    }
    return res.status(200).json(anuncio)
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}

export const getAnuncioByDash = async (req, res) => {
  try {
    const anuncio = await Anuncio.getAnuncioByIdDash(req.params)
    if (!anuncio) {
      return res.status(404).json({ message: ' Anuncio no encontrado ' })
    }
    return res.status(200).json(anuncio)
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}
export const getAnuncio = async (req, res) => {
  try {
    const anuncio = await Anuncio.getAnuncioById(req.params)
    if (!anuncio) {
      return res.status(404).json({ message: ' Anuncio no encontrado ' })
    }
    return res.status(200).json(anuncio)
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}

export const postAnuncio = async (req, res) => {
  try {
    const data = validateAnuncio(req.body)
    const anuncio = await Anuncio.postAnuncio(data)
    return res.status(200).json(anuncio)
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}

export const deleteAnuncio = async (req, res) => {
  try {
    const anuncio = await Anuncio.deleteAnuncio(req.params)
    if (anuncio) {
      return res.status(200).json({ message: ' Anuncio eliminado ' })
    }
    return res.status(404).json({ message: ' Anuncio no encontrado ' })
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}

export const putAnuncio = async (req, res) => {
  try {
    const data = validatePartialAnuncio(req.body)
    const anuncio = await Anuncio.putAnuncio(req.params, data)
    return res.json(anuncio)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}
