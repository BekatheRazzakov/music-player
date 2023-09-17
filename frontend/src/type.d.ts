export interface IArtist {
  name: string,
  info: string,
  image: string,
  _id: string
}

export interface IAlbum {
  title: string,
  releaseYear: string,
  albumCover: string,
  _id: string,
  artist?: IArtist
}

export interface ITrack {
  title: string,
  trackNumber: number,
  duration: string,
  album: string,
  _id: string
}

export interface IGetSingleTrackHistory {
  _id: string,
  user: string
  track: {
    title: string,
    album: IAlbum,
    duration: string,
    trackNumber: number,
    _id: string
  },
  datetime: string
}

export interface ISignUser {
  username: string,
  password: string
}

export interface IArtistsState {
  artists: IArtist[],
  artistsLoading: boolean
}

export interface IAlbumsState {
  albums: IAlbum[],
  albumsLoading: boolean,
}

export interface ITracksState {
  tracks: ITrack[],
  tracksLoading: boolean,
  album: IAlbum | null,
  tracksHistory: IGetSingleTrackHistory[],
  historyLoading: boolean
  currentTrack: ITrack | null,
  trackChanged: boolean,
  showPlayer: boolean
}

export interface IUserState {
  token: string,
  signedUp: boolean,
  loginFulfilled: boolean,
  showAlert: boolean,
  signUpAttempt: boolean
}