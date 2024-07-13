const Blog = require("../models/blog");
const User = require("../models/user");

const initialBlogs = [
  { title: "Blog 1", author: "testUser", url: "Url 1", likes: 5 },
  { title: "Blog 2", author: "testUser", url: "Url 2", likes: 10 },
];

const initialUsers = [
  {
    name: "testUser",
    username: "testUser",
    password: "secure",
  },
];

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

module.exports = {
  initialBlogs,
  initialUsers,
  blogsInDb,
  usersInDb,
};
