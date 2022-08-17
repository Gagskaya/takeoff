import { RootState } from "../index";

export const selectUsers = ({ userReducer }: RootState) => userReducer.users;
export const selectUser = ({ userReducer }: RootState) => userReducer.user;
