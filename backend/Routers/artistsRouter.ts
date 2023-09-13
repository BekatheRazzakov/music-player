import express from 'express';
import mongoose from "mongoose";
import Artist from "../models/Artist";
import {imagesUpload} from "../multer";

const artistsRouter = express();

artistsRouter.get('', async (req, res) => {
  try {
    const artists = await Artist.find();
    res.send(artists);
  } catch {
    res.status(500).send({ error: 'Something went wrong' });
  }
});

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