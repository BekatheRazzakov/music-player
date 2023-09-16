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
    album: string,
    duration: string,
    trackNumber: string,
  },
  datetime: string
}

export interface IUser {
  username: string,
  password: string,
  token: string
}

export type IUserWithoutToken = Omit<IUser, 'token'>;

export interface IArtistsState {
  artists: IArtist[],
  artistsLoading: boolean
  currentTrack: ITrack | null,
  trackChanged: boolean,
  showPlayer: boolean
}

export interface IAlbumsState {
  albums: IAlbum[],
  albumsLoading: boolean,
}

export interface ITracksState {
  tracks: ITrack[],
  tracksLoading: boolean,
  album: IAlbum | null,
  tracksHistory: IGetSingleTrackHistory[]
}

export interface IUserState {
  user: IUser | null,
  signedUp: boolean,
  loginFulfilled: boolean,
  showAlert: boolean
}