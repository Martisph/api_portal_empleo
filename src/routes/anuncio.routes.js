import { Router } from 'express'
import { getAnuncio, getAllAnuncios, postAnuncio, deleteAnuncio, putAnuncio, getAnuncioByParams, getAnuncioByDash } from '../controllers/anuncio.controller.js'
import { userSesionMiddleware } from '../middlewares/userSesion.js'

export const routerAnuncios = Router()

routerAnuncios.get('/', getAllAnuncios)

routerAnuncios.get('/params/:params', getAnuncioByParams)

routerAnuncios.get('/dash/:id', getAnuncioByDash)

routerAnuncios.get('/:id', getAnuncio)

routerAnuncios.post('/', userSesionMiddleware, postAnuncio)

routerAnuncios.delete('/:id', userSesionMiddleware, deleteAnuncio)

routerAnuncios.put('/:id', userSesionMiddleware, putAnuncio)
