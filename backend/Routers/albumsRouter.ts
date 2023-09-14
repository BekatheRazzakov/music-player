import express from 'express';
import mongoose from "mongoose";
import Album from "../models/Album";
import {imagesUpload} from "../multer";

const albumsRouter = express();

albumsRouter.get('', async (req, res) => {
  try {
    if (req.query.artist) {
      const queryId = req.query.artist as string;
      const result = await Album.find({'artist': queryId}).sort('-releaseYear');
      return res.send(result);
    } else {
      const result = await Album.find();
      return res.send(result);
    }
  } catch {
    return res.sendStatus (500);
  }
});

albumsRouter.get('/:id', async (req, res) => {
  const id = req.params.id;
  const albumById = await Album.findById(id);
  if (id) {
    return res.send(albumById);
  } else if (id && !albumById) {
    return res.sendStatus(404);
  }
});

albumsRouter.post('', imagesUpload.single('albumCover'), async (req, res, next) => {
  const albumData = {
    title: req.body.title,
    artist: req.body.artist,
    releaseYear: req.body.releaseYear,
    albumCover: req.file ? req.file.filename : null,
  };

  const album = new Album(albumData);

  try {
    await album.save();
    return res.send(album);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    }
    next(e);
  }
});

export default albumsRouter;