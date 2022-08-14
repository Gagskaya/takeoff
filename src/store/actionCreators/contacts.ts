import axios from "axios";
import { AppDispatch } from "../index";

import {
  fetchContactsSuccess,
  fetchContactsError,
  fetchContactsIsLoading,
} from "../reducers/contacts";
import { Contact } from "../../types/contact";
import { API_URL } from "../../constants/apiUrl";

export const fetchContacts = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(fetchContactsIsLoading());
    const { data } = await axios.get<Contact[]>(`${API_URL}/contacts`);
    dispatch(fetchContactsSuccess(data));
  } catch (e: any) {
    dispatch(fetchContactsError(e.message));
  }
};
