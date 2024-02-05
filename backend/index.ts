import express from "express";
import cors from "cors";
import * as mongoose from "mongoose";
import artistsRouter from "./Routers/artistsRouter";
import albumsRouter from "./Routers/albumsRouter";
import tracksRouter from "./Routers/tracksRouter";
import usersRouter from "./Routers/usersRouter";
import trackHistoryRouter from "./Routers/trackHistory";
import config from "./config";

const app = express();
const port = 8000;
const corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use("/artists", artistsRouter);
app.use("/albums", albumsRouter);
app.use("/tracks", tracksRouter);
app.use("/users", usersRouter);
app.use("/track_history", trackHistoryRouter);

const run = async () => {
  void mongoose.connect(config.db);

  app.listen(port, () => console.log(port));

  process.on("exit", () => {
    mongoose.disconnect();
  });
};

void run().catch((e) => console.log(e));
