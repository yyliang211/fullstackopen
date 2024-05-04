import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    set(state, action) {
      return action.payload;
    },
    remove() {
      return "";
    },
  },
});
const { set, remove } = notificationSlice.actions;

export const setNotification = (message, timeoutDuration) => {
  return async (dispatch) => {
    dispatch(set(message));
    setTimeout(() => {
      dispatch(remove());
    }, timeoutDuration * 1000);
  };
};
export default notificationSlice.reducer;
