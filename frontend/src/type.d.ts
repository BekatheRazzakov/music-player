export interface IArtist {
  name: string,
  info: string,
  image: string,
  _id: string
}

export interface IAlbum {
  title: string,
  releaseYear: string,
  image: string,
  _id: string
}

export interface IArtistsState {
  artists: IArtist[]
}

export interface IAlbumsState {
  albums: IAlbum[]
}