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
  album: IAlbum | null
}