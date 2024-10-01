import { Usuario } from '../models/usuario.js'
import { validateCredenciales } from '../schemas/credenciales.js'
import jwt from 'jsonwebtoken'
import { SECRET_JWS_KEY } from '../config.js'

export async function auntentificacionController (req, res) {
  const data = validateCredenciales(req.body)
  try {
    const user = await new Usuario(data)
    const login = await user.loginUsuario()
    if (login) {
      const token = jwt.sign(
        { id: login.id_usuario, name: login.nombre, email: login.email },
        SECRET_JWS_KEY,
        { expiresIn: '5m' })
      return res.status(200).json({ login, token })
    }
    return res.status(500).json({ message: ' Internal error ' })
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}
