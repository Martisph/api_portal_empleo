import { Router } from 'express'
import {
  deleteNotificacion,
  getNotificacion,
  getNotificacionAll,
  getNotificaciones,
  postNotificacion,
  putNotificacion
} from '../controllers/notificacion.controller.js'
import { userSesionMiddleware } from '../middlewares/userSesion.js'

export const routerNotificaciones = Router()

routerNotificaciones.get('/', getNotificaciones) // agregar depues de pruebas

routerNotificaciones.get('/all/:id', getNotificacionAll)

routerNotificaciones.get('/:id', userSesionMiddleware, getNotificacion)

routerNotificaciones.post('/', userSesionMiddleware, postNotificacion)

routerNotificaciones.delete('/:id', userSesionMiddleware, deleteNotificacion)

routerNotificaciones.put('/:id', userSesionMiddleware, putNotificacion)
