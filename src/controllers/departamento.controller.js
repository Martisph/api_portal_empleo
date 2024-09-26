import { Departamento } from '../models/departamento.js'
import { validateDepartamento } from '../schemas/departamento.js'

export const getDepartamentos = async (req, res) => {
  try {
    const departamentos = await Departamento.getAreas()
    return res.status(200).json(departamentos)
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}

export const getDepartamento = async (req, res) => {
  try {
    const departamento = await Departamento.getArea(req.params)
    if (!departamento) {
      return res.status(404).json({ message: ' Dato no encontrado ' })
    }
    return res.status(200).json(departamento)
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}

export const postDepartamento = async (req, res) => {
  try {
    const data = validateDepartamento(req.body)
    const departamento = await Departamento.postArea(data)
    return res.status(200).json(departamento)
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}

export const deleteDepartamento = async (req, res) => {
  try {
    const departamento = await Departamento.deleteArea(req.params)
    if (departamento) {
      return res.status(200).json({ message: 'Categoria de estudio eliminado' })
    }
    return res.status(404).json({ message: 'Categoria de estudio no encontrado' })
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}

export const putDepartamento = async (req, res) => {
  try {
    const data = validateDepartamento(req.body)
    const departamento = await Departamento.putArea(req.params, data)
    return res.json(departamento)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}
