import { Router } from 'express'
import { deleteExperiencia, getExperiencia, getExperiencias, postExperiencia, putExperiencia } from '../controllers/experiencia.controller.js'

export const routerExperiencias = Router()

routerExperiencias.get('/', getExperiencias)

routerExperiencias.get('/:id', getExperiencia)

routerExperiencias.post('/', postExperiencia)

routerExperiencias.delete('/:id', deleteExperiencia)

routerExperiencias.put('/:id', putExperiencia)
