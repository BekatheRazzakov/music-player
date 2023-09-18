import React, {ChangeEvent, FormEvent, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {ISignUser} from "../../../type";
import {useAppDispatch} from "../../../app/hooks";
import {signUp} from "../Login/UserThunk";
import '../Login/login.css';

const Login = () => {
  const [userData, setUserData] = useState<ISignUser>({
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
    await dispatch(signUp(userData));
    navigate('/login');
  };

  return (
    <div>
      <h1 className='title'>Sign up</h1>
      <form onSubmit={onSubmit}>
        <div className="input">
          <input
            className="input-field"
            type="text"
            name='username'
            value={userData.username}
            onChange={onChange}
            required
            autoComplete='off'
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
        <button type='submit'>Sign up</button>
      </form>
    </div>
  );
};

export default Login;