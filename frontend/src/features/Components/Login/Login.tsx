import React, {ChangeEvent, FormEvent, useState} from 'react';
import './login.css';
import {useLocation, useNavigate} from "react-router-dom";
import {IUserWithoutToken} from "../../../type";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {login} from "./UserThunk";

const Login = () => {
  const location = useLocation();
  const [userData, setUserData] = useState<IUserWithoutToken>({
    username: '',
    password: ''
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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
      <h1 className='title'>
        {
          location.pathname === '/' ?
            'Login' : 'Sign up'
        }
      </h1>
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
        <button type='submit'>
          {
            location.pathname === '/' ?
              'Login' : 'Sign up'
          }
        </button>
      </form>
    </div>
  );
};

export default Login;