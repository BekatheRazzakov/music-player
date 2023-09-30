import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { getAlbums } from "./albumsThunks";
import { apiURL } from "../../../constants";
import { getArtists } from "../Artist/artistsThunks";
import { resetTracks } from "../Tracks/tracksSlice";
import "./albums.css";

const Albums = () => {
  const { id } = useParams() as { id: string };
  const albumsState = useAppSelector((state) => state.albumsState);
  const artist = useAppSelector(
    (state) =>
      state.artistsState.artists.filter((artist) => artist._id === id)[0],
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getArtists());
    dispatch(getAlbums(id));
    dispatch(resetTracks());
  }, [dispatch, id]);

  return (
    <>
      {artist && (
        <div className="album-info">
          <div className="albumImg">
            <img
              src={
                artist.image
                  ? apiURL + "images/" + artist.image
                  : "https://t3.ftcdn.net/jpg/00/64/67/80/360_F_64678017_zUpiZFjj04cnLri7oADnyMH0XBYyQghG.jpg"
              }
              alt="artist"
            />
          </div>
          <span>{artist.name}</span>
        </div>
      )}
      {albumsState.albumsLoading && <span className="loader"></span>}
      <div className="page-back" onClick={() => window.history.back()} />
      <div className="albums-list">
        {!albumsState.albums.length && !albumsState.albumsLoading && (
          <span
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            No songs yet
          </span>
        )}
        {albumsState.albums.map((album, index) => (
          <Link className="album" to={`/tracks/${album._id}`} key={index}>
            <div className="albumImg">
              <img
                src={
                  album.albumCover
                    ? apiURL + "images/" + album.albumCover
                    : "https://t3.ftcdn.net/jpg/00/64/67/80/360_F_64678017_zUpiZFjj04cnLri7oADnyMH0XBYyQghG.jpg"
                }
                alt="albumCover"
              />
            </div>
            <div className="albumInfo">
              <h4>{album.title}</h4>
              <span>{album.releaseYear}</span>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Albums;
