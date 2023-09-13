import express from 'express';
import mongoose from "mongoose";
import Track from "../models/Track";

const tracksRouter = express();

tracksRouter.get('', async (req, res) => {
  const queryParams = req.query.album;
  const tracksByAlbum = await Track.find({ album: queryParams });

  try {
    if (queryParams && tracksByAlbum.length !== 0) {
      return res.send(tracksByAlbum);
    } else if (queryParams && tracksByAlbum.length === 0) {
      return res.sendStatus(404);
    }

    const tracks = await Track.find().sort('trackNumber');
    res.send(tracks);
  } catch {
    res.status(500).send({ error: 'Something went wrong' });
  }
});

tracksRouter.post('', async (req, res, next) => {
  const trackData = {
    title: req.body.title,
    album: req.body.album,
    duration: req.body.duration,
    trackNumber: req.body.trackNumber
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

export default tracksRouter;