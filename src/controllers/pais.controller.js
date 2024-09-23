import {Pais} from '../models/pais.js'
import { validatePais } from '../schemas/pais.js';


export const getPaises = async (req, res) => {
    const row = await Pais.getPaises()
    return res.status(200).json(row)
};

export const getPais = async (req, res) => {
    const {id} = req.params
    try {
        const pais = await Pais.getPais(id);
        return res.status(200).json(pais)
    } catch (e) {
        return res.status(500).json({ message: "error de registro de datos" });
    }
};

export const postPais = async (req, res) => {
    const data = validatePais(req.body);
    try{
        const pais = await Pais.postPais(data);
        return res.status(200).json(pais)
    }catch(e){
        return res.status(500).json({'message': 'error de registro de datos'})
    }
};

export const deletePais = async (req, res) => {
    const {id}= req.params
    try {
        const pais = await Pais.deletePais(id);
        return res.status(200).json(pais)
    } catch (e) {
        return res.status(500).json(pais);
    }
};

export const putPais = async (req, res) => {
    const { id } = req.params;
    const data = validatePais(req.body);
    try {
        const edit = await Pais.putPais(id, data);
        if(edit){
            console.log(edit)
            return res.status(200).json(edit);
        }
        
    } catch (e) {
        return res.status(500).json({ message: "error de registro de datos" });
    }
};
