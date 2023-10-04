import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, loginWithGoogle } from "./UserThunk";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { ILoginUser } from "../../../type";
import "./login.css";
import { resetErrors } from "./UsersSlice";
import { GoogleLogin } from "@react-oauth/google";

const Login = () => {
  const [userData, setUserData] = useState<ILoginUser>({
    username: "",
    password: "",
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const error = useAppSelector((state) => state.userState.loginError);

  useEffect(() => {
    dispatch(resetErrors());
  }, [dispatch]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(login(userData)).unwrap();
      if (!error) {
        navigate("/");
      }
    } catch {
      // nothing
    }
  };

  const googleLogin = async (credential: string) => {
    await dispatch(loginWithGoogle(credential)).unwrap();
    navigate("/");
  };

  return (
    <div>
      <h1 className="title">Login</h1>
      <form onSubmit={onSubmit}>
        <div style={{ margin: "0 auto" }}>
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              if (credentialResponse.credential) {
                void googleLogin(credentialResponse.credential);
              }
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          />
        </div>
        <div className="input">
          <input
            className="input-field"
            type="text"
            name="username"
            value={userData.username}
            onChange={onChange}
            required
            autoComplete="off"
          />
          <label className="input-label">username</label>
        </div>
        <div className="input">
          <input
            className="input-field"
            type="password"
            name="password"
            value={userData.password}
            onChange={onChange}
            required
          />
          <label className="input-label">password</label>
        </div>
        <button className="white-btn" type="submit">
          Login
        </button>
        {error && <span className="error">{error.error}</span>}
      </form>
    </div>
  );
};

export default Login;
