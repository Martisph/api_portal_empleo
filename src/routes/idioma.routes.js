import { Router } from 'express'
import { deleteIdioma, getIdioma, getIdiomas, postIdioma, putIdioma } from '../controllers/idioma.controller.js'

export const routerIdiomas = Router()

routerIdiomas.get('/', getIdiomas)

routerIdiomas.get('/:id', getIdioma)

routerIdiomas.post('/', postIdioma)

routerIdiomas.delete('/:id', deleteIdioma)

routerIdiomas.put('/:id', putIdioma)
