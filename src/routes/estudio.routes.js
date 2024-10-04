import { Router } from 'express'
import { deleteEstudio, getEstudio, getEstudios, postEstudio, putEstudio } from '../controllers/estudio.controller.js'
import { userSesionMiddleware } from '../middlewares/userSesion.js'

export const routerEstudios = Router()

routerEstudios.get('/', getEstudios)

routerEstudios.get('/:id', getEstudio)

routerEstudios.post('/', userSesionMiddleware, postEstudio)

routerEstudios.delete('/:id', userSesionMiddleware, deleteEstudio)

routerEstudios.put('/:id', userSesionMiddleware, putEstudio)
