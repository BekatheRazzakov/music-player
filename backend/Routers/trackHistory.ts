import express from "express";
import User from "../models/User";
import TrackHistory from "../models/TrackHistory";
import Track from "../models/Track";
import mongoose from "mongoose";
import {IGetSingleTrackHistory} from "../type";

const trackHistoryRouter = express();

trackHistoryRouter.get('', async (req, res) => {
  try {
    const token = req.get('Authorization');
    const user = await User.findOne({ token });
    if (!user) {
      return res.sendStatus(404);
    }

    const tracksByUser = await TrackHistory.find({ user: user._id }).sort('-datetime')
      .populate({path: 'track', populate: {path: 'album',  populate: {path: 'artist', select: 'name'}},}) as IGetSingleTrackHistory[];

    res.send(tracksByUser.slice(0, 30));
  } catch {
    return res.sendStatus(500);
  }
});

trackHistoryRouter.post('', async (req, res, next) => {
  try {
    const token = req.get('Authorization');

    const user = await User.findOne({ token });

    if (!user) {
      return res.status(401).send({ error: 'Unauthorized' });
    }

    const existingTrack = await Track.findOne({ _id: req.body.track });

    if (!existingTrack) {
      return res.status(404).send({ error: 'Track is not found!' });
    }

    const track = new TrackHistory({
      user: user._id,
      track: req.body.track,
      datetime: new Date()
    });

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