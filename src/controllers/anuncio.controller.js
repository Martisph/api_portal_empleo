import { Anuncio } from '../models/anuncio.js'
import { validateAnuncio } from '../schemas/anuncio.js'

export const getAllAnuncios = async (req, res) => {
  try {
    const anuncios = await Anuncio.getAllAnuncios()
    return res.status(200).json(anuncios)
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}

export const getAnuncioParams = async (req, res) => {
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
    const data = validateAnuncio(req.body)
    const anuncio = await Anuncio.putAnuncio(req.params, data)
    return res.json(anuncio)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}
