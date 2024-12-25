import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import router from './routes/route';
import path from 'path';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/uploads', express.static(path.join(__dirname, '..', 'public', 'uploads')));
app.use(router)

export default app;