import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {getArtists} from "./artistsThunks";
import {apiURL} from "../../../constants";
import {Link, useNavigate} from "react-router-dom";
import {resetAlbums} from "../Albums/albumsSlice";
import './artists.css';
import {setAlert, setLoginFulfilled} from "../Login/UsersSlice";

const Artists = () => {
  const artistsState = useAppSelector(state => state.artistsState);
  const userState = useAppSelector(state => state.userState);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userState.loginFulfilled && userState.showAlert) {
      alert('Authentication is not passed!');
      dispatch(setLoginFulfilled(false));
      dispatch(setAlert(false));
      return navigate('/');
    }

    dispatch(getArtists());
    dispatch(resetAlbums());
  }, [dispatch, navigate, userState]);

  return (
    <div className='artists-list'>
      <h2>Artists</h2>
      {
        artistsState.artistsLoading &&
          <span className="loader"></span>
      }
      {
        artistsState.artists.map((artist, index) => (
          <Link to={`/albums/${artist._id}`} className='artist' key={index}>
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