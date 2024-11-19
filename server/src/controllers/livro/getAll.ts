import { Response } from 'express';
import { Livro } from '../../../models';
import { CustomRequest } from '../../middlewares/authAuthentication';

export const getAll = async (req: CustomRequest, res: Response): Promise<any> => {
    try{
       const livros = await Livro.findAll();

        if(livros.length === 0) {
            return res.status(404).json({msg: "Livros não encontrados"});
        }

        return res.status(200).json(livros);
    }catch(error) {
        res.status(500).json({msg: "Error " + error});
    }
}
