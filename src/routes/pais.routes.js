import { Router } from 'express'
import {
  deletePais,
  getPais,
  getPaises,
  postPais,
  putPais
} from '../controllers/pais.controller.js'
import { userSesionMiddleware } from '../middlewares/userSesion.js'

export const routerPaises = Router()

routerPaises.get('/', getPaises)

routerPaises.get('/:id', getPais)

routerPaises.post('/', userSesionMiddleware, postPais)

routerPaises.delete('/:id', userSesionMiddleware, deletePais)

routerPaises.put('/:id', userSesionMiddleware, putPais)
