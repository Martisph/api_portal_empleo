import jwt from 'jsonwebtoken'
import { SECRET_JWS_KEY_REFRESH } from '../config'

export const requireToken = (req, res, next) => {
  try {
    const headerToken = req.headers?.authorization
    const token = headerToken && headerToken.split(' ')[1]
    if (!token) throw new Error('No Bearer')
    const { id } = jwt.verify(token, SECRET_JWS_KEY_REFRESH)
    req.id = id // asigna el id a la variable req.id misntras esta en ejecucion
    next()
  } catch (e) {
    const TokenVerficationErrors = {
      'invalid signature': 'La firma dej JWT no es válida',
      'jwt expired': 'JWT expirado',
      'invalid token': 'Token no valido',
      'No Bearer': 'Utiliza formato Bearer',
      'jwt malformed': 'JWT formato no valido'
    }
    return res.status(401).json({ error: TokenVerficationErrors[e.message] })
  }
}
