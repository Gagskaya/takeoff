import { User } from "../../types/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  users: User[];
  isLoading: boolean;
  error: string;
}

const initialState: UserState = {
  users: [],
  isLoading: false,
  error: "",
};

export const usersSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    fetchUsersIsLoading(state) {
      state.isLoading = true;
    },
    fetchUsersSuccess(state, action: PayloadAction<User[]>) {
      state.isLoading = false;
      state.error = "";
      state.users = action.payload;
    },
    fetchUsersError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    setUsers(state, action: PayloadAction<User[]>) {
      state.users = action.payload;
    },
  },
});

export const {
  fetchUsersIsLoading,
  fetchUsersSuccess,
  fetchUsersError,
  setUsers,
} = usersSlice.actions;

export const userReducer = usersSlice.reducer;
