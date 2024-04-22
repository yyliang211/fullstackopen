const supertest = require("supertest");
const mongoose = require("mongoose");
const helper = require("./test_helper");
const app = require("../app");
const api = supertest(app);

const bcrypt = require("bcrypt");
const User = require("../models/user");

beforeEach(async () => {
  await User.deleteMany({});
  for (const { password, ...user } of helper.initialUsers) {
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = new User({ ...user, passwordHash });
    await newUser.save();
  }
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("when there is initially one user in db", () => {
  test("creation fails with proper statuscode and message if username already taken", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: usersAtStart[0].username,
      name: "Superuser",
      password: "salainen",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(result.body.error).toContain("expected `username` to be unique");

    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });
});
