import { Router } from 'express'
import { deleteEstudio, getEstudio, getEstudios, postEstudio, putEstudio } from '../controllers/estudio.controller.js'

export const routerEstudios = Router()

routerEstudios.get('/', getEstudios)

routerEstudios.get('/:id', getEstudio)

routerEstudios.post('/', postEstudio)

routerEstudios.delete('/:id', deleteEstudio)

routerEstudios.put('/:id', putEstudio)
