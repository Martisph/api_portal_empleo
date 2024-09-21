import {Pais} from '../models/pais.js'
import { pool } from "../database/db.js"
import z, { object } from 'zod'


export const getPaises = async (req, res) => {
    const row = Pais.getPaises(req, res)
    return row
};

export const getPais = async (req, res) => {
    
    try {
        Pais.getPais(req, res);
    } catch (e) {
        return res.status(500).json({ message: "error de registro de datos" });
    }
};
// mic 40 filtrosconsole.log(paisSchema)
export const postPais = async (req, res) => {
    try{
        Pais.postPais(req, res);
    }catch(e){
        return res.status(500).json({'message': 'error de registro de datos'})
    }
};

export const deletePais = async (req, res) => {
    try {
        Pais.deletePais(req, res);
    } catch (e) {
        return res.status(500).json({ message: "error de registro de datos" });
    }
};

export const putPais = async (req, res) => {
    const paisSchema = z.object({
        nombre: z.string(),
    });
    console.log(paisSchema.safeParse(req.body));
    try {
        Pais.putPais(req, res);
    } catch (e) {
        return res.status(500).json({ message: "error de registro de datos" });
    }
};
