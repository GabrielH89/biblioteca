import { NextFunction, Request, Response } from 'express';
import {User, Aluno, Professor} from '../../../models';

export const createForAluno = async (req: Request, res: Response) => {
    try{
        res.status(200).json({msg: "Hello, aluno"});
    }catch(error) {
        res.status(500).json({msg: "Error " + error});
    }
}
