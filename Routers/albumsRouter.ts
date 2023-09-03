import express from 'express';
import Album from "../Models/Album";
import {imagesUpload} from "../multer";
import mongoose from "mongoose";

const albumsRouter = express();

albumsRouter.get('', async (req, res) => {
  const queryParams = req.query.artist;
  const albumsByArtist = await Album.find({ artist: queryParams });

  try {
    if (albumsByArtist) {
      return res.send(albumsByArtist);
    }

    const albums = await Album.find();
    res.send(albums);
  } catch {
    res.status(500).send({ error: 'Something went wrong' });
  }
});

albumsRouter.post('', imagesUpload.single('albumCover'), async (req, res, next) => {
  const albumData = {
    title: req.body.name,
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