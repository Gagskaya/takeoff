import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Contact } from "../../types/contact";

interface ContactsState {
  contacts: Contact[];
  contactFirstName: string;
  isContactEditing: boolean;
  editingContactId: null | number;
  isLoading: boolean;
  error: string;
}

const initialState: ContactsState = {
  contacts: [],
  contactFirstName: "",
  isContactEditing: false,
  editingContactId: null,
  isLoading: false,
  error: "",
};

export const contactsSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    fetchContactsIsLoading(state) {
      state.isLoading = true;
    },
    fetchContactsSuccess(state, action: PayloadAction<Contact[]>) {
      state.isLoading = false;
      state.error = "";
      state.contacts = action.payload;
    },
    fetchContactsError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    deleteContactById(state, action: PayloadAction<number>) {
      state.contacts = state.contacts.filter(
        (contact) => contact.id !== action.payload
      );
    },
    toggleIsContactEditing(state, action: PayloadAction<boolean>) {
      state.isContactEditing = action.payload;
    },
    setEditingContactId(state, action: PayloadAction<number>) {
      state.editingContactId = action.payload;
    },
    setContactFirstName(state, action: PayloadAction<string>) {
      state.contactFirstName = action.payload;
    },
  },
});

export const {
  fetchContactsIsLoading,
  fetchContactsSuccess,
  fetchContactsError,
  deleteContactById,
  toggleIsContactEditing,
  setEditingContactId,
  setContactFirstName,
} = contactsSlice.actions;

export const contactsReducer = contactsSlice.reducer;
