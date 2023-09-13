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
    } catch (e) {
        console.log('Collections were not present, skipping drop...');
    }

    await User.create(
      {
        username: 'userOne',
        password: '1qaz@WSX29',
        token: randomUUID(),
      },
      {
        username: 'userTwo',
        password: '1qaz@WSX29',
        token: randomUUID(),
    });

    const [artistOne, artistTwo] = await Artist.create(
      {
        name: 'The Weeknd',
        image: 'The_Weeknd.png',
        info: 'Canadian singer and songwriter'
      },
      {
        name: 'Drake',
        image: 'Drake.png',
        info: 'Canadian rapper and singer'
      }
    );

    const [albumOne, albumTwo, albumThree, albumFour] = await Album.create(
      {
        title: 'After Hours',
        artist: artistOne._id,
        releaseYear: 2020,
        albumCover: 'The_Weeknd_-_After_Hours.png'
      },
      {
        title: 'Dawn FM',
        artist: artistOne._id,
        releaseYear: 2022,
        albumCover: 'The_Weeknd_-_Dawn_FM.png'
      },
      {
        title: 'Scorpion',
        artist: artistTwo._id,
        releaseYear: 2018,
        albumCover: 'Drake_-_Scorpion.png'
      },
      {
        title: 'Views',
        artist: artistTwo._id,
        releaseYear: 2016,
        albumCover: 'Drake_-_Views.png'
      }
    );

  await Track.create(
    {
      title: 'Faith',
      album: albumOne._id,
      duration: '4:45',
      trackNumber: 4
    },
    {
      title: 'Gasoline',
      album: albumTwo._id,
      duration: '4:50',
      trackNumber: 8
    },
    {
      title: "God's Plan",
      album: albumThree._id,
      duration: '3:19',
      trackNumber: 12
    },
    {
      title: 'Too Late',
      album: albumOne._id,
      duration: '4:01',
      trackNumber: 1
    },
    {
      title: 'Here We Go… Again',
      album: albumTwo._id,
      duration: '3:30',
      trackNumber: 9
    },
    {
      title: 'Is There Someone Else?',
      album: albumTwo._id,
      duration: '3:20',
      trackNumber: 10
    },
    {
      title: 'Blinding Lights',
      album: albumOne._id,
      duration: '4:23',
      trackNumber: 2
    },
    {
      title: 'Out of Time',
      album: albumTwo._id,
      duration: '3:35',
      trackNumber: 11
    },
    {
      title: 'Childs Play',
      album: albumFour._id,
      duration: '4:01',
      trackNumber: 19
    },
    {
      title: 'Heartless',
      album: albumOne._id,
      duration: '4:10',
      trackNumber: 6
    },
    {
      title: 'Until I Bleed Out',
      album: albumOne._id,
      duration: '3:11',
      trackNumber: 3
    },
    {
      title: 'Redemption',
      album: albumFour._id,
      duration: '5:34',
      trackNumber: 20
    },
    {
      title: 'Faithful',
      album: albumFour._id,
      duration: '4:44',
      trackNumber: 17
    },
    {
      title: 'Don’t Matter To Me',
      album: albumThree._id,
      duration: '4:06',
      trackNumber: 14
    },
    {
      title: 'Sacrifice',
      album: albumTwo._id,
      duration: '3:09',
      trackNumber: 7
    },
    {
      title: 'After Dark',
      album: albumThree._id,
      duration: '4:50',
      trackNumber: 13
    },
    {
      title: 'Pop Style',
      album: albumFour._id,
      duration: '3:33',
      trackNumber: 21
    },
    {
      title: 'Mob Ties',
      album: albumThree._id,
      duration: '3:25',
      trackNumber: 16
    },
    {
      title: 'Finesse',
      album: albumThree._id,
      duration: '3:02',
      trackNumber: 15
    },
    {
      title: 'Blinding Lights',
      album: albumOne._id,
      duration: '4:09',
      trackNumber: 5
    },
    {
      title: 'Grammys',
      album: albumFour._id,
      duration: '3:40',
      trackNumber: 18
    },
  );

    await db.close();
};

run().catch(console.error);
