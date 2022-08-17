import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Contact } from "../../types/contact";

interface ContactsState {
  contacts: Contact[];
  contactFirstName: string;
  contactLastName: string;
  contactPhone: string;
  contactEmail: string;
  isContactEditing: boolean;
  isActiveAddContactModal: boolean;
  editingContactId: null | number;
  filterValue: string;
  isLoading: boolean;
  error: string;
}

const initialState: ContactsState = {
  contacts: [],
  contactFirstName: "",
  contactLastName: "",
  contactPhone: "",
  contactEmail: "",
  isContactEditing: false,
  isActiveAddContactModal: false,
  editingContactId: null,
  filterValue: "",
  isLoading: false,
  error: "",
};

export const contactsSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    fetchContactsIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    fetchContactsSuccess(state, action: PayloadAction<Contact[]>) {
      state.error = "";
      state.contacts = action.payload;
    },
    fetchContactsError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    addContact(state, action: PayloadAction<Contact>) {
      state.contacts = [...state.contacts, action.payload];
    },
    editContact(state, action: PayloadAction<Contact>) {
      state.contacts = state.contacts.map((contact) => {
        if (contact.id === action.payload.id) {
          contact.firstName = action.payload.firstName;
          contact.lastName = action.payload.lastName;
          contact.phone = action.payload.phone;
          contact.email = action.payload.email;
        }
        return contact;
      });
    },
    deleteContact(state, action: PayloadAction<number>) {
      state.contacts = state.contacts.filter(
        (contact) => contact.id !== action.payload
      );
    },
    setContactsFilterValue(state, action: PayloadAction<string>) {
      state.filterValue = action.payload;
    },
    toggleIsContactEditing(state, action: PayloadAction<boolean>) {
      state.isContactEditing = action.payload;
    },
    toggleAddContactModal(state, action: PayloadAction<boolean>) {
      state.isActiveAddContactModal = action.payload;
    },
    setEditingContactId(state, action: PayloadAction<number>) {
      state.editingContactId = action.payload;
    },
    setContactFirstName(state, action: PayloadAction<string>) {
      state.contactFirstName = action.payload;
    },
    setContactLastName(state, action: PayloadAction<string>) {
      state.contactLastName = action.payload;
    },
    setContactPhone(state, action: PayloadAction<string>) {
      state.contactPhone = action.payload;
    },
    setContactEmail(state, action: PayloadAction<string>) {
      state.contactEmail = action.payload;
    },
  },
});

export const {
  fetchContactsIsLoading,
  fetchContactsSuccess,
  fetchContactsError,
  addContact,
  editContact,
  deleteContact,

  setContactsFilterValue,
  toggleIsContactEditing,
  toggleAddContactModal,
  setEditingContactId,
  setContactFirstName,
  setContactLastName,
  setContactPhone,
  setContactEmail,
} = contactsSlice.actions;

export const contactsReducer = contactsSlice.reducer;
