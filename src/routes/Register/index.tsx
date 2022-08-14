import React, { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

import { selectUsers } from "../../store/selectors/users";

import { fetchUsers } from "../../store/actionCreators/users";
import { useAppDispatch } from "../../hooks/store";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import "./Register.scss";
import "react-toastify/dist/ReactToastify.css";
import { User } from "../../types/user";

const Register = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const users = useSelector(selectUsers);

  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loginError, setLoginError] = useState<boolean>();
  const [passwordError, setPasswordError] = useState<boolean>();

  const onRegister = () => {
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
    const userExists = users?.find((user) => user.login === login);
    if (userExists) {
      toast.error("Пользователь с таким логином уже существует", {
        position: toast.POSITION.TOP_CENTER,
      });

      return;
    } else {
      toast.success("Регистрация успешна. Войдите", {
        position: toast.POSITION.TOP_CENTER,
      });

      axios.post<User>("http://localhost:3001/users", {
        login,
        password,
      });

      setLogin("");
      setPassword("");
      setLoginError(false);
      setPasswordError(false);
    }
  };

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div className="register">
      <div className="register-wrap">
        <div className="register__title">
          <h1>Зарегистрироваться</h1>
        </div>
        <div className="register__form">
          <div className="register__form-inputs">
            <TextField
              id="standard-basic"
              label="Логин"
              variant="standard"
              fullWidth
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
              value={password}
              onChange={(
                e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
              ) => setPassword(e.target.value)}
              error={passwordError}
            />
          </div>
          <div className="register__form-buttons">
            <Button
              variant="outlined"
              onClick={() => navigate("/login")}
              fullWidth
            >
              Войти
            </Button>
            <Button
              variant="outlined"
              style={{ marginLeft: 10 }}
              onClick={onRegister}
              fullWidth
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

export default Register;
