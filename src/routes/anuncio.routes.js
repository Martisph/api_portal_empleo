import { Router } from 'express'
import { getAnuncio, getAnuncios, postAnuncio, deleteAnuncio, putAnuncio } from '../controllers/anuncio.controller.js'
import { userSesionMiddleware } from '../middlewares/userSesion.js'

export const routerAnuncios = Router()

routerAnuncios.get('/', getAnuncios)

routerAnuncios.get('/:id', getAnuncio)

routerAnuncios.post('/', userSesionMiddleware, postAnuncio)

routerAnuncios.delete('/:id', userSesionMiddleware, deleteAnuncio)

routerAnuncios.put('/:id', userSesionMiddleware, putAnuncio)
