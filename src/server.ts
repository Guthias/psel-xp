import 'express-async-errors';
import express from 'express';
import errorMiddleware from './middlewares/ErrorsMiddleware';

import routes from './routes';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(routes);
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
