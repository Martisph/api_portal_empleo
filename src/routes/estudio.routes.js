import { Router } from 'express'
import {
  deleteEstudio,
  getEstudio,
  getEstudioAllById,
  getEstudios,
  postEstudio,
  putEstudio
} from '../controllers/estudio.controller.js'
import { userSesionMiddleware } from '../middlewares/userSesion.js'

export const routerEstudios = Router()

routerEstudios.get('/', getEstudios)

routerEstudios.get('/all/:id', getEstudioAllById)

routerEstudios.get('/:id', getEstudio)

routerEstudios.post('/', userSesionMiddleware, postEstudio)

routerEstudios.delete('/:id', userSesionMiddleware, deleteEstudio)

routerEstudios.put('/:id', userSesionMiddleware, putEstudio)
