import { Request, Response } from 'express';
import {User} from '../../../models';
import { CustomRequest } from '../../middlewares/authAuthentication';

    export const getUser = async (req: CustomRequest, res: Response): Promise<any> => {
        try{
            const idUser = req.user?.idUser;

            const user = await User.findOne({
                where: {idUser: idUser},
                attributes: {exclude: ['password']}
            })

            if(!user) {
                return res.status(404).json({msg: "User not found"});
            }

            return res.status(200).json(user);
        }catch(error) {
            res.status(500).json({msg: "Error: " + error});
        }
    }


