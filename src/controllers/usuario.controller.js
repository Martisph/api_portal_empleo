import { pool } from '../database/db.js'
import { Usuario } from '../models/usuario.js'
import { validateUsuario } from '../schemas/usuario.js'

export const getUsuarios = async (req, res) => {
  const usuario = await Usuario.getUsuarios()
  return res.status(200).json(usuario)
}

export const getUsuario = async (req, res) => {
  const { id } = req.params
  const usuario = await Usuario.getUsuario(id)
  return res.status(200).json(usuario)
}

export const postUsuario = async (req, res) => {
  const data = validateUsuario(req.body)
  try {
    const usuario = await Usuario.postUsuario(data)
    return res.status(200).json(usuario)
  } catch (e) {
    return res.status(500).json({ message: 'error de insecion de datos' })
  }
}

export const deleteUsuario = async (req, res) => {
  const { id } = req.params
  const { rowCount } = await pool.query(
    'DELETE FROM Usuario WHERE idUsuario = $1 RETURNING *',
    [id]
  )
  if (rowCount === 0) {
    return res.status(404).json({ message: 'User no encontrado' })
  }
  return res.sendStatus(204)
}

export const putUsuario = async (id, { data }) => {
  const { rows } = await pool.query(
    'UPDATE Usuario SET nombre = $1 WHERE idUsuario = $2 RETURNING *',
    [data.nombre, id]
  )
  return rows[0]
}
