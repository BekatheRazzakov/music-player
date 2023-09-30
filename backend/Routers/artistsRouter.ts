import express from "express";
import mongoose from "mongoose";
import Artist from "../models/Artist";
import { imagesUpload } from "../multer";
import { IArtist } from "../type";
import auth from "../middleware/auth";
import Album from "../models/Album";
import permit from "../middleware/permit";

const artistsRouter = express();

artistsRouter.get('', async (_, res) => {
  try {
    const artists: IArtist[] = await Artist.find();
    res.send(artists);
  } catch {
    res.status(500).send({ error: 'Something went wrong' });
  }
});

artistsRouter.post('', auth, imagesUpload.single('image'), async (req, res, next) => {
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

artistsRouter.patch('/:id/togglePublished', auth, permit('admin'), async (req, res) => {
  try {
    const artistId = req.params.id;
    const artistById = await Artist.findById(artistId);

    if (!artistById) {
      return res.status(404).send({ error: 'Track not found' });
    }

    artistById.isPublished = !artistById.isPublished;
    artistById.save();
    return res.send(
      {
        message: `Album switched to ${artistById.isPublished ? 'published mode' : 'not published mode'}`
      });
  } catch {
    return res.status(500);
  }
});

artistsRouter.delete('/:id', auth, permit('admin'), async (req, res) => {
  try {
    const artistId = req.params.id;
    const artistById = await Artist.findById(artistId);

    if (!artistById) {
      return res.status(404).send({ error: 'Artist not found' });
    }

    const albumsByArtist = await Album.find({ artist: artistId });

    if (albumsByArtist.length) {
      return res.send({ message: "Artist must have empty albums list before deleting artist" });
    }

    await Artist.deleteOne({ _id: artistId });
    return res.send({ message: 'Artist deleted' });
  } catch {
    return res.status(500);
  }
});

export default artistsRouter;