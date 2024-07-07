import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: "",
  className: "",
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    set(state, action) {
      return action.payload;
    },
    remove() {
      return {};
    },
  },
});
const { set, remove } = notificationSlice.actions;

export const setNotification = (message, className, timeoutDuration) => {
  return async (dispatch) => {
    dispatch(set({ message, className }));
    setTimeout(() => {
      dispatch(remove());
    }, timeoutDuration * 1000);
  };
};

export default notificationSlice.reducer;
