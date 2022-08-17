import { User } from "../../types/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  users: User[];
  user: User;
  isLoading: boolean;
  error: string;
}

const initialState: UserState = {
  users: [],
  user: {} as User,
  isLoading: false,
  error: "",
};

export const usersSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    fetchUsersIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    fetchUsersSuccess(state, action: PayloadAction<User[]>) {
      state.users = action.payload;
    },
    fetchUsersError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
  },
});

export const {
  fetchUsersIsLoading,
  fetchUsersSuccess,
  fetchUsersError,
  setUser,
} = usersSlice.actions;

export const userReducer = usersSlice.reducer;
