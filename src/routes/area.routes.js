import { Router } from 'express'
import { deleteArea, getArea, getAreas, postArea, putArea } from '../controllers/area.controller.js'
import { userSesionMiddleware } from '../middlewares/userSesion.js'

export const routerAreas = Router()

routerAreas.get('/', getAreas)

routerAreas.get('/:id', getArea)

routerAreas.post('/', userSesionMiddleware, postArea)

routerAreas.delete('/:id', userSesionMiddleware, deleteArea)

routerAreas.put('/:id', userSesionMiddleware, putArea)
