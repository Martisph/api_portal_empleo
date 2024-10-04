import { Router } from 'express'
import { deleteEmpresa, getEmpresa, getEmpresas, postEmpresa, putEmpresa } from '../controllers/empresa.controller.js'
import { userSesionMiddleware } from '../middlewares/userSesion.js'

export const routerEmpresas = Router()

routerEmpresas.get('/', getEmpresas)

routerEmpresas.get('/:id', getEmpresa)

routerEmpresas.post('/', postEmpresa)

routerEmpresas.delete('/:id', userSesionMiddleware, deleteEmpresa)

routerEmpresas.put('/:id', userSesionMiddleware, putEmpresa)
