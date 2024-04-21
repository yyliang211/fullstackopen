const supertest = require("supertest");
const mongoose = require("mongoose");
const helper = require("./test_helper");
const app = require("../app");
const api = supertest(app);

const Blog = require("../models/blog");
const mockBlog = {
  title: "everything",
  author: "cupper",
  url: "http://cupper.com",
  likes: 1,
};

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("GET /api/blogs", () => {
  test("returns all blogs in json format", async () => {
    const response = await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });

  test("returns blogs where the id property is defined", async () => {
    const response = await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
    for (blog of response.body) {
      expect(blog.id).toBeDefined();
    }
  });
});

describe("POST /api/blogs", () => {
  test("creates a blog", async () => {
    const response = await api
      .post("/api/blogs")
      .send(mockBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const resultBlogs = await helper.blogsInDb();
    expect(resultBlogs).toHaveLength(helper.initialBlogs.length + 1);

    const titles = resultBlogs.map((b) => b.title);
    expect(titles).toContainEqual("everything");
  });

  test("creates a blog with 0 likes if likes is not defined", async () => {
    const { likes, ...newBlog } = mockBlog;

    const response = await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const resultBlog = await Blog.find({ title: newBlog.title });
    expect(resultBlog[0].likes).toBe(0);
  });

  test("returns 400 if title is missing", async () => {
    const { title, ...newBlog } = mockBlog;
    const response = await api.post("/api/blogs").send(newBlog).expect(400);
  });

  test("returns 400 if url is missing", async () => {
    const { url, ...newBlog } = mockBlog;
    const response = await api.post("/api/blogs").send(newBlog).expect(400);
  });
});

describe("DELETE /api/notes/:id", () => {
  test("succeeds with status code 204 if id is valid", async () => {
    const startingBlogs = await helper.blogsInDb();
    const blogToDelete = startingBlogs[0];

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    const resultBlogs = await helper.blogsInDb();
    expect(resultBlogs).toHaveLength(helper.initialBlogs.length - 1);

    const titles = resultBlogs.map((b) => b.title);
    expect(titles).not.toContain(blogToDelete.title);
  });
});

describe("PUT /api/notes/:id", () => {
  test("successfully updates a blog", async () => {
    const startingBlogs = await helper.blogsInDb();
    const blogToUpdate = startingBlogs[0];

    const newBlog = {
      title: "this is new",
      author: "iii",
      likes: 3,
    };

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(newBlog)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const resultBlogs = await helper.blogsInDb();
    for (blogs of resultBlogs) {
      if (blog.title === newBlog.title) {
        expect(blog.likes).toEqual(newBlog.likes);
      }
    }
  });
});
