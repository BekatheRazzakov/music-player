import express from 'express';
import Artist from "../Models/Artist";
import {imagesUpload} from "../multer";
import mongoose from "mongoose";

const artistsRouter = express();

artistsRouter.get('', async (req, res) => {
  try {
    const artists = await Artist.find();
    res.send(artists);
  } catch (err) {
    res.status(500).send({ error: 'Something went wrong' });
  }
});

const run = async () => {
  const artistData = {
    name: 'Beka',
    image: null,
    info: 'info'
  };

  const artist = new Artist(artistData);
  await artist.save();
};

void run();

artistsRouter.post('', imagesUpload.single('image'), async (req, res, next) => {
  const artistData = {
    name: req.body.name,
    image: req.file ? req.file?.filename : null,
    info: req.body.info
  };

  const artist = new Artist(artistData);

  try {
    await artist.save();
    res.send(artist);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    }
    next(e);
  }
});

export default artistsRouter;