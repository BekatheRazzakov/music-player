import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  deleteArtist,
  getArtists,
  togglePublishedArtist,
} from "./artistsThunks";
import { apiURL } from "../../../constants";
import { Link, useNavigate } from "react-router-dom";
import { resetAlbums } from "../Albums/albumsSlice";
import "./artists.css";
import { IArtist } from "../../../type";

const Artists = () => {
  const artistsState = useAppSelector((state) => state.artistsState);
  const userState = useAppSelector((state) => state.userState);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  let artists = artistsState.artists as IArtist[];

  if (userState.user?.role !== "admin") {
    artists = artists.filter((artist) => artist.isPublished);
  }

  useEffect(() => {
    dispatch(getArtists());
    dispatch(resetAlbums());
  }, [dispatch, navigate, userState]);

  const onDelete = async (id: string) => {
    await dispatch(deleteArtist(id));
    await dispatch(getArtists());
  };

  const onTogglePublishedClick = async (id: string) => {
    await dispatch(togglePublishedArtist(id));
    await dispatch(getArtists());
  };

  return (
    <>
      <h2>Artists</h2>
      <div className="artists-list">
        {artistsState.artistsLoading && <span className="loader"></span>}
        {artists.map((artist, index) => (
          <Link to={`/albums/${artist._id}`} className="artist" key={index}>
            <div className="artistImg">
              <img
                src={
                  artist.image
                    ? apiURL + "images/" + artist.image
                    : "https://t3.ftcdn.net/jpg/00/64/67/80/360_F_64678017_zUpiZFjj04cnLri7oADnyMH0XBYyQghG.jpg"
                }
                alt="artist"
              />
            </div>
            <div className="artistInfo">
              <h4>{artist.name}</h4>
              <span>{artist.info}</span>
            </div>
            {userState.user?.role === "admin" && (
              <div className="admin-buttons">
                <span
                  className="delete"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    void onDelete(artist._id);
                  }}
                >
                  &#x2715;
                </span>
                {artist.isPublished ? (
                  <span
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      void onTogglePublishedClick(artist._id);
                    }}
                  >
                    &#10004;
                  </span>
                ) : (
                  <span
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      void onTogglePublishedClick(artist._id);
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

export default Artists;
