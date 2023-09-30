import mongoose from "mongoose";
import {randomUUID} from "crypto";
import config from "./config";
import User from "./models/User";
import Artist from "./models/Artist";
import Album from "./models/Album";
import Track from "./models/Track";

const run = async () => {
    await mongoose.connect(config.db);
    const db = mongoose.connection;

    try {
        await db.dropCollection('users');
        await db.dropCollection('artists');
        await db.dropCollection('albums');
        await db.dropCollection('tracks');
      await db.dropCollection('trackhistories');
    } catch (e) {
        console.log('Collections were not present, skipping drop...');
    }

    await User.create(
      {
        username: 'user',
        password: '1qaz@WSX29',
        token: randomUUID(),
        role: 'user'
      },
      {
        username: 'admin',
        password: '1qaz@WSX29',
        token: randomUUID(),
        role: 'admin'
    });

    const [artistOne, artistTwo] = await Artist.create(
      {
        name: 'The Weeknd',
        image: 'The_Weeknd.png',
        info: 'Canadian singer and songwriter',
        isPublished: true
      },
      {
        name: 'Drake',
        image: 'Drake.png',
        info: 'Canadian rapper and singer',
        isPublished: false
      }
    );

    const [albumOne, albumTwo, albumThree, albumFour, albumFive] = await Album.create(
      {
        title: 'After Hours',
        artist: artistOne._id,
        releaseYear: 2020,
        albumCover: 'The_Weeknd_-_After_Hours.png',
        isPublished: false
      },
      {
        title: 'Dawn FM',
        artist: artistOne._id,
        releaseYear: 2022,
        albumCover: 'The_Weeknd_-_Dawn_FM.png',
        isPublished: true
      },
      {
        title: 'Scorpion',
        artist: artistTwo._id,
        releaseYear: 2018,
        albumCover: 'Drake_-_Scorpion.png',
        isPublished: false
      },
      {
        title: 'Views',
        artist: artistTwo._id,
        releaseYear: 2016,
        albumCover: 'Drake_-_Views.png',
        isPublished: true
      },
      {
        title: 'Starboy',
        artist: artistOne._id,
        releaseYear: 2016,
        albumCover: 'The_Weeknd_-_Starboy.png',
        isPublished: true
      }
    );

  await Track.create(
    {
      title: 'The Weeknd - Faith',
      album: albumOne._id,
      duration: '4:44',
      trackNumber: 4,
      isPublished: false
    },
    {
      title: 'The Weeknd - Gasoline',
      album: albumTwo._id,
      duration: '4:50',
      trackNumber: 2,
      isPublished: true
    },
    {
      title: "Drake - God's Plan",
      album: albumThree._id,
      duration: '3:19',
      trackNumber: 2,
      isPublished: false
    },
    {
      title: 'The Weeknd - Too Late',
      album: albumOne._id,
      duration: '4:01',
      trackNumber: 1,
      isPublished: true
    },
    {
      title: 'The Weeknd - Here We Go Again',
      album: albumTwo._id,
      duration: '3:29',
      trackNumber: 4,
      isPublished: false
    },
    {
      title: 'The Weeknd - Is There Someone Else',
      album: albumTwo._id,
      duration: '3:19',
      trackNumber: 1,
      isPublished: true
    },
    {
      title: 'The Weeknd - Blinding Lights',
      album: albumOne._id,
      duration: '4:22',
      trackNumber: 2,
      isPublished: true
    },
    {
      title: 'The Weeknd - Out of Time',
      album: albumTwo._id,
      duration: '3:34',
      trackNumber: 3,
      isPublished: true
    },
    {
      title: 'Drake - Childs Play',
      album: albumFour._id,
      duration: '4:32',
      trackNumber: 3,
      isPublished: false
    },
    {
      title: 'The Weeknd - Heartless',
      album: albumOne._id,
      duration: '4:02',
      trackNumber: 5,
      isPublished: true
    },
    {
      title: 'The Weeknd - Double Fantasy',
      album: albumOne._id,
      duration: '4:29',
      trackNumber: 3,
      isPublished: true
    },
    {
      title: 'Drake - Redemption',
      album: albumFour._id,
      duration: '6:04',
      trackNumber: 2,
      isPublished: true
    },
    {
      title: 'Drake - One Dance',
      album: albumFour._id,
      duration: '2:54',
      trackNumber: 4,
      isPublished: true
    },
    {
      title: 'Drake - Survival',
      album: albumThree._id,
      duration: '2:16',
      trackNumber: 1,
      isPublished: true
    },
    {
      title: 'The Weeknd - Sacrifice',
      album: albumTwo._id,
      duration: '4:03',
      trackNumber: 5,
      isPublished: true
    },
    {
      title: 'Drake - Nice For What',
      album: albumThree._id,
      duration: '3:30',
      trackNumber: 3,
      isPublished: true
    },
    {
      title: 'Drake - Hotline Bling',
      album: albumFour._id,
      duration: '4:27',
      trackNumber: 5,
      isPublished: true
    },
    {
      title: 'The Weeknd - Party Monster',
      album: albumFive._id,
      duration: '4:12',
      trackNumber: 5,
      isPublished: true
    },
    {
      title: 'Drake - Mob Ties',
      album: albumThree._id,
      duration: '3:12',
      trackNumber: 5,
      isPublished: true
    },
    {
      title: 'Drake - Jaded',
      album: albumThree._id,
      duration: '4:22',
      trackNumber: 4,
      isPublished: true
    },
    {
      title: 'Drake - Fire & Desire',
      album: albumFour._id,
      duration: '3:58',
      trackNumber: 1,
      isPublished: true
    },
    {
      title: 'The Weeknd - All I Know',
      album: albumFive._id,
      duration: '5:21',
      trackNumber: 3,
      isPublished: true
    },
    {
      title: 'The Weeknd - Starboy',
      album: albumFive._id,
      duration: '3:50',
      trackNumber: 1,
      isPublished: true
    },
    {
      title: 'The Weeknd - Sidewalks',
      album: albumFive._id,
      duration: '3:51',
      trackNumber: 2,
      isPublished: true
    },
    {
      title: 'The Weeknd - I Feel It Coming',
      album: albumFive._id,
      duration: '4:29',
      trackNumber: 4,
      isPublished: true
    },
  );

    await db.close();
};

run().catch(console.error);
