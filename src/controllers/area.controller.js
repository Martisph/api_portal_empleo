import { Area } from '../models/area.js'
import { validateArea } from '../schemas/area.js'

export const getAreas = async (req, res) => {
  try {
    const areas = await Area.getAreas()
    return res.status(200).json(areas)
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}

export const getArea = async (req, res) => {
  try {
    const area = await Area.getArea(req.params)
    if (!area) {
      return res.status(404).json({ message: ' Dato no encontrado ' })
    }
    return res.status(200).json(area)
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}

export const postArea = async (req, res) => {
  try {
    const data = validateArea(req.body)
    const area = await Area.postArea(data)
    return res.status(200).json(area)
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}

export const deleteArea = async (req, res) => {
  try {
    const area = await Area.deleteArea(req.params)
    if (area) {
      return res.status(200).json({ message: 'pais eliminado' })
    }
    return res.status(404).json({ message: 'Pais no encontrado' })
  } catch (e) {
    return res.status(500).json({ message: 'internal error' })
  }
}

export const putArea = async (req, res) => {
  try {
    const data = validateArea(req.body)
    const area = await Area.putArea(req.params, data)
    return res.json(area)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}
