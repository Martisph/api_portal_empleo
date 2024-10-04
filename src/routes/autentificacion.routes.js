import { Router } from 'express'
import { auntentificacionController, refreshToken, logoutController } from '../controllers/autentificacion.js'

export const routerSesion = Router()

routerSesion.post('/login', auntentificacionController)
routerSesion.post('/logout', logoutController)
routerSesion.post('/refresh', refreshToken)
