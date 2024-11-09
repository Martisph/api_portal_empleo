import { Router } from 'express'
import {
  deleteComentario,
  getComentarios,
  getComentario,
  postComentario,
  putComentario,
  getComentarioByEmpresa
} from '../controllers/comentario.controller.js'
import { userSesionMiddleware } from '../middlewares/userSesion.js'

export const routerComentarios = Router()

routerComentarios.get('/', getComentarios)

routerComentarios.get('/:id', getComentario)

routerComentarios.get('/empresa/:id', getComentarioByEmpresa)

routerComentarios.post('/', userSesionMiddleware, postComentario)

routerComentarios.delete('/:id', userSesionMiddleware, deleteComentario)

routerComentarios.put('/:id', userSesionMiddleware, putComentario)
