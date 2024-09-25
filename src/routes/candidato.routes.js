import { Router } from 'express'
import { deleteCandidato, getCandidato, getCandidatos, postCandidato, putCandidato } from '../controllers/candidato.controller.js'

export const routerCandidatos = Router()

routerCandidatos.get('/', getCandidatos)

routerCandidatos.get('/:id', getCandidato)

routerCandidatos.post('/', postCandidato)

routerCandidatos.delete('/:id', deleteCandidato)

routerCandidatos.put('/:id', putCandidato)
