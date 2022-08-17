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
    dispatch(fetchUsersIsLoading(true));
    const { data } = await axios.get<User[]>(`${API_URL}/users`);
    dispatch(fetchUsersSuccess(data));
    dispatch(fetchUsersIsLoading(false));
  } catch (e: any) {
    dispatch(fetchUsersError(e.message));
  }
};
