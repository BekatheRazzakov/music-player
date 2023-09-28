import express from 'express';
import mongoose from "mongoose";
import Album from "../models/Album";
import {imagesUpload} from "../multer";
import {IAlbum} from "../type";
import auth from "../middleware/auth";
import Track from "../models/Track";
import permit from "../middleware/permit";
import tracksRouter from "./tracksRouter";

const albumsRouter = express();

albumsRouter.get('', async (req, res) => {
  try {
    if (req.query.artist) {
      const queryId = req.query.artist as string;
      const result: IAlbum[] = await Album.find({'artist': queryId}).sort('-releaseYear');
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
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).send({ error: 'Id is not provided' });
    }
    const albumById: IAlbum | null = await Album.findById(id);
    if (!albumById) {
      return res.sendStatus(404);
    }
    return res.send(albumById);
  } catch {
    return res.sendStatus (500);
  }
});

albumsRouter.post('', auth, imagesUpload.single('albumCover'), async (req, res, next) => {
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

tracksRouter.patch('/:id/togglePublished', auth, permit('admin'), async (req, res) => {
  try {
    const albumId = req.params.id;
    const albumById = await Album.findById(albumId);

    if (!albumById) {
      return res.status(404).send({ error: 'Track not found' });
    }

    albumById.isPublished = !albumById.isPublished;
    albumById.save();
    return res.send(
      {
        message: `Album switched to ${albumById.isPublished ? 'published mode' : 'not published mode'}`
      });
  } catch {
    return res.status(500);
  }
});

albumsRouter.delete('/:id',auth, permit('admin'), async (req, res) => {
  try {
    const albumId = req.params.id;
    const albumById = await Album.findById(albumId);

    if (!albumById) {
      return res.status(404).send({ error: 'Album not found' });
    }

    const tracksByAlbum = await Track.find({ album: albumId });

    if (tracksByAlbum.length) {
      return res.send({ message: 'The album should be empty before deleting it' });
    }

    await Album.deleteOne({ _id: albumId });
    return res.send({ message: 'Album deleted' });
  } catch {
    return res.sendStatus(500);
  }
});

export default albumsRouter;