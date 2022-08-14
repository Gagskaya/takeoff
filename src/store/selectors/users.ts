import { RootState } from "../index";

export const selectUsers = ({ userReducer }: RootState) => userReducer.users;
