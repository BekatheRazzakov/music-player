export interface IUser {
  username: string;
  password: string;
  token: string;
  role: string;
  displayName: string;
  googleId?: string;
  avatar?: string;
}

export interface IAlbum {
  title: string;
  artist: mongoose.Types.ObjectId;
  releaseYear: number;
  albumCover?: string | undefined;
  isPublished: boolean;
}

export interface IArtist {
  name: string;
  image: string;
  info: string;
  isPublished: boolean;
}

export interface ITrack {
  title: string;
  album: mongoose.Types.ObjectId;
  duration?: string;
  isPublished: boolean;
}

export interface IGetSingleTrackHistory {
  _id: string;
  user: string;
  track: {
    title: string;
    artist: IArtist;
    duration: string;
    trackNumber: string;
  };
  datetime: string;
}
