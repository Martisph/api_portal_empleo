import { Router } from 'express'
import { auntentificacionController, refresToken } from '../controllers/autentificacion.js'

export const routerLogin = Router()

routerLogin.post('/', auntentificacionController)
routerLogin.post('/refresh', refresToken)
