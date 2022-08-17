import axios from "axios";
import { AppDispatch } from "../index";

import { Contact } from "../../types/contact";
import { API_URL } from "../../constants/apiUrl";

import {
  fetchContactsSuccess,
  fetchContactsError,
  fetchContactsIsLoading,
  addContact,
  editContact,
  deleteContact,
} from "../reducers/contacts";

export const fetchContacts =
  (userId: number) => async (dispatch: AppDispatch) => {
    if (userId) {
      try {
        dispatch(fetchContactsIsLoading(true));
        const { data } = await axios.get(
          `${API_URL}/users/${userId}/?_embed=contacts`
        );
        dispatch(fetchContactsSuccess(data.contacts));
        dispatch(fetchContactsIsLoading(false));
      } catch (e: unknown) {
        if (e instanceof Error) {
          dispatch(fetchContactsError(e.message));
        }
      }
    }
  };
export const fetchEditContact =
  (contact: Contact) => async (dispatch: AppDispatch) => {
    try {
      dispatch(fetchContactsIsLoading(true));
      await axios.patch<Contact>(`${API_URL}/contacts/${contact.id}`, {
        firstName: contact.firstName,
        lastName: contact.lastName,
        phone: contact.phone,
        email: contact.email,
      });
      dispatch(fetchContactsIsLoading(false));

      dispatch(editContact(contact));
    } catch (e: unknown) {
      if (e instanceof Error) {
        dispatch(fetchContactsError(e.message));
      }
    }
  };
export const fetchAddContact =
  (contact: Contact) => async (dispatch: AppDispatch) => {
    try {
      dispatch(fetchContactsIsLoading(true));
      await axios.post(`${API_URL}/contacts`, contact);
      dispatch(fetchContactsIsLoading(false));

      dispatch(addContact(contact));
    } catch (e: unknown) {
      if (e instanceof Error) {
        dispatch(fetchContactsError(e.message));
      }
    }
  };
export const fetchDeleteContact =
  (contactId: number) => async (dispatch: AppDispatch) => {
    try {
      dispatch(fetchContactsIsLoading(true));
      await axios.delete(`${API_URL}/contacts/${contactId}`);
      dispatch(deleteContact(contactId));

      dispatch(fetchContactsIsLoading(false));
    } catch (e: unknown) {
      if (e instanceof Error) {
        dispatch(fetchContactsError(e.message));
      }
    }
  };
