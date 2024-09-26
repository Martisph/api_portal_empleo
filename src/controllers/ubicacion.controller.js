import { Ubicacion } from '../models/ubicacion.js'
import { validateUbicacion } from '../schemas/ubicacion.js'

export const getUbicaciones = async (req, res) => {
  try {
    const ubicaciones = await Ubicacion.getAreas()
    return res.status(200).json(ubicaciones)
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}

export const getUbicacion = async (req, res) => {
  try {
    const ubicacion = await Ubicacion.getArea(req.params)
    if (!ubicacion) {
      return res.status(404).json({ message: ' Dato no encontrado ' })
    }
    return res.status(200).json(ubicacion)
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}

export const postUbicacion = async (req, res) => {
  try {
    const data = validateUbicacion(req.body)
    const ubicacion = await Ubicacion.postArea(data)
    return res.status(200).json(ubicacion)
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}

export const deleteUbicacion = async (req, res) => {
  try {
    const ubicacion = await Ubicacion.deleteArea(req.params)
    if (ubicacion) {
      return res.status(200).json({ message: 'Categoria de Ubicacion eliminado' })
    }
    return res.status(404).json({ message: 'Categoria de Ubicacion no encontrado' })
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}

export const putUbicacion = async (req, res) => {
  try {
    const data = validateUbicacion(req.body)
    const ubicacion = await Ubicacion.putArea(req.params, data)
    return res.json(ubicacion)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}
