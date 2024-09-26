import { Anuncio } from '../models/anuncio.js'
import { validateAnuncio } from '../schemas/anuncio.js'

export const getAnuncios = async (req, res) => {
  try {
    const anuncios = await Anuncio.getAreas()
    return res.status(200).json(anuncios)
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}

export const getAnuncio = async (req, res) => {
  try {
    const anuncio = await Anuncio.getArea(req.params)
    if (!anuncio) {
      return res.status(404).json({ message: ' Dato no encontrado ' })
    }
    return res.status(200).json(anuncio)
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}

export const postAnuncio = async (req, res) => {
  try {
    const data = validateAnuncio(req.body)
    const anuncio = await Anuncio.postArea(data)
    return res.status(200).json(anuncio)
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}

export const deleteAnuncio = async (req, res) => {
  try {
    const anuncio = await Anuncio.deleteArea(req.params)
    if (anuncio) {
      return res.status(200).json({ message: 'Categoria de Anuncio eliminado' })
    }
    return res.status(404).json({ message: 'Categoria de Anuncio no encontrado' })
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}

export const putAnuncio = async (req, res) => {
  try {
    const data = validateAnuncio(req.body)
    const anuncio = await Anuncio.putArea(req.params, data)
    return res.json(anuncio)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}
