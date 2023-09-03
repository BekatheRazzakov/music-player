import express from 'express';
import cors from 'cors';
import * as mongoose from 'mongoose';
import artistsRouter from "./Routers/artistsRouter";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use('/artists', artistsRouter);
app.get('', (req, res) => {
  console.log('hello');
})

const run = async () => {
  await mongoose.connect('mongodb://localhost/musicApp');

  app.listen(port, () => console.log(port));

  process.on('exit', () => {
    mongoose.disconnect();
  });
};

void run().catch(e => console.log(e));