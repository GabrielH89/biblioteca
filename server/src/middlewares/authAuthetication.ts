import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface CustomRequest extends Request {
    user?: {
        idUser: number;
    };
}

export const authenticateToken = (req: CustomRequest, res: Response, next: NextFunction): void => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        res.sendStatus(401); // Não autorizado
        return; // Retorna para garantir que não continue
    }

    jwt.verify(token, process.env.JWT_KEY || 'default_secret', (err, decoded) => {
        if (err) {
            res.sendStatus(403); // Proibido
            return; // Retorna para garantir que não continue
        }

        if (decoded && typeof decoded !== 'string') {
            req.user = { idUser: (decoded as { id: number }).id }; // Adiciona a informação do usuário à requisição
        }

        next(); // Passa para o próximo middleware/rota
    });
};
