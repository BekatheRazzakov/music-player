import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  deleteTrack,
  getTracks,
  postTrackToHistory,
  togglePublishedTrack,
} from "./tracksThunks";
import { apiURL } from "../../../constants";
import { getArtists } from "../Artist/artistsThunks";
import { ITrack } from "../../../type";
import { setCurrentTrack, setShowPlayer, setTrackChange } from "./tracksSlice";
import "./tracks.css";

const Tracks = () => {
  const { id } = useParams() as { id: string };
  const tracksState = useAppSelector((state) => state.tracksState);
  const currentTrack = useAppSelector(
    (state) => state.tracksState.currentTrack,
  );
  const userState = useAppSelector((state) => state.userState);
  const dispatch = useAppDispatch();
  const album = useAppSelector((state) => state.tracksState.album);
  let tracks = tracksState.tracks as ITrack[];

  if (userState.user?.role !== "admin") {
    tracks = tracks.filter((track) => track.isPublished);
  }

  useEffect(() => {
    dispatch(getArtists());
    dispatch(getTracks(id));
  }, [dispatch, id]);

  const onTrackClick = (track: ITrack) => {
    if (userState.user) {
      if (currentTrack?._id !== track._id) {
        dispatch(
          postTrackToHistory({
            track: track._id,
            token: userState.user?.token,
          }),
        );
      }
      dispatch(setCurrentTrack(track));
      dispatch(setShowPlayer(true));
      dispatch(setTrackChange(true));
    }
  };

  const onDelete = async (trackId: string) => {
    await dispatch(deleteTrack(trackId));
    await dispatch(getTracks(id));
  };

  const onTogglePublishedClick = async (trackId: string) => {
    await dispatch(togglePublishedTrack(trackId));
    await dispatch(getTracks(id));
  };

  return (
    <>
      {album && (
        <>
          <h4 className="artist-name">{album.artist?.name}</h4>
          <div className="album-info">
            <div className="albumImg">
              <img
                src={
                  album.albumCover
                    ? apiURL + album.albumCover
                    : "https://t3.ftcdn.net/jpg/00/64/67/80/360_F_64678017_zUpiZFjj04cnLri7oADnyMH0XBYyQghG.jpg"
                }
                alt="artist"
              />
            </div>
            <span>{album.title}</span>
          </div>
        </>
      )}
      {tracksState.tracksLoading && <span className="loader"></span>}
      <div className="page-back" onClick={() => window.history.back()} />
      <div className="tracks-list">
        <span
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          {!tracksState.tracks.length && "No tracks yet"}
        </span>
        {tracks.map((track, index) => (
          <div
            className={`track ${
              currentTrack && currentTrack.title === track.title && "isPlaying"
            }`}
            key={index}
            onClick={() => onTrackClick(track)}
          >
            <div className="trackInfo">
              <h4>{track.title}</h4>
              <span>{track.duration}</span>
            </div>
            {userState.user?.role === "admin" && (
              <div className="admin-buttons">
                <span
                  className="delete"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    void onDelete(track._id);
                  }}
                >
                  &#x2715;
                </span>
                {track.isPublished ? (
                  <span
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      void onTogglePublishedClick(track._id);
                    }}
                  >
                    &#10004;
                  </span>
                ) : (
                  <span
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      void onTogglePublishedClick(track._id);
                    }}
                  >
                    &#x2715;
                  </span>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default Tracks;
