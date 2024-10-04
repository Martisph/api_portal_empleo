import { Router } from 'express'
import { deleteCandidato, getCandidato, getCandidatos, postCandidato, putCandidato } from '../controllers/candidato.controller.js'
import { userSesionMiddleware } from '../middlewares/userSesion.js'

export const routerCandidatos = Router()

routerCandidatos.get('/', getCandidatos)

routerCandidatos.get('/:id', getCandidato)

routerCandidatos.post('/', postCandidato)

routerCandidatos.delete('/:id', userSesionMiddleware, deleteCandidato)

routerCandidatos.put('/:id', userSesionMiddleware, putCandidato)
