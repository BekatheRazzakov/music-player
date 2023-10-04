import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { ISignUser } from "../../../type";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { loginWithGoogle, signUp } from "../Login/UserThunk";
import "../Login/login.css";
import { resetErrors } from "../Login/UsersSlice";
import { GoogleLogin } from "@react-oauth/google";

const Login = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [filename, setFilename] = useState("");
  const [userData, setUserData] = useState<ISignUser>({
    username: "",
    password: "",
    avatar: null,
    displayName: "",
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const error = useAppSelector((state) => state.userState.registerError);

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

  const inputFileChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const files = e.target.files;

    if (files) {
      setUserData((prevState) => ({
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
      await dispatch(signUp(userData)).unwrap();
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
      <h1 className="title">Sign up</h1>
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
        <div className="input">
          <input
            className="input-field"
            type="text"
            name="displayName"
            value={userData.displayName}
            onChange={onChange}
            required
          />
          <label className="input-label">nickname</label>
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
              value={filename.length ? filename : "browse image"}
              disabled
            />
          </div>
          <button className="white-btn" onClick={activateInput} type="button">
            Browse
          </button>
        </div>
        <button className="white-btn" type="submit">
          Sign up
        </button>
        {error && <span className="error">{error.message}</span>}
      </form>
    </div>
  );
};

export default Login;
