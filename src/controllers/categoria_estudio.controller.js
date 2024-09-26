import { CategoriaEstudio } from '../models/categoria_estudio.js'
import { validateCategoriaEstudio } from '../schemas/categoria_estudio.js'

export const getCategoriaEstudios = async (req, res) => {
  try {
    const categoriaEstudios = await CategoriaEstudio.getAreas()
    return res.status(200).json(categoriaEstudios)
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}

export const getCategoriaEstudio = async (req, res) => {
  try {
    const categoriaEstudio = await CategoriaEstudio.getArea(req.params)
    if (!categoriaEstudio) {
      return res.status(404).json({ message: ' Dato no encontrado ' })
    }
    return res.status(200).json(categoriaEstudio)
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}

export const postCategoriaEstudio = async (req, res) => {
  try {
    const data = validateCategoriaEstudio(req.body)
    const categoriaEstudio = await CategoriaEstudio.postArea(data)
    return res.status(200).json(categoriaEstudio)
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}

export const deleteCategoriaEstudio = async (req, res) => {
  try {
    const categoriaEstudio = await CategoriaEstudio.deleteArea(req.params)
    if (categoriaEstudio) {
      return res.status(200).json({ message: 'Categoria de estudio eliminado' })
    }
    return res.status(404).json({ message: 'Categoria de estudio no encontrado' })
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}

export const putCategoriaEstudio = async (req, res) => {
  try {
    const data = validateCategoriaEstudio(req.body)
    const categoriaEstudio = await CategoriaEstudio.putArea(req.params, data)
    return res.json(categoriaEstudio)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}
