import { Empresa } from '../models/empresa.js'
import { validateEmpresa, validatePartialEmpresa } from '../schemas/empresa.js'

export const getEmpresas = async (req, res) => {
  try {
    const empresas = await Empresa.getEmpresas()
    return res.status(200).json(empresas)
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}

export const getEmpresaBasicInfo = async (req, res) => {
  try {
    const empresa = await Empresa.getEmpresaBasicInfo(req.params)
    if (!empresa) {
      return res.status(404).json({ message: ' Empresa no encontrado ' })
    }
    return res.status(200).json(empresa)
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}
export const getEmpresa = async (req, res) => {
  try {
    const empresa = await Empresa.getEmpresa(req.params)
    if (!empresa) {
      return res.status(404).json({ message: ' Empresa no encontrado ' })
    }
    return res.status(200).json(empresa)
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}

export const postEmpresa = async (req, res) => {
  try {
    const data = validateEmpresa(req.body)
    const empresa = await Empresa.postEmpresa(data)
    return res.status(200).json(empresa)
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}

export const deleteEmpresa = async (req, res) => {
  try {
    const empresa = await Empresa.deleteEmpresa(req.params)
    if (empresa) {
      return res.status(200).json({ message: ' Empresa eliminado ' })
    }
    return res.status(404).json({ message: ' Empresa no eliminado ' })
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}

export const putEmpresa = async (req, res) => {
  try {
    const data = validatePartialEmpresa(req.body)
    const empresa = await Empresa.putEmpresa(req.params, data)
    return res.json(empresa)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}
