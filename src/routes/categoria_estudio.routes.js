import { Router } from 'express'
import { getCategoriaEstudio, getCategoriaEstudios, postCategoriaEstudio, deleteCategoriaEstudio, putCategoriaEstudio } from '../controllers/categoria_estudio.controller.js'
import { userSesionMiddleware } from '../middlewares/userSesion.js'

export const routerCategoriaStudios = Router()

routerCategoriaStudios.get('/', getCategoriaEstudios)

routerCategoriaStudios.get('/:id', getCategoriaEstudio)

routerCategoriaStudios.post('/', userSesionMiddleware, postCategoriaEstudio)

routerCategoriaStudios.delete('/:id', userSesionMiddleware, deleteCategoriaEstudio)

routerCategoriaStudios.put('/:id', userSesionMiddleware, putCategoriaEstudio)
