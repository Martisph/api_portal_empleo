import { Router } from 'express'
import {
  getUbicacion,
  getUbicaciones,
  postUbicacion,
  deleteUbicacion,
  putUbicacion
} from '../controllers/ubicacion.controller.js'

export const routerUbicaciones = Router()

routerUbicaciones.get('/', getUbicaciones)

routerUbicaciones.get('/:id', getUbicacion)

routerUbicaciones.post('/', postUbicacion)

routerUbicaciones.delete('/:id', deleteUbicacion)

routerUbicaciones.put('/:id', putUbicacion)
