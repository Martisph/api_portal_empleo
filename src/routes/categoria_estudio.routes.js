import { Router } from 'express'
import { getCategoriaEstudio, getCategoriaEstudios, postCategoriaEstudio, deleteCategoriaEstudio, putCategoriaEstudio } from '../controllers/categoria_estudio.controller.js'

export const routerCategoriaStudios = Router()

routerCategoriaStudios.get('/', getCategoriaEstudios)

routerCategoriaStudios.get('/:id', getCategoriaEstudio)

routerCategoriaStudios.post('/', postCategoriaEstudio)

routerCategoriaStudios.delete('/:id', deleteCategoriaEstudio)

routerCategoriaStudios.put('/:id', putCategoriaEstudio)
