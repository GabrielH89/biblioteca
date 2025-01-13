import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { Professor, Livro } from '../../../models';
import { CustomRequest } from '../../middlewares/authAuthentication';
import upload from '../../middlewares/multerConfig';

export const updateById = async (req: CustomRequest, res: Response): Promise<any> => {
    try {
        const { id } = req.params; // ID do livro
        const idUser = req.user?.idUser;
        let capa: string | undefined;

        if (!idUser) {
            return res.status(400).json({ error: 'ID do professor não encontrado' });
        }

        const professor = await Professor.findOne({
            where: { idUser },
        });

        if (!professor) {
            return res.status(400).json({ error: 'Professor não encontrado para o usuário' });
        }

        const livro = await Livro.findOne({
            where: { idLivro: id, idProfessor: professor.idProfessor },
        });

        if (!livro) {
            return res.status(404).json({ error: 'Livro não encontrado ou não pertence ao professor' });
        }

        // Processa o upload do arquivo
        upload.single('capa')(req, res, async (err: any) => {
            if (err) {
                return res.status(400).json({ error: err.message });
            }

            const { titulo, autor, editora, ano_publicacao, genero } = req.body;

            if (!titulo || !autor || !genero) {
                return res.status(400).json({ msg: "Preencha todos os campos obrigatórios" });
            }

            if (!req.file) {
                capa = livro.capa;
            }else{
                capa = req.file.filename;
                // Apagar a imagem antiga
                const oldImagePath = path.join(__dirname, '../../../public/uploads', livro.capa);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }

            await Livro.update(
                { titulo, autor, capa, editora, ano_publicacao, genero },
                { where: { idLivro: id } }
            );

            const updatedLivro = await Livro.findOne({ where: { idLivro: id } });

            return res.status(200).json({ msg: "Livro atualizado com sucesso", livro: updatedLivro });
        });
    } catch (error) {
        res.status(500).json({ msg: "Erro interno do servidor: " + error });
    }
};
