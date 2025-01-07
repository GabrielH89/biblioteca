import { NextFunction, Response } from 'express';
import { Livro, Professor, User } from '../../../models';
import { CustomRequest } from '../../middlewares/authAuthentication';
import path from 'path';
import fs from 'fs';

export const deleteUserById = async (req: CustomRequest, res: Response, next: NextFunction): Promise<any> => {
    try {
        const userId = req.user?.idUser;

        // Verificar se o usuário existe
        const userToDelete = await User.findOne({ where: { idUser: userId } });
        if (!userToDelete) {
            return res.status(404).json({ msg: "User not found" });
        }

        // Verificar se o usuário é um professor
        const professor = await Professor.findOne({ where: { idUser: userId } });
        if (professor) {
            const idProfessor = professor.idProfessor;

            // Buscar livros associados ao professor
            const livros = await Livro.findAll({ where: { idProfessor } });

            const uploadDirectory = path.resolve(__dirname, '../../../public/uploads');
            await Promise.all(
                livros.map(async (livro) => {
                    const filePath = path.join(uploadDirectory, livro.capa);
                    if (fs.existsSync(filePath)) {
                        try {
                            await fs.promises.unlink(filePath);
                        } catch (error) {
                            console.error(`Erro ao excluir arquivo: ${filePath}`, error);
                        }
                    }
                })
            );

            // Excluir livros do banco de dados
            await Livro.destroy({ where: { idProfessor } });
        }

        // Excluir o usuário do banco de dados
        await userToDelete.destroy();

        return res.status(200).json({ msg: "User deleted with success" });
    } catch (error) {
        console.error("Erro ao deletar usuário:", error);
        return res.status(500).json({ msg: "An error occurred while deleting the user" });
    }
};
