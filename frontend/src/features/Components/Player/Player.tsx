import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import "./player.css";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { setCurrentTrack, setCurrentTrackIndex } from "../Tracks/tracksSlice";
import { postTrackToHistory } from "../Tracks/tracksThunks";

const Player = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playbackPosition, setPlaybackPosition] = useState(0);
  const [volume, setVolume] = useState(0);
  const userState = useAppSelector((state) => state.userState);
  const tracks = useAppSelector((state) => state.tracksState.tracks);
  const currentTrackIndex = useAppSelector(
    (state) => state.tracksState.currentTrackIndex,
  );
  const currentTrack = useAppSelector(
    (state) => state.tracksState.currentTrack,
  );
  const dispatch = useAppDispatch();

  const prevTrack = useCallback(() => {
    try {
      if (!currentTrack) return;

      const prevTrack = tracks[currentTrackIndex - 1];
      audioRef.current?.pause();

      if (currentTrackIndex === 0) {
        dispatch(setCurrentTrack(tracks[tracks.length - 1]));
      } else {
        dispatch(setCurrentTrack(prevTrack));
        dispatch(setCurrentTrackIndex(currentTrackIndex - 1));
      }
      if (userState.user) {
        dispatch(
          postTrackToHistory({
            token: userState.user.token,
            track: prevTrack._id,
          }),
        );
      }
    } catch (e) {
      console.log(e);
    }
  }, [currentTrack, currentTrackIndex, dispatch, tracks, userState.user]);

  const nextTrack = useCallback(() => {
    try {
      if (!currentTrack) return;

      const nextTrack = tracks[currentTrackIndex + 1];
      audioRef.current?.pause();

      if (currentTrackIndex === tracks.length - 1) {
        dispatch(setCurrentTrack(tracks[0]));
      } else {
        dispatch(setCurrentTrack(nextTrack));
        dispatch(setCurrentTrackIndex(currentTrackIndex + 1));
      }
      if (userState.user) {
        dispatch(
          postTrackToHistory({
            token: userState.user.token,
            track: nextTrack._id,
          }),
        );
      }
    } catch (e) {
      console.log(e);
    }
  }, [currentTrack, currentTrackIndex, dispatch, tracks, userState.user]);

  const skipForward = () => {
    if (audioRef.current) {
      const newTime = audioRef.current.currentTime + 5;
      setPlaybackPosition(newTime);
      audioRef.current.currentTime =
        newTime < audioRef.current.duration
          ? newTime
          : audioRef.current.duration;
    }
  };

  const skipBackward = () => {
    if (audioRef.current) {
      const newTime = audioRef.current.currentTime - 5;
      setPlaybackPosition(newTime);
      audioRef.current.currentTime = newTime > 0 ? newTime : 0;
    }
  };

  useEffect(() => {
    if (!audioRef.current) return;
    setVolume(audioRef.current?.volume);
    if (currentTrack) {
      dispatch(
        setCurrentTrackIndex(
          tracks.indexOf(
            tracks.filter((track) => track._id === currentTrack._id)[0],
          ) || 0,
        ),
      );
    }

    const handleTimeUpdate = () => {
      if (!audioRef.current) return;
      setPlaybackPosition(audioRef.current.currentTime);
    };
    audioRef.current.addEventListener("timeupdate", handleTimeUpdate);

    const handleTrackEnd = () => {
      nextTrack();
    };
    audioRef.current.addEventListener("ended", handleTrackEnd);

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("timeupdate", handleTimeUpdate);
        audioRef.current.removeEventListener("ended", handleTrackEnd);
      }
    };
  }, [currentTrack, dispatch, nextTrack, tracks]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      console.log(event.code);
      switch (event.code) {
        case "ArrowUp":
          prevTrack();
          break;
        case "ArrowDown":
          nextTrack();
          break;
        case "ArrowRight":
          skipForward();
          break;
        case "ArrowLeft":
          skipBackward();
          break;
        case "Space":
          playPauseHandler();
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [prevTrack, nextTrack]);

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
    if (audioRef.current?.paused) {
      void audioRef.current?.play();
    } else {
      void audioRef.current?.pause();
    }
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
          className={
            audioRef.current?.paused ? "playPause paused" : "playPause play"
          }
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
        <audio
          ref={audioRef}
          src={currentTrack ? currentTrack.track : ""}
          autoPlay
        />
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
