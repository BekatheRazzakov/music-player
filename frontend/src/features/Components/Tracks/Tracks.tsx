import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {getTracks} from "./tracksThunks";
import {apiURL} from "../../../constants";
import {getArtists} from "../Artist/artistsThunks";
import './tracks.css';
import {setCurrentTrack, setShowPlayer, setTrackChange} from "../Artist/artistSlice";
import {ITrack} from "../../../type";

const Tracks = () => {
  const {id} = useParams() as {id: string};
  const tracksState = useAppSelector(state => state.tracksState);
  const currentTrack = useAppSelector(state => state.artistsState.currentTrack);
  const dispatch = useAppDispatch();

  const album = useAppSelector(state => state.tracksState.album);

  useEffect(() => {
    dispatch(getArtists());
    dispatch(getTracks(id));
  }, []);

  const onTrackClick = (track: ITrack) => {
    dispatch(setCurrentTrack(track));
    dispatch(setTrackChange(true));
    dispatch(setShowPlayer(true));
  };

  return (
    <>
      {
        album &&
          <>
              <h4 className='artist-name'>{album.artist?.name}</h4>
              <div className='album-info'>
                  <img src={apiURL + album.albumCover} alt=""/>
                  <span>{album.title}</span>
              </div>
          </>
      }
        {
          tracksState.tracksLoading &&
            <span className="loader"></span>
        }
      <div
        className='page-back'
        onClick={() => window.history.back()}
      />
      <div className='tracks-list'>
        {
          tracksState.tracks.map((track, index) => (
            <div
              className={`track ${ currentTrack && currentTrack.title === track.title && 'isPlaying'}`}
              key={index}
              onClick={() => onTrackClick(track)}
            >
              <span className="track-number">{track.trackNumber}</span>
              <div className="trackInfo">
                <h4>{track.title}</h4>
                <span>{track.duration}</span>
              </div>
            </div>
          ))
        }
      </div>
    </>
  );
};

export default Tracks;