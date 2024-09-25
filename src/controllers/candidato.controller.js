import { Candidato } from '../models/candidato.js'

export const getCandidatos = async (req, res) => {
  try {
    const candidatos = await Candidato.getCandidatos()
    return res.status(200).json(candidatos)
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}

export const getCandidato = async (req, res) => {
  try {
    const candidato = await Candidato.getCandidato(req.params)
    return res.status(200).json(candidato)
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}

export const postCandidato = async (req, res) => {
  try {
    const candidato = await Candidato.postCandidato(req.body)
    return res.status(200).json(candidato)
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}

export const deleteCandidato = async (req, res) => {
  try {
    const candidato = Candidato.deleteCandidato(req.params)
    if (candidato) return res.status(200).json(candidato)
    return res.status(404).json({ message: 'candidato no encontrado' })
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}

export const putCandidato = async (req, res) => {
  try {
    const candidato = Candidato.putCandidato(req.params, req.body)
    return res.status(200).json(candidato)
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}
