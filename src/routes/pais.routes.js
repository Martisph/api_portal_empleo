import { Router } from 'express'
import {
  deletePais,
  getPais,
  getPaises,
  postPais,
  putPais
} from '../controllers/pais.controller.js'

export const routerPaises = Router()

routerPaises.get('/', getPaises)

routerPaises.get('/:id', getPais)

routerPaises.post('/', postPais)

routerPaises.delete('/:id', deletePais)

routerPaises.put('/:id', putPais)
