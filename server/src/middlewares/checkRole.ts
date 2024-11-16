import { Response, NextFunction } from 'express';
import { CustomRequest } from './authAuthentication'; // Certifique-se de usar a interface correta

export const checkRole = (allowedRoles: string[]) => {
  return (req: CustomRequest, res: Response, next: NextFunction): void => {
    const userRole = req.user?.role; // Acessa o papel do usuário definido no authenticateToken

    if (!userRole || !allowedRoles.includes(userRole)) {
      res.status(403).json({ message: "Access denied for this route" });
      return; // Garante que a execução pare aqui se o acesso for negado
    }

    next(); // Continua para o próximo middleware ou controlador
  };
};
