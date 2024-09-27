import { CategoriaEstudio } from '../models/categoria_estudio.js'
import { validateCategoriaEstudio } from '../schemas/categoria_estudio.js'

export const getCategoriaEstudios = async (req, res) => {
  try {
    const categoriaEstudios = await CategoriaEstudio.getCategoriaEstudios()
    return res.status(200).json(categoriaEstudios)
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}

export const getCategoriaEstudio = async (req, res) => {
  try {
    const categoriaEstudio = await CategoriaEstudio.getCategoriaEstudio(req.params)
    if (!categoriaEstudio) {
      return res.status(404).json({ message: ' Categoria de estudio no encontrado ' })
    }
    return res.status(200).json(categoriaEstudio)
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}

export const postCategoriaEstudio = async (req, res) => {
  try {
    const data = validateCategoriaEstudio(req.body)
    const categoriaEstudio = await CategoriaEstudio.postCategoriaEstudio(data)
    return res.status(200).json(categoriaEstudio)
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}

export const deleteCategoriaEstudio = async (req, res) => {
  try {
    const categoriaEstudio = await CategoriaEstudio.deleteCategoriaEstudio(req.params)
    if (categoriaEstudio) {
      return res.status(200).json({ message: ' Categoria de estudio eliminado ' })
    }
    return res.status(404).json({ message: ' Categoria de estudio no eliminado ' })
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}

export const putCategoriaEstudio = async (req, res) => {
  try {
    const data = validateCategoriaEstudio(req.body)
    const categoriaEstudio = await CategoriaEstudio.putCategoriaEstudio(req.params, data)
    return res.json(categoriaEstudio)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}
