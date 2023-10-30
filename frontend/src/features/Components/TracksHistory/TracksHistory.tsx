import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { getTracksByHistory, postTrackToHistory } from "../Tracks/tracksThunks";
import { Link, useParams } from "react-router-dom";
import "./trackHistoryCss.css";
import dayjs from "dayjs";
import {
  resetHistory,
  setCurrentTrack,
  setShowPlayer,
  setTrackChange,
} from "../Tracks/tracksSlice";
import { ITrack } from "../../../type";

const TracksHistory = () => {
  const { token } = useParams() as { token: string };
  const tracksState = useAppSelector((state) => state.tracksState);
  const userState = useAppSelector((state) => state.userState);
  const currentTrack = useAppSelector(
    (state) => state.tracksState.currentTrack,
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(resetHistory());
    dispatch(getTracksByHistory(token));
  }, [dispatch, token]);

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

  return (
    <>
      <div className="page-back" onClick={() => window.history.back()} />
      <h2>History</h2>
      {tracksState.historyLoading && <span className="loader"></span>}
      <div className="tracks-history-list">
        {!tracksState.tracksHistory.length && !tracksState.historyLoading && (
          <h4 className="empty">You haven{"'"}t listened anything yet</h4>
        )}
        {tracksState.tracksHistory.map((singleTrack, index) => (
          <Link
            className="album"
            to={`/tracks/${singleTrack.track.album._id}`}
            key={index}
            onClick={() =>
              onTrackClick({
                ...singleTrack.track,
                album: singleTrack.track.album.title,
              })
            }
          >
            <div className="albumInfo">
              <span>{singleTrack.track.album.artist?.name}</span>
              <h5 className="track-title">{singleTrack.track.title}</h5>
              <span>
                {dayjs(singleTrack.datetime).format("DD:MM:YY HH:mm")}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default TracksHistory;
