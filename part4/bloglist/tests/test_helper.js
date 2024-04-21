const Blog = require("../models/blog");

const initialBlogs = [
  { title: "Blog 1", author: "Author 1", url: "Url 1", likes: 5 },
  { title: "Blog 2", author: "Author 2", url: "Url 2", likes: 10 },
];

// const nonExistingId = async () => {
//   const note = new Note({ content: "willremovethissoon" });
//   await note.save();
//   await note.deleteOne();

//   return note._id.toString();
// };

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

module.exports = {
  initialBlogs,
  blogsInDb,
};
