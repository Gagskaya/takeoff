import React, { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../hooks/store";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

import { User } from "../../types/user";
import { selectUsers } from "../../store/selectors/users";
import { fetchUsers } from "../../store/actionCreators/users";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import "react-toastify/dist/ReactToastify.css";
import "./Register.scss";

const Register = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const users = useSelector(selectUsers);

  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loginError, setLoginError] = useState<boolean>();
  const [passwordError, setPasswordError] = useState<boolean>();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

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

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onRegister();
    }
  };

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
          <div className="register__form-buttons">
            <Button variant="outlined" onClick={onRegister} fullWidth>
              Зарегистрироваться
            </Button>
            <hr style={{ margin: "20px 0 15px 0" }} />

            <Button
              variant="outlined"
              onClick={() => navigate("/login")}
              fullWidth
              color={"secondary"}
            >
              Войти
            </Button>

            <ToastContainer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
