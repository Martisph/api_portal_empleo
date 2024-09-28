import { Router } from 'express'
import { auntentificacionController } from '../controllers/autentificacion.js'

export const routerLogin = Router()

routerLogin.post('/', auntentificacionController)
