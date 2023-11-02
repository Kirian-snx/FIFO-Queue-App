import express from 'express';
import cors from 'cors';
import actionsRouter from './routes/actions';
import creditsRouter from './routes/credits';

const app = express();
const port = 3030;

// @TODO: Add middleware to log all requests
// app.use((req, res, next) => {
//   console.log(`${req.method} ${req.url}`);
//   next();
// });

app.use(cors());
app.use(express.json());

app.use('/actions', actionsRouter);
app.use('/credits', creditsRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;
