import { Usuario } from '../models/usuario.js'
import { validateCredenciales } from '../schemas/credenciales.js'

export async function auntentificacionController (req, res) {
  const data = validateCredenciales(req.body)
  try {
    const user = await new Usuario(data)
    const login = await user.loginUsuario()

    if (login) return res.status(200).json(login)
    return res.status(500).json({ message: ' Internal error ' })
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}
