import { Router } from 'express'
import {
  deleteEmpresa,
  getEmpresa,
  getEmpresaBasicInfo,
  getEmpresas,
  postEmpresa,
  putEmpresa
} from '../controllers/empresa.controller.js'
import { userSesionMiddleware } from '../middlewares/userSesion.js'
import { postUsuarioE } from '../controllers/usuario_empresa.controller.js'

export const routerEmpresas = Router()

routerEmpresas.get('/', getEmpresas)

routerEmpresas.get('/basic-info/:id', getEmpresaBasicInfo)

routerEmpresas.get('/:id', getEmpresa)

routerEmpresas.post('/', postEmpresa)

routerEmpresas.post('/create', postUsuarioE)

routerEmpresas.delete('/:id', userSesionMiddleware, deleteEmpresa)

routerEmpresas.put('/:id', userSesionMiddleware, putEmpresa)
