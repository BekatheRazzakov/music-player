import React, { FormEvent, useEffect, useRef, useState } from "react";
import { ICreateAlbumState } from "../../../type";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { useNavigate } from "react-router-dom";
import { createAlbum } from "../Albums/albumsThunks";
import { getArtists } from "../Artist/artistsThunks";

const NewAlbum = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [filename, setFilename] = useState("");
  const [state, setState] = useState<ICreateAlbumState>({
    title: "",
    artist: "",
    releaseYear: 0,
    albumCover: null,
  });
  const artists = useAppSelector((state) => state.artistsState.artists);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getArtists());
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
      await dispatch(
        createAlbum({
          ...state,
          releaseYear: state.releaseYear.toString(),
        }),
      );
      navigate(`/albums/${state.artist}`);
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
            value={state.artist}
            onChange={onChange}
            name="artist"
            required
          >
            <option disabled value="">
              Select an artist
            </option>
            {artists.map((artist, index) => (
              <option key={index} value={artist._id}>
                {artist.name}
              </option>
            ))}
          </select>
        </div>
        <div className="input">
          <input
            className="input-field"
            type="number"
            name="releaseYear"
            min="0"
            value={state.releaseYear}
            onChange={onChange}
            required
          />
          <label className="input-label">Release year</label>
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

export default NewAlbum;
