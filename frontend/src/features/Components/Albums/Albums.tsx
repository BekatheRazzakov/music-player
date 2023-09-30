import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { deleteAlbum, getAlbums, togglePublishedAlbum } from "./albumsThunks";
import { apiURL } from "../../../constants";
import { getArtists } from "../Artist/artistsThunks";
import { resetTracks } from "../Tracks/tracksSlice";
import "./albums.css";
import { IAlbum } from "../../../type";

const Albums = () => {
  const { id } = useParams() as { id: string };
  const albumsState = useAppSelector((state) => state.albumsState);
  const artist = useAppSelector(
    (state) =>
      state.artistsState.artists.filter((artist) => artist._id === id)[0],
  );
  const userState = useAppSelector((state) => state.userState);
  const dispatch = useAppDispatch();
  let albums = albumsState.albums as IAlbum[];

  if (userState.user?.role !== "admin") {
    albums = albums.filter((album) => album.isPublished);
  }

  useEffect(() => {
    dispatch(getArtists());
    dispatch(getAlbums(id));
    dispatch(resetTracks());
  }, [dispatch, id]);

  const onDelete = async (id: string) => {
    await dispatch(deleteAlbum(id));
    await dispatch(getAlbums(id));
  };

  const onTogglePublishedClick = async (id: string) => {
    await dispatch(togglePublishedAlbum(id));
    await dispatch(getAlbums(id));
  };

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
            No albums yet
          </span>
        )}
        {albums.map((album, index) => (
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
            {userState.user?.role === "admin" && (
              <div className="admin-buttons">
                <span
                  className="delete"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    void onDelete(album._id);
                  }}
                >
                  &#x2715;
                </span>
                {album.isPublished ? (
                  <span
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      void onTogglePublishedClick(album._id);
                    }}
                  >
                    &#10004;
                  </span>
                ) : (
                  <span
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      void onTogglePublishedClick(album._id);
                    }}
                  >
                    &#x2715;
                  </span>
                )}
              </div>
            )}
          </Link>
        ))}
      </div>
    </>
  );
};

export default Albums;
