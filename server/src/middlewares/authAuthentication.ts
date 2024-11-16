import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface CustomRequest extends Request {
    user?: {
        idUser: number;
        role: string; // Adiciona o papel do usuário
    };
}

export const authenticateToken = (req: CustomRequest, res: Response, next: NextFunction): void => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        res.sendStatus(401); // Não autorizado
        return;
    }

    jwt.verify(token, process.env.JWT_KEY || 'default_secret', (err, decoded) => {
        if (err) {
            res.sendStatus(403); // Proibido
            return;
        }

        if (decoded && typeof decoded !== 'string') {
            const { id, role } = decoded as { id: number; role: string };
            req.user = { idUser: id, role }; // Adiciona o ID e o papel do usuário à requisição
        }

        next(); // Passa para o próximo middleware/rota
    });
};
