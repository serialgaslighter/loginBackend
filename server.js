import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import mongoose from 'mongoose';

import { errorHandler } from './src/middleware/errorHandler.js';
import { invalidPathHandler } from './src/middleware/invalidPath.js';
import { userRouter } from './src/routes/userRouter.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const PORT = 3000;
const MONGO_DB_URI = process.env.MONGO_DB_URI;

app.use('/user', userRouter)

app.use('*', invalidPathHandler);
app.use(errorHandler);

mongoose
  .connect(MONGO_DB_URI)
  .then(() => {
    console.log('Connected to database! ✅');
    app.listen(PORT, () => {
      console.log(`Server running on ${PORT}.`);
    })
  })
  .catch(error => {
    console.error(error);
    process.exit(1);
  })
mongoose.connection.on('error', () => {
  console.error(error);
})