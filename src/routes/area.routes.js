import { Router } from 'express'
import { deleteArea, getArea, getAreas, postArea, putArea } from '../controllers/area.controller.js'

export const routerAreas = Router()

routerAreas.get('/', getAreas)

routerAreas.get('/:id', getArea)

routerAreas.post('/', postArea)

routerAreas.delete('/:id', deleteArea)

routerAreas.put('/:id', putArea)
