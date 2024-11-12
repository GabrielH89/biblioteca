import { NextFunction, Request, Response } from 'express';
import {User, Aluno, Professor} from '../../../models';
import { CustomRequest } from '../../middlewares/authAuthetication';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const signIn = async (req: CustomRequest, res: Response, next: NextFunction): Promise<any> => {
    try{
        const {email, password} = req.body;

        const user = await User.findOne({where: {email: email}});

        if(!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(404).json({msg: "Invalid email or password"});
        }

        const token = jwt.sign({ id: user.idUser }, process.env.JWT_KEY || 'default_secret', {
            expiresIn: '1h', // O token expira em 1 hora
        });

        return res.status(200).json({msg: "Login successful", token, idUser: user.idUser});
       
    }catch(error) {
        res.status(500).json({msg: "Error: " + error});
    }
}


