import { Router } from 'express'
import { deleteUsuario, getUsuario, getUsuarios, postUsuario, putUsuario } from '../controllers/usuario.controller.js'

export const routerUsuarios = Router()

routerUsuarios.get('/', getUsuarios)

routerUsuarios.get('/:id', getUsuario)

routerUsuarios.post('/', postUsuario)

routerUsuarios.delete('/:id', deleteUsuario)

routerUsuarios.put('/:id', putUsuario)
