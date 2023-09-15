import React, {ChangeEvent, useEffect, useRef, useState} from 'react';
import './player.css';
import {apiURL} from "../../../constants";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {setTrackChange} from "../Artist/artistSlice";

const Player = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playbackPosition, setPlaybackPosition] = useState(1);
  const [volume, setVolume] = useState(0);
  const [paused, setPaused] = useState(false);
  const currentTrack = useAppSelector(state => state.artistsState.currentTrack);
  const trackChanged = useAppSelector(state => state.artistsState.trackChanged);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (audioRef.current) {
      setVolume(audioRef.current?.volume);
      audioRef.current.addEventListener('timeupdate', () => {
        if (audioRef.current) {
          if ((audioRef.current?.currentTime).toFixed() === audioRef.current?.duration.toFixed()) {
            setPaused(true);
          }
          setPlaybackPosition(audioRef.current.currentTime);
        }
      });
    }
  }, []);

  if (audioRef.current && trackChanged && currentTrack !== '') {
    if (trackChanged) {
      dispatch(setTrackChange(false));
      setTimeout(() => {
        setPaused(false);
        void audioRef.current?.play();
      }, 50);
    }
  }

  const formatTime = (seconds: number) => {
    const remainingSeconds = Math.floor(seconds % 60);
    const minutes = Math.floor(seconds / 60).toFixed();
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const volumeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setVolume(parseFloat(e.target.value));

    if (audioRef.current) {
      audioRef.current.volume = parseFloat(e.target.value);
    }
  };

  const playbackPositionHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      audioRef.current.currentTime = parseFloat(e.target.value);
    }
  };

  const playPauseHandler = () => {
    if (paused) {
      void audioRef.current?.play();
    } else {
      void audioRef.current?.pause();
    }

    setPaused(!paused);
  };

  return (
    <div className='player'>
      <h4 className='song-name'>{currentTrack}</h4>
      <div className="buttons">
        <div className='volume'>
          <input
            type="range"
            min="0"
            step="0.01"
            max="1"
            value={volume}
            onChange={volumeHandler}
          />
        </div>
        <span className='trackSwitch previous' />
        <span
          className={
            paused ? 'playPause paused' : 'playPause play'
          }
          onClick={playPauseHandler}
        />
        <span className='trackSwitch next' />
      </div>
      <div className='song'>
        <span>
          {
            audioRef.current ?
              formatTime(audioRef.current?.currentTime)
              :
              '0:00'
          }
        </span>
        <audio
          ref={audioRef}
          src={apiURL + 'music/' + currentTrack + '.mp3'}
        />
        <input
          type="range"
          step='0.01'
          min='0'
          max={
          audioRef.current ?
            audioRef.current?.duration.toString()
            :
            '1'
          }
          value={playbackPosition}
          onChange={playbackPositionHandler}
        />
        <span className='duration'>
          {
            audioRef.current?.duration ?
              formatTime(audioRef.current?.duration)
              :
              '0:00'
          }
        </span>
      </div>
    </div>
  );
};

export default Player;