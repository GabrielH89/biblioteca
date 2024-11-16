import { NextFunction, Request, Response } from 'express';
import { User, Aluno, Professor } from '../../../models';
import { CustomRequest } from '../../middlewares/authAuthentication';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const signIn = async (req: CustomRequest, res: Response, next: NextFunction): Promise<any> => {
    try {
        const { email, password } = req.body;

        // Busca o usuário pelo email
        const user = await User.findOne({ where: { email: email } });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(404).json({ msg: "Invalid email or password" });
        }

        // Verifica se o usuário é um aluno ou professor
        let role = '';
        const isAluno = await Aluno.findOne({ where: { idUser: user.idUser } });
        const isProfessor = await Professor.findOne({ where: { idUser: user.idUser } });

        if (isAluno) {
            role = 'aluno';
        } else if (isProfessor) {
            role = 'professor';
        } else {
            return res.status(403).json({ msg: "User role not found" });
        }

        // Gera o token com o ID e o papel do usuário
        const token = jwt.sign(
            { id: user.idUser, role }, // Inclui o papel no token
            process.env.JWT_KEY || 'default_secret',
            { expiresIn: '1h' }
        );

        return res.status(200).json({ msg: "Login successful", token, idUser: user.idUser, role });
    } catch (error) {
        res.status(500).json({ msg: "Error: " + error });
    }
};
