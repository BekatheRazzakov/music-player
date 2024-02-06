import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import "./player.css";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { setCurrentTrack, setTrackChange } from "../Tracks/tracksSlice";
import { useLocation } from "react-router-dom";

const Player = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playbackPosition, setPlaybackPosition] = useState(1);
  const [volume, setVolume] = useState(0);
  const [paused, setPaused] = useState(false);
  const userState = useAppSelector((state) => state.userState);
  const tracks = useAppSelector((state) => {
    if (
      userState.user &&
      userState.user.role !== "admin" &&
      state.tracksState &&
      state.tracksState.tracks
    ) {
      return state.tracksState.tracks.filter((track) => track.isPublished);
    }
    return state.tracksState.tracks;
  });
  const currentTrack = useAppSelector(
    (state) => state.tracksState.currentTrack,
  );
  const trackChanged = useAppSelector(
    (state) => state.tracksState.trackChanged,
  );
  const dispatch = useAppDispatch();
  const location = useLocation();

  const prevTrack = () => {
    if (currentTrack && location.pathname !== "/all") {
      if (tracks[0].album !== currentTrack.album) {
        dispatch(setCurrentTrack(tracks[0]));
        return dispatch(setTrackChange(true));
      }

      const trackIndex = tracks.indexOf(currentTrack);

      if (trackIndex === 0) {
        dispatch(setCurrentTrack(tracks[tracks.length - 1]));
      } else {
        dispatch(setCurrentTrack(tracks[trackIndex - 1]));
      }
      return dispatch(setTrackChange(true));
    } else if (currentTrack) {
      const trackIndex = tracks ? tracks.indexOf(currentTrack) : 1;

      if (trackIndex === 0) {
        dispatch(setCurrentTrack(tracks[tracks.length - 1]));
      } else {
        dispatch(setCurrentTrack(tracks[trackIndex - 1]));
      }
      return dispatch(setTrackChange(true));
    }
  };

  const nextTrack = useCallback(() => {
    if (currentTrack && location.pathname !== "/all") {
      if (tracks[0].album !== currentTrack.album) {
        dispatch(setCurrentTrack(tracks[0]));
        return dispatch(setTrackChange(true));
      }

      const trackIndex = tracks.indexOf(currentTrack);

      if (trackIndex === tracks.length - 1) {
        dispatch(setCurrentTrack(tracks[0]));
      } else {
        dispatch(setCurrentTrack(tracks[trackIndex + 1]));
      }
      return dispatch(setTrackChange(true));
    } else if (currentTrack) {
      const trackIndex = tracks ? tracks.indexOf(currentTrack) : 1;

      if (trackIndex === tracks.length - 1) {
        dispatch(setCurrentTrack(tracks[0]));
      } else {
        dispatch(setCurrentTrack(tracks[trackIndex + 1]));
      }
      return dispatch(setTrackChange(true));
    }
  }, [currentTrack, dispatch, location.pathname, tracks]);

  useEffect(() => {
    if (audioRef.current) {
      setVolume(audioRef.current?.volume);
      audioRef.current.addEventListener("timeupdate", () => {
        if (audioRef.current) {
          if (
            audioRef.current.currentTime.toFixed() ===
            audioRef.current?.duration.toFixed()
          ) {
            setPaused(true);
            nextTrack();
          }
          setPlaybackPosition(audioRef.current.currentTime);
        }
      });
    }
  }, []);

  if (
    audioRef.current &&
    trackChanged &&
    currentTrack &&
    currentTrack.title !== ""
  ) {
    dispatch(setTrackChange(false));
    setTimeout(() => {
      setPaused(false);
      void audioRef.current?.play();
    }, 50);
  }

  const formatTime = (seconds: number) => {
    const remainingSeconds = Math.floor(seconds % 60);
    const minutes = Math.floor(seconds / 60).toFixed();
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
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
    <div className="player">
      <h4 className="song-name">{currentTrack && currentTrack.title}</h4>
      <div className="buttons">
        <div className="volume">
          <input
            type="range"
            min="0"
            step="0.01"
            max="1"
            value={volume}
            onChange={volumeHandler}
          />
        </div>
        <span className="trackSwitch previous" onClick={prevTrack} />
        <span
          className={paused ? "playPause paused" : "playPause play"}
          onClick={playPauseHandler}
        />
        <span className="trackSwitch next" onClick={nextTrack} />
      </div>
      <div className="song">
        <span>
          {audioRef.current
            ? formatTime(audioRef.current?.currentTime)
            : "0:00"}
        </span>
        <audio ref={audioRef} src={currentTrack ? currentTrack.track : ""} />
        <input
          type="range"
          step="0.01"
          min="0"
          max={audioRef.current ? audioRef.current?.duration.toString() : "1"}
          value={playbackPosition}
          onChange={playbackPositionHandler}
        />
        <span>
          {audioRef.current?.duration
            ? formatTime(audioRef.current?.duration)
            : "0:00"}
        </span>
      </div>
    </div>
  );
};

export default Player;
