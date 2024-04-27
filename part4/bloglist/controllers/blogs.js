const jwt = require("jsonwebtoken");
const blogRouter = require("express").Router();
const middleware = require("../utils/middleware");
const Blog = require("../models/blog");
const User = require("../models/user");

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user");

  response.json(blogs);
});

blogRouter.post("/", middleware.userExtractor, async (request, response) => {
  const body = request.body;
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  const userId = decodedToken.id;
  if (!userId) {
    return response.status(401).json({ error: "token invalid" });
  }
  const user = await User.findById(userId);

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user.id,
  });

  const savedBlog = await blog.save();

  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.status(201).json(savedBlog);
});

blogRouter.delete(
  "/:id",
  middleware.userExtractor,
  async (request, response) => {
    const userId = request.user;

    const blogId = request.params.id;
    const blog = await Blog.findById(blogId);
    if (blog == null) {
      return response.status(204).end();
    }
    if (blog.user.toString() !== userId) {
      return response
        .status(401)
        .json({ erorr: "must be author of the blog to delete" });
    }

    await Blog.findByIdAndDelete(request.params.id);
    response.status(204).end();
  }
);

blogRouter.put("/:id", async (request, response) => {
  const body = request.body;
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  const userId = decodedToken.id;
  if (!userId) {
    return response.status(401).json({ error: "token invalid" });
  }
  const user = await User.findById(userId);

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user.id,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  });
  response.json(updatedBlog);
});

module.exports = blogRouter;
