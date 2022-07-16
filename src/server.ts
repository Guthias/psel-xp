import express from 'express';
import { StatusCodes } from 'http-status-codes';

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/', (_req, res) => {
  res.status(StatusCodes.OK).json({ message: 'Rotas funcionando' });
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
