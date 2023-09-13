import express from "express";
import User from "../Models/User";
import mongoose from "mongoose";

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

usersRouter.post('/sessions', async (req, res) => {
  const user = await User.findOne({ username: req.body.username });

  if (!user) {
    return res.status(401).send({ error: 'Wrong username or password!' });
  }

  const isMatch = await user.checkPassword(req.body.password);

  if (!isMatch) {
    return res.status(401).send({ error: 'Wrong username or password!' });
  }

  user.generateToken();
  await user.save();

  res.send({ message: 'Authentication passed!' });
});

export default usersRouter;