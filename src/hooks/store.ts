import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "../store/index";

export const useAppDispatch = () => useDispatch<AppDispatch>();
