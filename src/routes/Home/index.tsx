import React, { useEffect, CSSProperties } from "react";
import { useAppDispatch } from "../../hooks/store";
import { useSelector } from "react-redux";

import axios from "axios";

import { CardContent, Typography } from "@mui/material";

import { fetchContacts } from "../../store/actionCreators/contacts";
import {
  selectContactFirstName,
  selectContacts,
  selectContactsIsLoading,
  selectEditingContactId,
  selectIsContactEditing,
} from "../../store/selectors/contacts";
import {
  deleteContactById,
  setContactFirstName,
  setEditingContactId,
  toggleIsContactEditing,
} from "../../store/reducers/contacts";
import { API_URL } from "../../constants/apiUrl";

import ClipLoader from "react-spinners/ClipLoader";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import Button from "@mui/material/Button";

import "./Home.scss";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "#000",
};

const Home = () => {
  const dispatch = useAppDispatch();
  const contacts = useSelector(selectContacts);
  const contactsIsLoading = useSelector(selectContactsIsLoading);
  const isContactEditing = useSelector(selectIsContactEditing);
  const editingContactId = useSelector(selectEditingContactId);
  const contactFirstName = useSelector(selectContactFirstName);

  const onDeleteContact = async (contactId: number) => {
    if (window.confirm("Вы действительно хотите удалить контакт?")) {
      dispatch(deleteContactById(contactId));
      try {
        await axios.delete(`${API_URL}/contacts/${contactId}`);
      } catch (e) {
        alert(e);
      }
    }
  };

  const onContactEditing = (contactId: number) => {
    dispatch(toggleIsContactEditing(!isContactEditing));
    if (!isContactEditing && contactId !== editingContactId) {
      dispatch(setEditingContactId(contactId));
    }
    dispatch(setContactFirstName(""));
  };

  const onContactEditSave = () => {
    if (!contactFirstName) {
      alert("Ашипка");
    }
  };

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div className="home">
      <div className="home__contacts">
        <div className="home__contacts-title">
          <h2>Контакты</h2>
        </div>
      </div>
      <div className="home__contacts-cards">
        {!contactsIsLoading ? (
          contacts?.map((contact) => (
            <div className="home__contacts-card" key={contact.id}>
              {editingContactId === contact.id && isContactEditing ? (
                <Card>
                  <CardContent>
                    <Typography>
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
                    <Typography>
                      Фамилия:{" "}
                      <TextField size="small" style={{ marginBottom: 10 }} />
                    </Typography>
                    <Typography>
                      Телефон:{" "}
                      <TextField size="small" style={{ marginBottom: 10 }} />
                    </Typography>
                    <Typography>
                      Email:{" "}
                      <TextField size="small" style={{ marginBottom: 10 }} />
                    </Typography>
                    <Button
                      variant="outlined"
                      style={{ marginTop: 10 }}
                      onClick={onContactEditSave}
                    >
                      Сохранить
                    </Button>
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
