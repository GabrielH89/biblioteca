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
router.get("/users", authenticateToken, userContoller.getUser);

//Routes for livro
router.post("/livros", authenticateToken, checkRole(["professor"]), livroController.create);
router.delete("/livros", authenticateToken, checkRole(["professor"]), livroController.deleteAll);
router.delete("/livros/:id", authenticateToken, checkRole(["professor"]), livroController.deleteById);
router.get("/livros", authenticateToken, livroController.getAll);

export default router;