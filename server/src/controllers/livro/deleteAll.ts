import { Response } from 'express';
import {Professor, Livro} from '../../../models';
import { CustomRequest } from '../../middlewares/authAuthentication';
import path from 'path';
import fs from 'fs';

export const deleteAll = async (req: CustomRequest, res: Response): Promise<any> => {
    try{
        const idUser = req.user?.idUser;

        const professor = await Professor.findOne({where: { idUser: idUser }});

        const idProfessor = professor.idProfessor;

        const livros = await Livro.findAll({where: {idProfessor}});

        if(livros.length === 0) {
            return res.status(404).json({msg: "Não há livros para deletar"});
        }

        const uploadDirectory = path.resolve(__dirname, '../../../public/uploads');
        await Promise.all(livros.map(async (livro) => {
            const filePath = path.join(uploadDirectory, livro.capa);
            if(fs.existsSync(filePath)) {
                try{
                    await fs.promises.unlink(filePath);
                }catch(error) {
                    res.status(400).json({msg: "Erro ao incluir arquivo ", error});
                }
            }
        }));

        await Livro.destroy({where: {idProfessor}});
        return res.status(200).json({msg: "Livro(s) excluído(s) com sucesso"});
    }catch(error) {
        res.status(500).json({msg: "Error " + error});
    }
}
