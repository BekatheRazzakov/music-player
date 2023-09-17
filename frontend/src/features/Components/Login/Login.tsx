import React, {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import './login.css';
import {useLocation, useNavigate} from "react-router-dom";
import {ISignUser} from "../../../type";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {login} from "./UserThunk";
import {logOut, resetAttempt, resetSignedUp} from "./UsersSlice";

const Login = () => {
  const [userData, setUserData] = useState<ISignUser>({
    username: '',
    password: ''
  });
  const dispatch = useAppDispatch();
  const userState = useAppSelector(state => state.userState);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userState.signedUp && userState.signUpAttempt) {
      dispatch(resetAttempt());
      dispatch(resetSignedUp());
      alert('Sign up again please, try using another username');
      navigate('/sign-up');
    }
    if (userState.signUpAttempt && userState.signedUp) {
      dispatch(resetAttempt());
      dispatch(resetSignedUp());
      alert('You have signed in!');
    }
  }, [dispatch, navigate, userState]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;

    setUserData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await dispatch(login(userData));
    navigate('/artists');
  };

  return (
    <div>
      <h1 className='title'>Login</h1>
      <form onSubmit={onSubmit}>
        <div className="input">
          <input
            className="input-field"
            type="text"
            name='username'
            value={userData.username}
            onChange={onChange}
            required
          />
          <label className="input-label">username</label>
        </div>
        <div className="input">
          <input
            className="input-field"
            type="password"
            name='password'
            value={userData.password}
            onChange={onChange}
            required
          />
          <label className="input-label">password</label>
        </div>
        <button type='submit'>Login</button>
      </form>
    </div>
  );
};

export default Login;