import React, {useEffect} from 'react';
import {Link, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {getAlbums} from "./albumsThunks";
import {apiURL} from "../../../constants";
import {getArtists} from "../Artist/artistsThunks";
import {resetTracks} from "../Tracks/tracksSlice";
import './albums.css';

const Albums = () => {
  const {id} = useParams() as {id: string};
  const albumsState = useAppSelector(state => state.albumsState);
  const userState = useAppSelector(state => state.userState);
  const artist = useAppSelector(state => state.artistsState.artists
    .filter(artist => artist._id === id)[0]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getArtists());
    dispatch(getAlbums(id));
    dispatch(resetTracks());
  }, [dispatch, id]);

  return (
    <>
      {
        artist &&
          <div className='album-info'>
              <img src={apiURL + artist.image} alt=""/>
              <span>{artist.name}</span>
          </div>
      }
      {
        albumsState.albumsLoading &&
          <span className="loader"></span>
      }
      <div
        className='page-back'
        onClick={() => window.history.back()}
      />
      <div className='albums-list'>
        {
          albumsState.albums.map((album, index) => (
            <Link
              className='album'
              to={
              userState.loginFulfilled ?
                `/tracks/${album._id}` :
                `/albums/${id}`
              }
              key={index}
            >
              <div className="albumImg">
                <img
                  src={apiURL + album.albumCover}
                  alt="album"
                />
              </div>
              <div className="albumInfo">
                <h4>{album.title}</h4>
                <span>{album.releaseYear}</span>
              </div>
            </Link>
          ))
        }
      </div>
    </>
  );
};

export default Albums;