import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { getArtists } from "../Artist/artistsThunks";
import { ITrack } from "../../../type";
import "../Tracks/tracks.css";
import {
  deleteTrack,
  getTracks,
  postTrackToHistory,
  togglePublishedTrack,
} from "../Tracks/tracksThunks";
import {
  setCurrentTrack,
  setGlobalTracks,
  setShowPlayer,
  setTrackChange,
} from "../Tracks/tracksSlice";

const AllTracks = () => {
  const tracksState = useAppSelector((state) => state.tracksState);
  const currentTrack = useAppSelector(
    (state) => state.tracksState.currentTrack,
  );
  const dispatch = useAppDispatch();
  const userState = useAppSelector((state) => state.userState);
  const tracks = useAppSelector((state) => state.tracksState.tracks);

  useEffect(() => {
    dispatch(getArtists());
    dispatch(getTracks(""));
  }, [dispatch]);

  const onTrackClick = (track: ITrack) => {
    try {
      dispatch(setGlobalTracks(tracks));
      if (currentTrack?._id !== track._id && userState.user) {
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
    } catch (e) {
      console.log(e);
    }
  };

  const onDelete = async (trackId: string) => {
    await dispatch(deleteTrack(trackId));
    await dispatch(getTracks(""));
  };

  const onTogglePublishedClick = async (trackId: string) => {
    await dispatch(togglePublishedTrack(trackId));
    await dispatch(getTracks(""));
  };

  return (
    <>
      <h4 className="artist-name">All tracks</h4>
      <div className="page-back" onClick={() => window.history.back()} />
      <div className="tracks-list">
        <span
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: tracks && !tracks.length ? "20px" : "0",
          }}
        >
          {tracks && !tracks?.length && "No tracks yet"}
        </span>
        {tracksState.tracksLoading ? (
          <span className="loader"></span>
        ) : (
          tracks &&
          tracks.map((track, index) => (
            <div
              className={`track ${
                currentTrack &&
                currentTrack.title === track.title &&
                "isPlaying"
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
          ))
        )}
        <span
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: tracks && !tracks.length ? "0" : "20px",
          }}
        />
      </div>
    </>
  );
};

export default AllTracks;
