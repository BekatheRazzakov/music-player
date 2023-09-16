export interface IUser {
  username: string,
  password: string,
  token: string
}

export interface IAlbum {
  title: string,
  releaseYear: string,
  albumCover: string,
  _id: string,
  artist?: IArtist
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