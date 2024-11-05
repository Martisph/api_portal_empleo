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
      const { token } = generateToken(login._id, login.nombre)
      generateRefreshToken(login._id, login.nombre, res)
      return res
        .status(200)
        .json({ token, _id: login._id, email: login.email, nombre: login.nombre, profile: login.profile })
    }
    return res.status(401).json({ error: ' Credenciales invalidas ' })
  } catch (e) {
    return res.status(400).json({ error: e.message })
  }
}

export async function logoutController (req, res) {
  try {
    return res.clearCookie('access_token_refresh').status(200).json({ message: 'Logout succesful' })
  } catch (e) {
    return res.status(401).json({ error: e })
  }
}

export const refreshToken = (req, res) => {
  try {
    const refreshTokenCookie = req.cookies.access_token_refresh
    if (!refreshTokenCookie) throw new Error('No Bearer')
    const { id, name } = jwt.verify(refreshToken, SECRET_JWS_KEY_REFRESH)
    const { token, expiresIn } = generateToken(id, name)
    return res.status(200).json({ token, expiresIn })
  } catch (e) {
    return res.status(401).json({ error: e })
  }
}
