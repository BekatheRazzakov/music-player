import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {getArtists} from "./artistsThunks";
import {apiURL} from "../../../constants";
import {Link} from "react-router-dom";

const Artists = () => {
  const artistsState = useAppSelector(state => state.artistsState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getArtists());
  }, []);

  return (
    <div className='artists-list'>
      {
        artistsState.artists.map((artist, index) => (
          <Link to={`albums/${artist._id}`} className='artist' key={index}>
            <div className="artistImg">
              <img
                src={apiURL + artist.image}
                alt="artist"
              />
            </div>
            <div className="artistInfo">
              <h4>{artist.name}</h4>
              <span>{artist.info}</span>
            </div>
          </Link>
        ))
      }
    </div>
  );
};

export default Artists;