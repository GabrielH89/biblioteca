import { NextFunction, Request, Response } from 'express';
import {User, Aluno, Professor} from '../../../models';
import bcrypt from 'bcrypt';

const isValidEmail = (email: string) => {
    const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z.-]+\.[a-zA-Z]{2,4}$/;
    return regexEmail.test(email);
}

const isValidPassword = (password: string) => {
    const regexPassword = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*]).{6,}$/;
    return regexPassword.test(password);
}

export const signUp = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try{
        const {name, email, telefone, password, role, disciplina, matricula } = req.body;

        if (!name || !email || !password || !role) {
            return res.status(400).json({ msg: "Please fill all required inputs" });
        }

        if(!isValidEmail(email)) {
            return res.status(400).json({msg: "Invalid email"});
        }

        if(!isValidPassword(password)) {
            return res.status(400).json({msg: "Invalid password"});
        }

        if (role !== 'aluno' && role !== 'professor') {
            return res.status(400).json({ msg: "Invalid role" });
        }

        if(role === 'aluno' && disciplina) {
            return res.status(400).json({msg: "Aluno cannot has disciplina"});
        }

        if(role === 'professor' && matricula) {
            return res.status(400).json({msg: "Professor cannot has matricula"});
        }

        const isEmailExists = await User.findOne({where: {email}});

        if (isEmailExists) {
            return res.status(400).json({msg: "User already exists"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, telefone, password: hashedPassword });

        if (role === 'aluno') {
            await Aluno.create({ idUser: user.idUser, matricula });
        } else if (role === 'professor') {
            await Professor.create({ idUser: user.idUser, disciplina });
        }
        
        res.status(201).json({msg: "User created with success", user});
    }catch(error) {
        res.status(500).json({msg: "Error: " + error});
    }
}


