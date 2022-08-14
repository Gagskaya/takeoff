import { RootState } from "../index";

export const selectContacts = ({ contactsReducer }: RootState) =>
  contactsReducer.contacts;
export const selectContactFirstName = ({ contactsReducer }: RootState) =>
  contactsReducer.contactFirstName;
export const selectContactsIsLoading = ({ contactsReducer }: RootState) =>
  contactsReducer.isLoading;
export const selectIsContactEditing = ({ contactsReducer }: RootState) =>
  contactsReducer.isContactEditing;
export const selectEditingContactId = ({ contactsReducer }: RootState) =>
  contactsReducer.editingContactId;
