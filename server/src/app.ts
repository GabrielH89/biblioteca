import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import router from './routes/route';

const app = express();
app.use(cors());
app.use(express.json());
app.use(router)

export default app;