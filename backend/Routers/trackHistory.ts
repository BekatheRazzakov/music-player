import express from "express";
import User from "../models/User";
import TrackHistory from "../models/TrackHistory";
import Track from "../models/Track";
import mongoose from "mongoose";

const trackHistoryRouter = express();

trackHistoryRouter.post('', async (req, res, next) => {
  try {
    const token = req.get('Authorization');

    const user = await User.findOne({ token });

    if (!user) {
      return res.status(401).send({ error: 'Unauthorized' });
    }

    const track = new TrackHistory({
      user: req.body.user,
      track: req.body.track,
      datetime: new Date()
    });

    const existingTrack = await Track.findOne({ _id: req.body.track });


    if (user._id.toString() !== req.body.user) {
      return res.status(404).send({ error: 'User is not found!' });
    }

    if (!existingTrack) {
      return res.status(404).send({ error: 'Track is not found!' });
    }

    await track.save();
    return res.send(track);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    }

    return next(e);
  }
});

export default trackHistoryRouter;