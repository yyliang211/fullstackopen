import { configureStore } from "@reduxjs/toolkit";
import blogsReducer from "./reducers/blogReducer";
import notificationReducer from "./reducers/notificationReducer";

export const store = configureStore({
  reducer: {
    blogs: blogsReducer,
    notification: notificationReducer,
  },
});
