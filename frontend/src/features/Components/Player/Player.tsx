import React, {ChangeEvent, useEffect, useRef, useState} from 'react';
import './player.css';
import {apiURL} from "../../../constants";

const Player = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playbackPosition, setPlaybackPosition] = useState(1);
  const [volume, setVolume] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener('timeupdate', () => {
        if (audioRef.current) {
          setPlaybackPosition(audioRef.current.currentTime);
        }
      });
    }
  }, []);

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
      void audioRef.current?.pause();
    } else {
      void audioRef.current?.play();
    }

    setPaused(!paused);
  };

  return (
    <div className='player'>
      <h4 className='song-name'>Song name</h4>
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
        <span>0:00</span>
        <audio
          ref={audioRef}
          src={apiURL + 'music/The Weeknd - Too Late.mp3'}
        />
        <input
          type="range"
          step='0.01'
          min='0'
          max={audioRef.current?.duration}
          value={playbackPosition}
          onChange={playbackPositionHandler}
        />
        <span>0:00</span>
      </div>
    </div>
  );
};

export default Player;