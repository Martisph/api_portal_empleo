import { Router } from 'express'
import { deleteNotificacion, getNotificacion, getNotificaciones, postNotificacion, putNotificacion } from '../controllers/notificacion.controller.js'
import { userSesionMiddleware } from '../middlewares/userSesion.js'

export const routerNotificaciones = Router()

routerNotificaciones.get('/', userSesionMiddleware, getNotificaciones)

routerNotificaciones.get('/:id', userSesionMiddleware, getNotificacion)

routerNotificaciones.post('/', userSesionMiddleware, postNotificacion)

routerNotificaciones.delete('/:id', userSesionMiddleware, deleteNotificacion)

routerNotificaciones.put('/:id', userSesionMiddleware, putNotificacion)
