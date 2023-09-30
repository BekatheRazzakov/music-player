import React, { FormEvent, useRef, useState } from "react";
import { ICreateArtist } from "../../../type";
import "./newArtist.css";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { createArtist } from "../Artist/artistsThunks";
import { useNavigate } from "react-router-dom";

const NewArtist = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [filename, setFilename] = useState("");
  const [state, setState] = useState<ICreateArtist>({
    name: "",
    info: "",
    image: null,
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { value, name } = e.target;

    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const filesInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
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

    filesInputChangeHandler(e);
  };

  const activateInput = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(createArtist(state));
      navigate("/");
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
            name="name"
            autoComplete="off"
            value={state.name}
            onChange={onChange}
            required
          />
          <label className="input-label">Artist</label>
        </div>
        <div className="input">
          <input
            className="input-field"
            type="text"
            name="info"
            value={state.info}
            onChange={onChange}
            required
          />
          <label className="input-label">Info</label>
        </div>
        <div className="file-input-block">
          <div className="input">
            <input
              className="input-field file-input"
              type="file"
              name="image"
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
        {/*{error && <span className="error">{error.error}</span>}*/}
      </form>
    </>
  );
};

export default NewArtist;
