import { Response } from 'express';
import {Professor, Livro} from '../../../models';
import { CustomRequest } from '../../middlewares/authAuthentication';
import path from 'path';
import fs from 'fs';

export const deleteById = async (req: CustomRequest, res: Response): Promise<any> => {
    try{
        const idUser = req.user?.idUser;
        const idLivro = req.params.id;

        const professor = await Professor.findOne({where: { idUser: idUser }});

        const idProfessor = professor.idProfessor;

        const livro = await Livro.findOne({
            where: {
                idLivro: idLivro,
                idProfessor: idProfessor,
            }
        });

        const isLivroExists = await Livro.findAll({where: {idLivro}});

        if(isLivroExists.length > 0 && !livro) {
            return res.status(400).json({msg: "Este livro existe mas você não pode exclui-lo"});
        }

        if(!livro) {
            return res.status(404).json({msg: "Este livro não existe"});
        }
        
        const livroPath = await path.join(__dirname, `../../../public/uploads/${livro.capa}`)

        if (fs.existsSync(livroPath)) {
            try {
                await fs.promises.unlink(livroPath); // Usando unlink assíncrono
            } catch (error) {
                return res.status(400).json({ msg: "Erro ao excluir arquivo", error });
            }
        }
        await Livro.destroy({where: {idLivro}});
        
        return res.status(200).json({msg: "Livro excluído com sucesso"});
    }catch(error) {
        res.status(500).json({msg: "Error " + error});
    }
}
