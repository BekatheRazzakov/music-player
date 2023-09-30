export interface IArtist {
  name: string;
  info: string;
  image: string;
  _id: string;
  isPublished: boolean;
}

export interface ICreateArtist {
  name: string;
  info: string;
  image: File | null;
}

export interface IAlbum {
  title: string;
  releaseYear: string;
  albumCover: string;
  _id: string;
  artist?: IArtist;
}

export interface ICreateAlbumState {
  title: string;
  artist: string;
  releaseYear: number;
  albumCover: File | null;
}

export interface ICreateAlbum {
  title: string;
  artist: string;
  releaseYear: string;
  albumCover: File | null;
}

export interface ITrack {
  title: string;
  trackNumber: number;
  duration: string;
  album: string;
  _id: string;
}

export interface ICreateTrack {
  title: string;
  album: string;
  duration: string;
  trackNumber: number | string;
}

export interface IGetSingleTrackHistory {
  _id: string;
  user: string;
  track: {
    title: string;
    album: IAlbum;
    duration: string;
    trackNumber: number;
    _id: string;
  };
  datetime: string;
}

export interface IUser {
  username: string;
  password: string;
  token: string;
  tole: string;
}

export interface ISignUser {
  username: string;
  password: string;
}

export interface IArtistsState {
  artists: IArtist[];
  artistsLoading: boolean;
  createLoading: boolean;
}

export interface IAlbumsState {
  albums: IAlbum[];
  albumsLoading: boolean;
}

export interface ITracksState {
  tracks: ITrack[];
  tracksLoading: boolean;
  album: IAlbum | null;
  tracksHistory: IGetSingleTrackHistory[];
  historyLoading: boolean;
  currentTrack: ITrack | null;
  trackChanged: boolean;
  showPlayer: boolean;
}

interface IUsersState {
  user: IUser | null;
  registerLoading: boolean;
  registerError: ValidationError | null;
  loginLoading: boolean;
  loginError: GlobalError | null;
  logoutLoading: boolean;
}

export interface RegisterMutation {
  username: string;
  password: string;
}

export interface RegisterResponse {
  user: User;
  message: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
  message: string;
  name: string;
  _message: string;
}

export interface GlobalError {
  error: string;
}
