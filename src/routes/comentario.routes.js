import { Router } from 'express'
import {
  deleteComentario,
  getComentarios,
  getComentario,
  postComentario,
  putComentario
} from '../controllers/comentario.controller.js'

export const routerComentarios = Router()

routerComentarios.get('/', getComentarios)

routerComentarios.get('/:id', getComentario)

routerComentarios.post('/', postComentario)

routerComentarios.delete('/:id', deleteComentario)

routerComentarios.put('/:id', putComentario)
