import React, { FormEvent, useEffect, useRef, useState } from "react";
import { ICreateTrack } from "../../../type";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { useNavigate } from "react-router-dom";
import { getAlbums } from "../Albums/albumsThunks";
import { createTrack } from "../Tracks/tracksThunks";

const NewTrack = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [filename, setFilename] = useState("");
  const [state, setState] = useState<ICreateTrack>({
    title: "",
    album: "",
    duration: "",
    trackNumber: 0,
  });
  const albums = useAppSelector((state) => state.albumsState.albums);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAlbums(""));
  }, [dispatch]);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { value, name } = e.target;

    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const inputFileChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const files = e.target.files;

    if (files) {
      setState((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
    }
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFilename(e.target.files[0].name);
    } else {
      setFilename("");
    }

    inputFileChangeHandler(e);
  };

  const activateInput = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(createTrack(state));
      navigate(`/tracks/${state.album}`);
    } catch {
      // nothing
    }
  };

  return (
    <>
      <div className="page-back" onClick={() => window.history.back()} />
      <form onSubmit={onSubmit}>
        <div className="input">
          <input
            className="input-field"
            type="text"
            name="title"
            autoComplete="off"
            value={state.title}
            onChange={onChange}
            required
          />
          <label className="input-label">Title</label>
        </div>
        <div className="input">
          <select
            className="input-field"
            value={state.album}
            onChange={onChange}
            name="album"
            required
          >
            <option disabled value="">
              Select an album
            </option>
            {albums.map((album, index) => (
              <option key={index} value={album._id}>
                {album.title}
              </option>
            ))}
          </select>
        </div>
        <div className="input">
          <input
            className="input-field"
            type="text"
            name="duration"
            value={state.duration}
            onChange={onChange}
            required
          />
          <label className="input-label">Duration</label>
        </div>
        <div className="input">
          <input
            className="input-field"
            type="number"
            min="1"
            name="trackNumber"
            value={state.trackNumber}
            onChange={onChange}
            required
          />
          <label className="input-label track-number-label">Track number</label>
        </div>
        <div className="file-input-block">
          <div className="input">
            <input
              className="input-field file-input"
              type="file"
              name="albumCover"
              ref={inputRef}
              onChange={onFileChange}
            />
            <input
              className="input-field disabled-input"
              type="text"
              value={filename.length ? filename : "Browse image"}
              disabled
            />
          </div>
          <button className="white-btn" onClick={activateInput} type="button">
            Browse image
          </button>
        </div>
        <button className="white-btn" type="submit">
          Add
        </button>
      </form>
    </>
  );
};

export default NewTrack;
