import { Router } from 'express'
import { deletePostulacion, getPostulacion, getPostulaciones, postPostulacion, putPostulacion } from '../controllers/postulacion.controller.js'

export const routerPostulaciones = Router()

routerPostulaciones.get('/', getPostulaciones)

routerPostulaciones.get('/:id', getPostulacion)

routerPostulaciones.post('/', postPostulacion)

routerPostulaciones.delete('/:id', deletePostulacion)

routerPostulaciones.put('/:id', putPostulacion)
