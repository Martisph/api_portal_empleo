import { Router } from 'express'
import { deletePostulacion, getPostulacion, getPostulaciones, postPostulacion, putPostulacion } from '../controllers/postulacion.controller.js'
import { userSesionMiddleware } from '../middlewares/userSesion.js'

export const routerPostulaciones = Router()

routerPostulaciones.get('/', getPostulaciones) // agregar despues de las pruebas

routerPostulaciones.get('/:id', userSesionMiddleware, getPostulacion)

routerPostulaciones.post('/', userSesionMiddleware, postPostulacion)

routerPostulaciones.delete('/:id', userSesionMiddleware, deletePostulacion)

routerPostulaciones.put('/:id', userSesionMiddleware, putPostulacion)
