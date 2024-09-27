import { Router } from 'express'
import { getAnuncio, getAnuncios, postAnuncio, deleteAnuncio, putAnuncio } from '../controllers/anuncio.controller.js'

export const routerAnuncios = Router()

routerAnuncios.get('/', getAnuncios)

routerAnuncios.get('/:id', getAnuncio)

routerAnuncios.post('/', postAnuncio)

routerAnuncios.delete('/:id', deleteAnuncio)

routerAnuncios.put('/:id', putAnuncio)
