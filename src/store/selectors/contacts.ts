import { RootState } from "../index";
import { createSelector } from "reselect";
import { Contact } from "../../types/contact";

export const selectContacts = ({ contactsReducer }: RootState) =>
  contactsReducer.contacts;
export const selectContactsFilterValue = ({ contactsReducer }: RootState) =>
  contactsReducer.filterValue;
export const selectFilteredContacts = createSelector(
  selectContacts,
  selectContactsFilterValue,
  (contacts, filterValue) =>
    contacts?.filter(
      (contact) =>
        contact.firstName.toLowerCase().indexOf(filterValue.toLowerCase()) >=
          0 ||
        contact.lastName.toLowerCase().indexOf(filterValue.toLowerCase()) >=
          0 ||
        contact.phone.toLowerCase().indexOf(filterValue.toLowerCase()) >= 0 ||
        contact.email.toLowerCase().indexOf(filterValue.toLowerCase()) >= 0
    )
);
export const selectContactFirstName = ({ contactsReducer }: RootState) =>
  contactsReducer.contactFirstName;
export const selectContactLastName = ({ contactsReducer }: RootState) =>
  contactsReducer.contactLastName;
export const selectContactPhone = ({ contactsReducer }: RootState) =>
  contactsReducer.contactPhone;
export const selectContactEmail = ({ contactsReducer }: RootState) =>
  contactsReducer.contactEmail;
export const selectContactsIsLoading = ({ contactsReducer }: RootState) =>
  contactsReducer.isLoading;
export const selectIsContactEditing = ({ contactsReducer }: RootState) =>
  contactsReducer.isContactEditing;
export const selectIsActiveAddContactModal = ({ contactsReducer }: RootState) =>
  contactsReducer.isActiveAddContactModal;
export const selectEditingContactId = ({ contactsReducer }: RootState) =>
  contactsReducer.editingContactId;
