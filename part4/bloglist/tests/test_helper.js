const Blog = require("../models/blog");
const User = require("../models/user");

const initialBlogs = [
  { title: "Blog 1", author: "Author 1", url: "Url 1", likes: 5 },
  { title: "Blog 2", author: "Author 2", url: "Url 2", likes: 10 },
];

const initialUsers = [
  {
    name: "yingyang",
    username: "yyliang211",
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
