import { combineReducers } from "@reduxjs/toolkit";
import { userReducer } from "./users";
import { contactsReducer } from "./contacts";

export const rootReducer = combineReducers({
  userReducer,
  contactsReducer,
});
