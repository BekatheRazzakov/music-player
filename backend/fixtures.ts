import mongoose from "mongoose";
import { randomUUID } from "crypto";
import config from "./config";
import User from "./models/User";
import Artist from "./models/Artist";
import Album from "./models/Album";
import Track from "./models/Track";

const run = async () => {
  await mongoose.connect(config.db);
  const db = mongoose.connection;

  try {
    await db.dropCollection("users");
    await db.dropCollection("artists");
    await db.dropCollection("albums");
    await db.dropCollection("tracks");
    await db.dropCollection("trackhistories");
  } catch (e) {
    console.log("Collections were not present, skipping drop...");
  }

  await User.create(
    {
      username: "user",
      password: "user",
      token: randomUUID(),
      role: "user",
      displayName: "user",
      googleId: "",
      avatar: "",
    },
    {
      username: "admin",
      password: "admin",
      token: randomUUID(),
      role: "admin",
      displayName: "admin",
      googleId: "",
      avatar: "",
    },
  );

  const [artistOne, artistTwo] = await Artist.create(
    {
      name: "The Weeknd",
      image: "images/The_Weeknd.png",
      info: "Canadian singer and songwriter",
      isPublished: true,
    },
    {
      name: "Drake",
      image: "images/Drake.png",
      info: "Canadian rapper and singer",
      isPublished: true,
    },
  );

  const [albumOne, albumTwo, albumThree, albumFour, albumFive] =
    await Album.create(
      {
        title: "After Hours",
        artist: artistOne._id,
        releaseYear: 2020,
        albumCover: "images/The_Weeknd_-_After_Hours.png",
        isPublished: true,
      },
      {
        title: "Dawn FM",
        artist: artistOne._id,
        releaseYear: 2022,
        albumCover: "images/The_Weeknd_-_Dawn_FM.png",
        isPublished: true,
      },
      {
        title: "Scorpion",
        artist: artistTwo._id,
        releaseYear: 2018,
        albumCover: "images/Drake_-_Scorpion.png",
        isPublished: true,
      },
      {
        title: "Views",
        artist: artistTwo._id,
        releaseYear: 2016,
        albumCover: "images/Drake_-_Views.png",
        isPublished: true,
      },
      {
        title: "Starboy",
        artist: artistOne._id,
        releaseYear: 2016,
        albumCover: "images/The_Weeknd_-_Starboy.png",
        isPublished: true,
      },
    );

  await Track.create(
    {
      title: "The Weeknd - Gasoline",
      album: albumTwo._id,
      duration: "4:50",
      trackNumber: 2,
      isPublished: true,
      track: "The Weeknd - Gasoline.mp3",
    },
    {
      title: "The Weeknd - Too Late",
      album: albumOne._id,
      duration: "4:01",
      trackNumber: 1,
      isPublished: true,
      track: "The Weeknd - Too Late.mp3",
    },
    {
      title: "The Weeknd - Double Fantasy",
      album: albumOne._id,
      duration: "4:29",
      trackNumber: 3,
      isPublished: true,
      track: "The Weeknd - Double Fantasy.mp3",
    },
    {
      title: "Drake - One Dance",
      album: albumFour._id,
      duration: "2:54",
      trackNumber: 4,
      isPublished: true,
      track: "Drake - One Dance.mp3",
    },
    {
      title: "Drake - Survival",
      album: albumThree._id,
      duration: "2:16",
      trackNumber: 1,
      isPublished: true,
      track: "Drake - Survival.mp3",
    },
    {
      title: "The Weeknd - I Feel It Coming",
      album: albumFive._id,
      duration: "4:29",
      trackNumber: 4,
      isPublished: true,
      track: "The Weeknd - I Feel It Coming.mp3",
    },
  );

  await db.close();
};

run().catch(console.error);
