import { Router } from 'express'
import { deleteNotificacion, getNotificacion, getNotificaciones, postNotificacion, putNotificacion } from '../controllers/notificacion.controller.js'

export const routerNotificaciones = Router()

routerNotificaciones.get('/', getNotificaciones)

routerNotificaciones.get('/:id', getNotificacion)

routerNotificaciones.post('/', postNotificacion)

routerNotificaciones.delete('/:id', deleteNotificacion)

routerNotificaciones.put('/:id', putNotificacion)
