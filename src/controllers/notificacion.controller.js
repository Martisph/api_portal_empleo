import { Notificacion } from '../models/notificacion.js'
import { validateNotificacion } from '../schemas/notificacion.js'

export const getNotificaciones = async (req, res) => {
  try {
    const notificaciones = await Notificacion.getNotificaciones()
    return res.status(200).json(notificaciones)
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}

export const getNotificacion = async (req, res) => {
  try {
    const notificacion = await Notificacion.getNotificacion(req.params)
    if (!notificacion) {
      return res.status(404).json({ message: ' Notificacion no encontrado ' })
    }
    return res.status(200).json(notificacion)
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}

export const postNotificacion = async (req, res) => {
  try {
    const data = validateNotificacion(req.body)
    const notificacion = await Notificacion.postNotificacion(data)
    return res.status(200).json(notificacion)
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}

export const deleteNotificacion = async (req, res) => {
  try {
    const notificacion = await Notificacion.deleteNotificacion(req.params)
    if (notificacion) {
      return res.status(200).json({ message: ' Notificacion eliminado ' })
    }
    return res.status(404).json({ message: ' Notificacion no eliminado ' })
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}

export const putNotificacion = async (req, res) => {
  try {
    const data = validateNotificacion(req.body)
    const notificacion = await Notificacion.putNotificacion(req.params, data)
    return res.json(notificacion)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}
