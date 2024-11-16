import { Router } from 'express'
import {
  deletePostulacion,
  getPostulacion,
  getPostulacionByEmpresa,
  getPostulacionByCandidato,
  getPostulaciones,
  postPostulacion,
  putPostulacion,
  getPostulacionByEmpresaAll
} from '../controllers/postulacion.controller.js'
import { userSesionMiddleware } from '../middlewares/userSesion.js'

export const routerPostulaciones = Router()

routerPostulaciones.get('/', getPostulaciones) // agregar despues de las pruebas

routerPostulaciones.get('/posit-all-empresa/:id', userSesionMiddleware, getPostulacionByEmpresaAll)

routerPostulaciones.get('/posit-empresa/:id', userSesionMiddleware, getPostulacionByEmpresa)

routerPostulaciones.get('/posit-candidato/:id', userSesionMiddleware, getPostulacionByCandidato)

routerPostulaciones.get('/:id', userSesionMiddleware, getPostulacion)

routerPostulaciones.post('/', userSesionMiddleware, postPostulacion)

routerPostulaciones.delete('/:id', userSesionMiddleware, deletePostulacion)

routerPostulaciones.put('/:id', userSesionMiddleware, putPostulacion)
