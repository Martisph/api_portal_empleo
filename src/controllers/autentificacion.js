import { SECRET_JWS_KEY_REFRESH } from '../config.js'
import { Usuario } from '../models/usuario.js'
import { validateCredenciales } from '../schemas/credenciales.js'
import { generateRefreshToken, generateToken } from '../utils/manageToken.js'
import jwt from 'jsonwebtoken'

export async function auntentificacionController (req, res) {
  const data = validateCredenciales(req.body)
  try {
    const user = await new Usuario(data)
    const login = await user.loginUsuario()
    if (login) {
      const { token, expiresIn } = generateToken(login.id_usuario, login.nombre)
      generateRefreshToken(login.id_usuario, login.nombre, res)
      return res.status(200).json({ token, expiresIn })
    }
    return res.status(500).json({ message: ' Internal error ' })
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}

export async function logoutController (req, res) {
  try {
    return res.clearCookie('access_token_refresh').status(200).json({ message: 'Logout succesful' })
  } catch (e) {
    return res.status(401).json({ message: e })
  }
}

export const refreshToken = (req, res) => {
  try {
    const refreshTokenCookie = req.cookies.access_token
    if (!refreshTokenCookie) throw new Error('No Bearer')
    const { id, name } = jwt.verify(refreshToken, SECRET_JWS_KEY_REFRESH)
    const { token, expiresIn } = generateToken(id, name)
    return res.status(200).json({ token, expiresIn })
  } catch (e) {
    return res.status(401).json({ message: e })
  }
}
