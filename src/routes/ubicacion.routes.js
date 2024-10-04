import { Router } from 'express'
import {
  getUbicacion,
  getUbicaciones,
  postUbicacion,
  deleteUbicacion,
  putUbicacion
} from '../controllers/ubicacion.controller.js'
import { userSesionMiddleware } from '../middlewares/userSesion.js'

export const routerUbicaciones = Router()

routerUbicaciones.get('/', getUbicaciones)

routerUbicaciones.get('/:id', getUbicacion)

routerUbicaciones.post('/', userSesionMiddleware, postUbicacion)

routerUbicaciones.delete('/:id', userSesionMiddleware, deleteUbicacion)

routerUbicaciones.put('/:id', userSesionMiddleware, putUbicacion)
