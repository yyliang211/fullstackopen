import { createSlice } from "@reduxjs/toolkit";
import usersService from "../services/users";

const initialState = {
  users: [],
  loggedInUser: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoggedInUser(state, action) {
      return { ...state, loggedInUser: action.payload };
    },
    setUsers(state, action) {
      return { ...state, users: action.payload };
    },
  },
});

export const { setLoggedInUser, setUsers } = userSlice.actions;
export const getUsers = () => {
  return async (dispatch) => {
    const users = await usersService.getAll();
    dispatch(setUsers(users));
  };
};
export default userSlice.reducer;
