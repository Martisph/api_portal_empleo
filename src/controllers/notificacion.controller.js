import { Notificacion } from '../models/notificacion.js'
import { validateNotificacion } from '../schemas/notificacion.js'

export const getNotificacions = async (req, res) => {
  try {
    const notificaciones = await Notificacion.getAreas()
    return res.status(200).json(notificaciones)
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}

export const getNotificacion = async (req, res) => {
  try {
    const notificacion = await Notificacion.getArea(req.params)
    if (!notificacion) {
      return res.status(404).json({ message: ' Dato no encontrado ' })
    }
    return res.status(200).json(notificacion)
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}

export const postNotificacion = async (req, res) => {
  try {
    const data = validateNotificacion(req.body)
    const notificacion = await Notificacion.postArea(data)
    return res.status(200).json(notificacion)
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}

export const deleteNotificacion = async (req, res) => {
  try {
    const notificacion = await Notificacion.deleteArea(req.params)
    if (notificacion) {
      return res.status(200).json({ message: 'Categoria de Notificacion eliminado' })
    }
    return res.status(404).json({ message: 'Categoria de Notificacion no encontrado' })
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}

export const putNotificacion = async (req, res) => {
  try {
    const data = validateNotificacion(req.body)
    const notificacion = await Notificacion.putArea(req.params, data)
    return res.json(notificacion)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}
