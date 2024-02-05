import mongoose from "mongoose";
import { randomUUID } from "crypto";
import config from "./config";
import User from "./models/User";
import Artist from "./models/Artist";
import Album from "./models/Album";
import Track from "./models/Track";
import { cloudinaryFileUploadMethod } from "./uploader";

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
      image: "The_Weeknd.png",
      info: "Canadian singer and songwriter",
      isPublished: true,
    },
    {
      name: "Drake",
      image: "Drake.png",
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
        albumCover: "The_Weeknd_-_After_Hours.png",
        isPublished: true,
      },
      {
        title: "Dawn FM",
        artist: artistOne._id,
        releaseYear: 2022,
        albumCover: "The_Weeknd_-_Dawn_FM.png",
        isPublished: true,
      },
      {
        title: "Scorpion",
        artist: artistTwo._id,
        releaseYear: 2018,
        albumCover: "Drake_-_Scorpion.png",
        isPublished: true,
      },
      {
        title: "Views",
        artist: artistTwo._id,
        releaseYear: 2016,
        albumCover: "Drake_-_Views.png",
        isPublished: true,
      },
      {
        title: "Starboy",
        artist: artistOne._id,
        releaseYear: 2016,
        albumCover: "The_Weeknd_-_Starboy.png",
        isPublished: true,
      },
    );

  const [track1, track2, track3, track4, track5, track6] = await Track.create(
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

  // Update tracks
  for (const track of [track1, track2, track3, track4, track5, track6]) {
    if (track.track) {
      const musicPath = "./public/music/" + track.track;
      const newMp3fileUrl = await cloudinaryFileUploadMethod(musicPath);
      await Track.findByIdAndUpdate(track._id, { mp3File: newMp3fileUrl });
    }
  }

  // Update Artist images
  for (const artist of [artistOne, artistTwo]) {
    if (!artist.image) return;
    const path = "./public/images/" + artist.image;
    const newImageUrl = await cloudinaryFileUploadMethod(path);
    await Artist.findByIdAndUpdate(artist._id, { image: newImageUrl });
  }

  // Update Album images
  for (const album of [albumOne, albumTwo, albumThree, albumFour, albumFive]) {
    if (!album.albumCover) return;
    const path = "./public/images/" + album.albumCover;
    const newImageUrl = await cloudinaryFileUploadMethod(path);
    await Album.findByIdAndUpdate(album._id, { image: newImageUrl });
  }

  await db.close();
};

run().catch(console.error);
