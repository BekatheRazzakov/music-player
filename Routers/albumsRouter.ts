import express from 'express';
import mongoose from "mongoose";
import Album from "../Models/Album";
import {imagesUpload} from "../multer";

const albumsRouter = express();

albumsRouter.get('', async (req, res) => {
  const queryParams = req.query.artist;
  const albumsByArtist = await Album.find({ artist: queryParams });

  try {
    if (queryParams && albumsByArtist.length !== 0) {
      return res.send(albumsByArtist);
    } else if (queryParams && albumsByArtist.length === 0) {
      return res.sendStatus(404);
    } else if (Object.keys(req.query).length !== 0 && !queryParams) {
      return res.status(400).send({ error: "It's possibly wrong query param keyname given" });
    }

    const albums = await Album.find();
    res.send(albums);
  } catch {
    res.status(500).send({ error: 'Something went wrong' });
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