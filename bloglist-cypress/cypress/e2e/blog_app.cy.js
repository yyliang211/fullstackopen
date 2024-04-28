describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`);
    const user = {
      name: "Shinji Ikari",
      username: "shinji",
      password: "eva01",
    };
    cy.request("POST", `${Cypress.env("BACKEND")}/users/`, user);
    cy.visit("");
  });

  it("Login form is shown", function () {
    cy.get("[data-testid=usernameInput]");
    cy.get("[data-testid=passwordInput]");
    cy.get("[data-testid=passwordInput]");
    cy.get("#login-button").click();
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("[data-testid=usernameInput]").type("shinji");
      cy.get("[data-testid=passwordInput]").type("eva01");
      cy.get("#login-button").click();

      cy.contains("Shinji Ikari logged-in");
    });

    it("fails with wrong credentials", function () {
      cy.get("[data-testid=usernameInput]").type("shinji");
      cy.get("[data-testid=passwordInput]").type("wrong");
      cy.get("#login-button").click();

      cy.get(".error").should("contain", "wrong username or password");
      cy.get(".error").should("have.css", "color", "rgb(255, 0, 0)");
      cy.get(".error").should("have.css", "border-style", "solid");

      cy.get("html").should("not.contain", "Shinji Ikari logged in");
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.login({ username: "shinji", password: "eva01" });
    });

    it("A blog can be created", function () {
      cy.contains("new blog").click();
      cy.get("#title").type("forever");
      cy.get("#author").type("yy");
      cy.get("#url").type("time.com");
      cy.contains("save").click();
      cy.contains("forever");
    });

    it("A blog can be liked", function () {
      cy.createBlog({ title: "forever", author: "yy", url: "time.com" });
      cy.contains("view").click();
      cy.contains("like").click();
      cy.contains("likes 1");
    });

    it("A blog can be deleted by user who created it", function () {
      cy.createBlog({
        title: "forever",
        author: "Shinji Ikari",
        url: "time.com",
      });
      cy.contains("view").click();
      cy.contains("remove").click();
      cy.contains("forever").should("not.exist");
    });

    it("Only creator of blog can see delete button", function () {
      cy.createBlog({
        title: "forever",
        author: "Shinji Ikari",
        url: "time.com",
      });
      cy.contains("view").click();
      cy.contains("remove").should("be.visible");

      cy.contains("logout").click();
      const user = {
        name: "admin",
        username: "admin",
        password: "admin",
      };
      cy.request("POST", `${Cypress.env("BACKEND")}/users/`, user);
      cy.login({ username: "admin", password: "admin" });
      cy.contains("forever");
      cy.contains("view").click();
      cy.contains("remove").should("not.be.visible");
    });

    it.only("Blogs are ordered by likes in descending order", function () {
      cy.createBlog({
        title: "blog 1",
        author: "Shinji Ikari",
        url: "time.com",
      });
      cy.createBlog({
        title: "blog 2",
        author: "Shinji Ikari",
        url: "time.com",
      });
      cy.createBlog({
        title: "blog 3",
        author: "Shinji Ikari",
        url: "time.com",
      });

      cy.contains("blog 1").parent().as("blog1");
      cy.contains("blog 2").parent().as("blog2");
      cy.contains("blog 3").parent().as("blog3");

      cy.get("@blog1").contains("view").click();
      cy.get("@blog2").contains("view").click();
      cy.get("@blog3").contains("view").click();

      cy.get("@blog1").contains("like").click();

      cy.get("@blog2").contains("like").click();
      cy.get("@blog2").contains("likes 1");
      cy.get("@blog2").contains("like").click();

      cy.get("@blog3").contains("like").click();
      cy.get("@blog3").contains("likes 1");
      cy.get("@blog3").contains("like").click();
      cy.get("@blog3").contains("likes 2");
      cy.get("@blog3").contains("like").click();
      cy.get("@blog3").contains("likes 3");

      cy.get(".blog").eq(0).should("contain", "blog 3");
      cy.get(".blog").eq(1).should("contain", "blog 2");
    });
  });
});
