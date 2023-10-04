import express from "express";
import User from "../models/User";
import mongoose from "mongoose";
import auth from "../middleware/auth";
import { OAuth2Client } from "google-auth-library";
import config from "../config";
import { randomUUID } from "crypto";

const usersRouter = express();
const client = new OAuth2Client(config.google.clientId);

usersRouter.post("/", async (req, res, next) => {
  try {
    const user = new User({
      username: req.body.username,
      password: req.body.password,
    });

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

usersRouter.post("/sessions", async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (!user) {
      return res.status(400).send({ error: "Wrong password or username!" });
    }

    const isMatch = await user.checkPassword(req.body.password);

    if (!isMatch) {
      return res.status(400).send({ error: "Wrong password or username!" });
    }

    user.generateToken();
    await user.save();

    res.send({
      message: "Username and password correct!",
      user,
    });
  } catch (e) {
    next(e);
  }
});

usersRouter.post("/google", async (req, res, next) => {
  try {
    const ticket = await client.verifyIdToken({
      idToken: req.body.credential,
      audience: config.google.clientId,
    });

    const payload = ticket.getPayload();

    if (!payload) {
      return res.status(400).send({ error: "Google login error!" });
    }

    const email = payload["email"];
    const googleId = payload["sub"];
    const username = payload["given_name"];
    const displayName = payload["name"];

    if (!email && !username) {
      return res
        .status(400)
        .send({ error: "Not enough user data to continue!" });
    }

    let user = await User.findOne({ googleId });

    if (!user) {
      user = new User({
        username,
        password: randomUUID(),
        googleId,
        displayName,
      });
      return;
    }

    user.generateToken();
    await user.save();
    return res.send({
      message: "Login with Goggle us success!",
      user,
    });
  } catch (e) {
    next(e);
  }
});

usersRouter.delete("/sessions", auth, async (req, res, next) => {
  try {
    const token = req.get("Authorization");

    if (!token) {
      return res.send({ message: "Success" });
    }

    const user = await User.findOne({ token });

    if (!user) {
      return res.send({ message: "Success" });
    }

    user.generateToken();
    user.save();

    return res.send({ message: "Success" });
  } catch (e) {
    next(e);
  }
});

export default usersRouter;
