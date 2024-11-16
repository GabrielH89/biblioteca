import express from 'express';
import userContoller from "../controllers/userContoller";
import { authenticateToken } from '../middlewares/authAuthentication';
import { checkRole } from '../middlewares/checkRole';
import livroController from '../controllers/livroController';

const router = express.Router();

//Routes for user
router.post("/users/register", userContoller.signUp);
router.post("/users/login", userContoller.signIn);
router.delete("/users/delete", authenticateToken, userContoller.deleteUserById);

router.get("/books", authenticateToken, checkRole(["professor"]), livroController.createForProfessor)
router.get("/booksAluno", authenticateToken, checkRole(["aluno"]), livroController.createForAluno)
export default router;