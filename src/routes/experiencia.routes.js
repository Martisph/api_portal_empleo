import { Router } from 'express'
import { deleteExperiencia, getExperiencia, getExperiencias, postExperiencia, putExperiencia } from '../controllers/experiencia.controller.js'
import { userSesionMiddleware } from '../middlewares/userSesion.js'

export const routerExperiencias = Router()

routerExperiencias.get('/', getExperiencias)

routerExperiencias.get('/:id', getExperiencia)

routerExperiencias.post('/', userSesionMiddleware, postExperiencia)

routerExperiencias.delete('/:id', userSesionMiddleware, deleteExperiencia)

routerExperiencias.put('/:id', userSesionMiddleware, putExperiencia)
