import express from 'express';
import mongoose from "mongoose";
import Track from "../models/Track";
import Album from "../models/Album";
import {IAlbum, ITrack} from "../type";
import auth from "../middleware/auth";
import permit from "../middleware/permit";

const tracksRouter = express();

tracksRouter.get('', async (req, res) => {
  try {
    if (req.query.album) {
      const queryId = req.query.album as string;
      const result: ITrack[] = await Track.find({'album': queryId}).sort('trackNumber');
      const album: IAlbum | null = await Album.findOne({ _id: req.query.album }).populate('artist');
      return res.send({ tracks: result, album });
    } else {
      const result = await Track.find();
      return res.send(result);
    }
  } catch {
    return res.sendStatus (500);
  }
});

tracksRouter.post('', auth, async (req, res, next) => {
  const trackData = {
    title: req.body.title,
    album: req.body.album,
    duration: req.body.duration,
    trackNumber: req.body.trackNumber,
  };

  const track = new Track(trackData);

  try {
    await track.save();
    return res.send(track);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    }
    next(e);
  }
});

tracksRouter.patch('/:id/togglePublished', auth, permit('admin'), async (req, res) => {
  try {
    const trackId = req.params.id;
    const trackById = await Track.findById(trackId);

    if (!trackById) {
      return res.status(404).send({ error: 'Track not found' });
    }

    trackById.isPublished = !trackById.isPublished;
    trackById.save();
    return res.send(
      {
        message: `Track switched to ${trackById.isPublished ? 'published mode' : 'not published mode'}`
      });
  } catch {
    return res.status(500);
  }
});

tracksRouter.delete('/:id', auth, permit('admin'), async (req, res) => {
  try {
    const trackId = req.params.id;
    const trackById = await Track.findById(trackId);

    if (!trackById) {
      return res.status(404).send({ error: 'Track not found' });
    }

    await Track.deleteOne({ _id: trackId });
    return res.send({ message: 'Track deleted' });
  } catch {
    return res.sendStatus(500);
  }
});

export default tracksRouter;