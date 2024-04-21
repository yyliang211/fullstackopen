const mongoose = require("mongoose");
const helper = require("./test_helper");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

afterAll(async () => {
  await mongoose.connection.close();
});

test("GET /api/blogs", async () => {
  const response = await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
  expect(response.body).toHaveLength(helper.initialBlogs.length);
});

test("blogs should have a id property", async () => {
  const response = await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
  for (blog of response.body) {
    expect(blog.id).toBeDefined();
  }
});

test("POST /api/blogs", async () => {
  const newBlog = {
    title: "everything",
    author: "cupper",
    url: "http://cupper.com",
    likes: 1,
  };

  const response = await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const resultBlogs = await helper.blogsInDb();
  expect(resultBlogs).toHaveLength(helper.initialBlogs.length + 1);

  const titles = resultBlogs.map((b) => b.title);
  expect(titles).toContainEqual("everything");
});
