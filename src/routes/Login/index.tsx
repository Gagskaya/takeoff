import React, { ChangeEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { toast, ToastContainer } from "react-toastify";

import { useAppDispatch } from "../../hooks/store";
import { selectUsers } from "../../store/selectors/users";
import { fetchUsers } from "../../store/actionCreators/users";
import { setUser } from "../../store/reducers/users";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import "react-toastify/dist/ReactToastify.css";
import "./Login.scss";

const Login = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loginError, setLoginError] = useState<boolean>();
  const [passwordError, setPasswordError] = useState<boolean>();

  const users = useSelector(selectUsers);
  const loggedInUser = localStorage.getItem("loggedInUser");

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    if (loggedInUser) {
      navigate("/home");
    } else {
      navigate("/login");
    }
  }, [dispatch, loggedInUser, navigate]);

  const onLogin = () => {
    const user = users?.find(
      (user) => user.login === login && user.password === password
    );
    if (!login && !password) {
      setLoginError(true);
      setPasswordError(true);

      return;
    } else if (!login) {
      setLoginError(true);
      setPasswordError(false);

      return;
    } else if (!password) {
      setPasswordError(true);
      setLoginError(false);

      return;
    }

    if (user) {
      toast.success("Авторизация успешна", {
        position: toast.POSITION.TOP_CENTER,
      });

      localStorage.setItem("loggedInUser", JSON.stringify(user));
      dispatch(setUser(user));

      setLogin("");
      setPassword("");
      setLoginError(false);
      setPasswordError(false);
    } else {
      toast.error("Неправильный логин или пароль, повторите попытку", {
        position: toast.POSITION.TOP_CENTER,
      });

      setLogin("");
      setPassword("");
      setLoginError(false);
      setPasswordError(false);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onLogin();
    }
  };

  return (
    <div className="login">
      <div className="login-wrap">
        <div className="login__title">
          <h1>Войти</h1>
        </div>
        <div className="login__form">
          <div className="login__form-inputs">
            <TextField
              id="standard-basic"
              label="Логин"
              variant="standard"
              fullWidth
              onKeyDown={onKeyDown}
              value={login}
              onChange={(
                e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
              ) => setLogin(e.target.value)}
              error={loginError}
            />
            <TextField
              id="standard-basic"
              label="Пароль"
              variant="standard"
              type="password"
              fullWidth
              onKeyDown={onKeyDown}
              value={password}
              onChange={(
                e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
              ) => setPassword(e.target.value)}
              error={passwordError}
            />
          </div>
          <div className="login__form-buttons">
            <Button fullWidth variant="outlined" onClick={onLogin}>
              Войти
            </Button>
            <hr style={{ margin: "20px 0 15px 0" }} />
            <Button
              fullWidth
              variant="outlined"
              onClick={() => navigate("/register")}
              color={"secondary"}
            >
              Зарегистрироваться
            </Button>
            <ToastContainer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
