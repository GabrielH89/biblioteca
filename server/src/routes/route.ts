import express from 'express';
import userContoller from "../controllers/userContoller";

const router = express.Router();

router.post("/signup", userContoller.signUp);

export default router;