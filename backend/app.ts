import express, { Request, Response } from 'express';
import cors from 'cors';
import logger from 'morgan';
import dotenv from 'dotenv';

import boardsRouter from './routes/api/boards';
import cardsRouter from './routes/api/cards';
import { RequestError } from './utils/requestError';

dotenv.config();

const app = express();

const formatLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatLogger));
app.use(cors());
app.use(express.json());

app.use('/api/boards', boardsRouter);

app.use('/api/cards', cardsRouter);

app.use((req: Request, res: Response) => {
  const error = new Error('Not Found');
  res.status(404).json({ message: error.message });
});

app.use((error: RequestError, req: Request, res: Response) => {
  res.status(error.status || 500).json({
    message: error.message || 'Server error',
  });
});

export default app;
