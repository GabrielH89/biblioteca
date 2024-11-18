import { NextFunction, Request, Response } from 'express';
import {User} from '../../../models';
import { CustomRequest } from '../../middlewares/authAuthentication';

export const deleteUserById = async (req: CustomRequest, res: Response, next: NextFunction): Promise<any> => {
    try{
       
        const userId = req.user?.idUser;
        const userToDelete = await User.findOne({where: {idUser: userId}});    
        
        if(!userToDelete) {
            return res.status(404).json({msg: "User not found"});
        }

        await userToDelete.destroy();

        return res.status(200).json({msg: "User deleted with success"});
       
    }catch(error) {
        res.status(500).json({msg: "Error: " + error});
    }
}


