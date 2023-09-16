export interface IUser {
  username: string,
  password: string,
  token: string
}

export interface IGetSingleTrackHistory {
  _id: string,
  user: string
  track: {
    title: string,
    album: string,
    duration: string,
    trackNumber: string,
  },
  datetime: string
}