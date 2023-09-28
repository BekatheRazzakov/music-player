import express from "express";
import User from "../models/User";
import mongoose from "mongoose";
import auth from "../middleware/auth";

const usersRouter = express();

usersRouter.post('/', async (req, res, next) => {
  try {
    const user = new User({
      username: req.body.username,
      password: req.body.password,
    });

    const userExists = await User.findOne({ username: user.username });

    if (userExists) {
      return res.send({ error: 'Username is already taken' });
    }

    user.generateToken();

    await user.save();
    return res.send(user);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    }

    return next(e);
  }
});

usersRouter.post('/sessions', async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (!user) {
      return res.status(401).send({ error: 'Wrong username' });
    }

    const isMatch = await user.checkPassword(req.body.password);

    if (!isMatch) {
      return res.status(401).send({ error: 'Wrong password!' });
    }

    user.generateToken();
    await user.save();

    res.send(user);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    }

    return next(e);
  }
});

usersRouter.delete('/logout', auth, async (req, res, next) => {
  try {
    const token = req.get('Authorization');

    if (!token) {
      return res.send({message: 'Success'});
    }

    const user = await User.findOne({token});

    if (!user) {
      return res.send({message: 'Success'});
    }

    user.generateToken();
    user.save();
    return res.send({message: 'SUCCESS'});
  } catch (e) {
    next(e);
  }
});

export default usersRouter;