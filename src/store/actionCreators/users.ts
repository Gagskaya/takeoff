import axios from "axios";
import { AppDispatch } from "../index";

import {
  fetchUsersIsLoading,
  fetchUsersSuccess,
  fetchUsersError,
} from "../reducers/users";
import { User } from "../../types/user";
import { API_URL } from "../../constants/apiUrl";

export const fetchUsers = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(fetchUsersIsLoading());
    const { data } = await axios.get<User[]>(`${API_URL}/users`);
    dispatch(fetchUsersSuccess(data));
  } catch (e: any) {
    dispatch(fetchUsersError(e.message));
  }
};
