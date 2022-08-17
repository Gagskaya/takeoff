import React, { useEffect, CSSProperties, useState } from "react";
import { useAppDispatch } from "../../hooks/store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
} from "@mui/material";

import {
  fetchAddContact,
  fetchContacts,
  fetchDeleteContact,
  fetchEditContact,
} from "../../store/actionCreators/contacts";
import {
  selectContactEmail,
  selectContactFirstName,
  selectContactLastName,
  selectContactPhone,
  selectContacts,
  selectContactsFilterValue,
  selectContactsIsLoading,
  selectEditingContactId,
  selectFilteredContacts,
  selectIsActiveAddContactModal,
  selectIsContactEditing,
} from "../../store/selectors/contacts";
import { selectUser } from "../../store/selectors/users";

import {
  setContactEmail,
  setContactFirstName,
  setContactLastName,
  setContactPhone,
  setEditingContactId,
  toggleIsContactEditing,
  toggleAddContactModal,
  filterContacts,
  setContactsFilterValue,
} from "../../store/reducers/contacts";

import { Contact } from "../../types/contact";

import ClipLoader from "react-spinners/ClipLoader";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import Button from "@mui/material/Button";

import "./Home.scss";
import { setUser } from "../../store/reducers/users";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "#000",
};

const Home = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user = useSelector(selectUser);
  const contacts = useSelector(selectFilteredContacts);
  const contactsIsLoading = useSelector(selectContactsIsLoading);
  const isContactEditing = useSelector(selectIsContactEditing);
  const isActiveAddContactModal = useSelector(selectIsActiveAddContactModal);
  const editingContactId = useSelector(selectEditingContactId);
  const contactFirstName = useSelector(selectContactFirstName);
  const contactLastName = useSelector(selectContactLastName);
  const contactPhone = useSelector(selectContactPhone);
  const contactEmail = useSelector(selectContactEmail);
  const contactsFilterValue = useSelector(selectContactsFilterValue);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const loggedInUser = localStorage.getItem("loggedInUser");

  useEffect(() => {
    if (loggedInUser) {
      const parsedLoggedInUser = JSON.parse(loggedInUser);
      dispatch(setUser(parsedLoggedInUser));
    } else {
      navigate("/login");
    }
  }, [dispatch, loggedInUser, navigate]);

  useEffect(() => {
    if (user) {
      dispatch(fetchContacts(user.id));
    }
  }, [dispatch, user]);

  const onContactEditing = (contactId: number | undefined) => {
    if (contactId) {
      dispatch(toggleIsContactEditing(!isContactEditing));
      if (!isContactEditing && contactId !== editingContactId) {
        dispatch(setEditingContactId(contactId));
      }
      dispatch(setContactFirstName(""));
      dispatch(setContactLastName(""));
      dispatch(setContactPhone(""));
      dispatch(setContactEmail(""));
    }
  };

  const onContactEditSave = (contactId: number | undefined) => {
    if (contactId && user) {
      if (
        !contactFirstName &&
        !contactLastName &&
        !contactPhone &&
        !contactEmail
      ) {
        alert("Заполните все данные");
        return;
      } else {
        dispatch(
          fetchEditContact({
            id: contactId,
            firstName: contactFirstName,
            lastName: contactLastName,
            phone: contactPhone,
            email: contactEmail,
            userId: user.id,
          })
        );
        dispatch(toggleIsContactEditing(!isContactEditing));
      }
    }
  };

  const onContactAdd = (contact: Contact) => {
    if (!firstName || !lastName || !phone || !email) {
      alert("Необходимо заполнить все данные");
      return;
    }
    if (user) {
      dispatch(fetchAddContact(contact));
      dispatch(fetchContacts(user.id));
    }

    dispatch(toggleAddContactModal(!isActiveAddContactModal));
    setFirstName("");
    setLastName("");
    setPhone("");
    setEmail("");
  };

  const onDeleteContact = async (contactId: number | undefined) => {
    if (contactId) {
      if (window.confirm("Вы действительно хотите удалить контакт?")) {
        dispatch(fetchDeleteContact(contactId));
      }
    }
  };

  const onFilterContact = (value: string) => {
    console.log(value);
    dispatch(setContactsFilterValue(value));
  };

  const onCloseAddContactModal = () => {
    dispatch(toggleAddContactModal(false));
  };

  const onLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/login");
  };
  return (
    <div className="home">
      <div className="home__contacts">
        <div className="home__contacts-title">
          <h2>Контакты</h2>
        </div>
        <div className="home__contacts-toolbar">
          <TextField
            size={"small"}
            placeholder={"Поиск"}
            value={contactsFilterValue}
            onChange={(e) => onFilterContact(e.target.value)}
          />
          <Button
            variant={"contained"}
            style={{ marginLeft: 10 }}
            onClick={() =>
              dispatch(toggleAddContactModal(!isActiveAddContactModal))
            }
          >
            Добавить контакт
          </Button>
          <Button
            variant={"contained"}
            style={{ marginLeft: 10 }}
            onClick={onLogout}
            color={"error"}
          >
            Выйти
          </Button>

          <div>
            <Dialog
              onClose={onCloseAddContactModal}
              open={isActiveAddContactModal}
            >
              <DialogContent>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <TextField
                    size="small"
                    style={{ marginBottom: 10 }}
                    placeholder={"Имя"}
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <TextField
                    size="small"
                    style={{ marginBottom: 10 }}
                    placeholder={"Фамилия"}
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                  <TextField
                    size="small"
                    style={{ marginBottom: 10 }}
                    placeholder={"Телефон"}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  <TextField
                    size="small"
                    style={{ marginBottom: 10 }}
                    placeholder={"Email"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </DialogContent>
              <DialogActions>
                <Button
                  variant={"contained"}
                  onClick={() =>
                    onContactAdd({
                      firstName,
                      lastName,
                      phone,
                      email,
                      userId: user.id,
                    })
                  }
                >
                  Добавить
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </div>
      </div>
      <div className="home__contacts-cards">
        {!contactsIsLoading ? (
          contacts?.map((contact, i: number) => (
            <div className="home__contacts-card" key={i}>
              {editingContactId === contact.id && isContactEditing ? (
                <Card>
                  <CardContent>
                    <Typography component={"span"} style={{ display: "block" }}>
                      Имя:{" "}
                      <TextField
                        size="small"
                        style={{ marginBottom: 10 }}
                        value={contactFirstName}
                        onChange={(e) =>
                          dispatch(setContactFirstName(e.target.value))
                        }
                      />
                    </Typography>
                    <Typography component={"span"} style={{ display: "block" }}>
                      Фамилия:{" "}
                      <TextField
                        size="small"
                        style={{ marginBottom: 10 }}
                        value={contactLastName}
                        onChange={(e) =>
                          dispatch(setContactLastName(e.target.value))
                        }
                      />
                    </Typography>
                    <Typography component={"span"} style={{ display: "block" }}>
                      Телефон:{" "}
                      <TextField
                        size="small"
                        style={{ marginBottom: 10 }}
                        value={contactPhone}
                        onChange={(e) =>
                          dispatch(setContactPhone(e.target.value))
                        }
                      />
                    </Typography>
                    <Typography component={"span"} style={{ display: "block" }}>
                      Email:{" "}
                      <TextField
                        size="small"
                        style={{ marginBottom: 10 }}
                        value={contactEmail}
                        onChange={(e) =>
                          dispatch(setContactEmail(e.target.value))
                        }
                      />
                    </Typography>
                    <Button
                      variant="outlined"
                      style={{ marginTop: 10 }}
                      onClick={() =>
                        onContactEditSave(contact.id && contact.id)
                      }
                    >
                      Сохранить
                    </Button>
                    <div
                      className="home__contacts-card-edit"
                      onClick={() => onContactEditing(contact.id && contact.id)}
                    >
                      <EditIcon />
                    </div>
                    <div
                      className="home__contacts-card-delete"
                      onClick={() => onDeleteContact(contact.id && contact.id)}
                    >
                      <ClearIcon />
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent>
                    <Typography>Имя: {contact.firstName}</Typography>
                    <Typography style={{ marginBottom: 10 }}>
                      Фамилия: {contact.lastName}
                    </Typography>
                    <Typography>Телефон: {contact.phone}</Typography>
                    <Typography>Email: {contact.email}</Typography>
                    <div
                      className="home__contacts-card-edit"
                      onClick={() => onContactEditing(contact.id)}
                    >
                      <EditIcon />
                    </div>
                    <div
                      className="home__contacts-card-delete"
                      onClick={() => onDeleteContact(contact.id)}
                    >
                      <ClearIcon />
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          ))
        ) : (
          <ClipLoader
            loading={contactsIsLoading}
            cssOverride={override}
            size={50}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
