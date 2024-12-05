import { Router } from 'express'
import {
  deleteCandidato,
  getCandidato,
  getCandidatoById,
  getCandidatos,
  postCandidato,
  putCandidato
} from '../controllers/candidato.controller.js'
import { userSesionMiddleware } from '../middlewares/userSesion.js'
import { postUsuarioC } from '../controllers/usuario_candidato.controller.js'

export const routerCandidatos = Router()

routerCandidatos.get('/', getCandidatos)

routerCandidatos.get('/:id', getCandidato)

routerCandidatos.get('/id/:id', getCandidatoById)

routerCandidatos.post('/', postCandidato)

routerCandidatos.post('/create', postUsuarioC)

routerCandidatos.delete('/:id', userSesionMiddleware, deleteCandidato)

routerCandidatos.put('/:id', userSesionMiddleware, putCandidato)
