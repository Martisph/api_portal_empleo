import { Router } from 'express'
import { deleteEmpresa, getEmpresa, getEmpresas, postEmpresa, putEmpresa } from '../controllers/empresa.controller.js'

export const routerEmpresas = Router()

routerEmpresas.get('/', getEmpresas)

routerEmpresas.get('/:id', getEmpresa)

routerEmpresas.post('/', postEmpresa)

routerEmpresas.delete('/:id', deleteEmpresa)

routerEmpresas.put('/:id', putEmpresa)
