import { Router } from 'express'
import { deleteIdioma, getIdioma, getIdiomas, postIdioma, putIdioma } from '../controllers/idioma.controller.js'
import { userSesionMiddleware } from '../middlewares/userSesion.js'

export const routerIdiomas = Router()

routerIdiomas.get('/', getIdiomas)

routerIdiomas.get('/:id', getIdioma)

routerIdiomas.post('/', userSesionMiddleware, postIdioma)

routerIdiomas.delete('/:id', userSesionMiddleware, deleteIdioma)

routerIdiomas.put('/:id', userSesionMiddleware, putIdioma)
