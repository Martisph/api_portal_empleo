import { Router } from 'express'
import { deleteDepartamento, getDepartamento, getDepartamentos, postDepartamento, putDepartamento } from '../controllers/departamento.controller.js'

export const routerDepartamentos = Router()

routerDepartamentos.get('/', getDepartamentos)

routerDepartamentos.get('/:id', getDepartamento)

routerDepartamentos.post('/', postDepartamento)

routerDepartamentos.delete('/:id', deleteDepartamento)

routerDepartamentos.put('/:id', putDepartamento)
