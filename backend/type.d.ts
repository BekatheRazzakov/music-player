export interface IUser {
  username: string,
  password: string,
  token: string
}

export interface IAlbum {
  title: string,
  artist: mongoose.Types.ObjectId,
  releaseYear: number,
  albumCover?: string | undefined
}

export interface IArtist {
  name: string,
  image: string,
  info: string
}

export interface ITrack {
  title: string,
  album: mongoose.Types.ObjectId,
  trackNumber: number,
  duration?: string
}

export interface IGetSingleTrackHistory {
  _id: string,
  user: string
  track: {
    title: string,
    album: IAlbum,
    duration: string,
    trackNumber: string,
  },
  datetime: string
}