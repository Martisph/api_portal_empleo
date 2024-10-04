import { Router } from 'express'
import { deleteUsuario, getUsuario, getUsuarios, postUsuario, putUsuario } from '../controllers/usuario.controller.js'
import { userSesionMiddleware } from '../middlewares/userSesion.js'

export const routerUsuarios = Router()

routerUsuarios.get('/', getUsuarios) // Por el momento, para las pruebas, no agregamos el middleware

routerUsuarios.get('/:id', userSesionMiddleware, getUsuario)

routerUsuarios.post('/', postUsuario)

routerUsuarios.delete('/:id', userSesionMiddleware, deleteUsuario)

routerUsuarios.put('/:id', userSesionMiddleware, putUsuario)
