import { Router } from 'express'
import { deleteDepartamento, getDepartamento, getDepartamentos, postDepartamento, putDepartamento } from '../controllers/departamento.controller.js'
import { userSesionMiddleware } from '../middlewares/userSesion.js'

export const routerDepartamentos = Router()

routerDepartamentos.get('/', getDepartamentos)

routerDepartamentos.get('/:id', getDepartamento)

routerDepartamentos.post('/', userSesionMiddleware, postDepartamento)

routerDepartamentos.delete('/:id', userSesionMiddleware, deleteDepartamento)

routerDepartamentos.put('/:id', userSesionMiddleware, putDepartamento)
