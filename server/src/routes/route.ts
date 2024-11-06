import express from 'express';
import userContoller from "../controllers/userContoller";
import { authenticateToken } from '../middlewares/authAuthetication';

const router = express.Router();

//Routes for user
router.post("/signup", userContoller.signUp);
router.delete("/users/:idUser", authenticateToken, userContoller.deleteUserById);

export default router;