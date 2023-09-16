import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {getTracksByHistory} from "../Tracks/tracksThunks";
import {Link, useParams} from "react-router-dom";
import './trackHistoryCss.css';
import dayjs from "dayjs";

const TracksHistory = () => {
  const { token } = useParams() as { token: string };
  const tracksState = useAppSelector(state => state.tracksState);

  const dispatch = useAppDispatch();

  useEffect(() => {
    setTimeout(() => {
      const user = localStorage.getItem('user');
      let parsed: {token: string};
      if (user && user !== '{}') {
        parsed = JSON.parse(user);
        dispatch(getTracksByHistory(parsed.token));
      }
    }, 50);
  }, [dispatch, token]);

  return (
    <>
      <div
        className='page-back'
        onClick={() => window.history.back()}
      />
      <h2>History</h2>
      <div className='tracks-history-list'>
        {
          tracksState.tracksHistory.map((singleTrack, index) => (
            <Link
              className='album'
              to={`/tracks/${singleTrack.track.album._id}`}
              key={index}
            >
              <div className="albumInfo">
                <span>{singleTrack.track.album.title}</span>
                <h5 className='track-title'>{singleTrack.track.title}</h5>
                <span>
                  {
                    dayjs(singleTrack.datetime).format('DD:MM:YY HH:MM')
                  }
                </span>
              </div>
            </Link>
          ))
        }
      </div>
    </>
  );
};

export default TracksHistory;