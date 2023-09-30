import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { getArtists } from "./artistsThunks";
import { apiURL } from "../../../constants";
import { Link, useNavigate } from "react-router-dom";
import { resetAlbums } from "../Albums/albumsSlice";
import "./artists.css";

const Artists = () => {
  const artistsState = useAppSelector((state) => state.artistsState);
  const userState = useAppSelector((state) => state.userState);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getArtists());
    dispatch(resetAlbums());
  }, [dispatch, navigate, userState]);

  return (
    <>
      <h2>Artists</h2>
      <div className="artists-list">
        {artistsState.artistsLoading && <span className="loader"></span>}
        {artistsState.artists.map((artist, index) => (
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
          </Link>
        ))}
      </div>
    </>
  );
};

export default Artists;
