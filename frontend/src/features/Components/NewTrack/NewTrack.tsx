import React, { FormEvent, useEffect, useState } from "react";
import { ICreateTrack } from "../../../type";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { useNavigate } from "react-router-dom";
import { getAlbums } from "../Albums/albumsThunks";
import { createTrack } from "../Tracks/tracksThunks";

const NewTrack = () => {
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
        <button className="white-btn" type="submit">
          Add
        </button>
      </form>
    </>
  );
};

export default NewTrack;
