import { Empresa } from '../models/empresa.js'
import { validateEmpresa } from '../schemas/empresa.js'

export const getEmpresas = async (req, res) => {
  try {
    const empresas = await Empresa.getAreas()
    return res.status(200).json(empresas)
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}

export const getEmpresa = async (req, res) => {
  try {
    const empresa = await Empresa.getArea(req.params)
    if (!empresa) {
      return res.status(404).json({ message: ' Dato no encontrado ' })
    }
    return res.status(200).json(empresa)
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}

export const postEmpresa = async (req, res) => {
  try {
    const data = validateEmpresa(req.body)
    const empresa = await Empresa.postArea(data)
    return res.status(200).json(empresa)
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}

export const deleteEmpresa = async (req, res) => {
  try {
    const empresa = await Empresa.deleteArea(req.params)
    if (empresa) {
      return res.status(200).json({ message: 'Categoria de estudio eliminado' })
    }
    return res.status(404).json({ message: 'Categoria de estudio no encontrado' })
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}

export const putEmpresa = async (req, res) => {
  try {
    const data = validateEmpresa(req.body)
    const empresa = await Empresa.putArea(req.params, data)
    return res.json(empresa)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}
