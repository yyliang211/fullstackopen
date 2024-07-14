import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const blogsSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    appendBlog(state, action) {
      state.push(action.payload);
    },
    setBlog(state, action) {
      const updatedBlog = action.payload;
      return state.map((blog) =>
        blog.id === updatedBlog.id ? updatedBlog : blog,
      );
    },
  },
});

export const { setBlogs, appendBlog, setBlog } = blogsSlice.actions;
export const getBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};
export const createBlog = (blogObject) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blogObject);
    dispatch(appendBlog(newBlog));
  };
};
export const addComment = (blogId, comment) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.addComment(blogId, comment);
    console.log("updatedBlog", updatedBlog);
    dispatch(setBlog(updatedBlog));
  };
};

export default blogsSlice.reducer;
