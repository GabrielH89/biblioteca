import { NextFunction, Request, Response } from 'express';
import {User, Professor, Livro} from '../../../models';
import { CustomRequest } from '../../middlewares/authAuthentication';
import upload from '../../middlewares/multerConfig';

export const create = async (req: CustomRequest, res: Response) => {
    try{
        upload.single('capa')(req, res, async (err: any) => {
            if (err) {
                return res.status(400).json({ error: err.message });
            }

            if (!req.file) {
                return res.status(400).json({ error: 'Nenhuma foto carregada' });
            }

            const {titulo, autor, editora, ano_publicacao, genero} = req.body;
            const capa = req.file.filename;
            const idUser = req.user?.idUser;

            if (!idUser) {
                return res.status(400).json({ error: 'ID do professor não encontrado' });
            }

            const professor = await Professor.findOne({
                where: { idUser: idUser },
            });

            if (!professor) {
                return res.status(400).json({ error: 'Professor não encontrado para o usuário' });
            }

            const idProfessor = professor.idProfessor;

            if(!titulo || !autor || !capa || !genero) {
                return res.status(400).json({msg: "Preencha todos os campos obrigatórios"});
            }

            const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
            
            const newImage = await Livro.create({
                titulo, autor, capa, editora, ano_publicacao, genero, idProfessor,
            })

            return res.status(201).json({msg: "Livro criado com sucesso", newImage})
        })
    }catch(error) {
        res.status(500).json({msg: "Error " + error});
    }
}
