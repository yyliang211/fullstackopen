import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

describe("<Blog />", () => {
  let container;
  let rerender;
  const blog = {
    title: "A brief history",
    author: "yingyang",
    likes: 10,
    url: "https://history.com",
    user: {
      name: "yingyang",
    },
  };
  const currentUser = {
    name: "admin",
  };

  beforeEach(() => {
    ({ container, rerender } = render(
      <Blog blog={blog} currentUser={currentUser} />,
    ));
  });

  test("renders title and author but not URL or likes by default", () => {
    const titleAndAuthor = container.querySelector(".standardContent");
    expect(titleAndAuthor).toBeVisible();
    const urlAndLikes = container.querySelector(".detailedContent");
    expect(urlAndLikes).not.toBeVisible();
  });

  test("after clicking the button, more details are shown", async () => {
    const user = userEvent.setup();
    const button = screen.getByText("view");
    await user.click(button);

    const div = container.querySelector(".detailedContent");
    expect(div).not.toHaveStyle("display: none");
  });

  test("calls event handler for like button correct number of times", async () => {
    const likeBlog = vi.fn();
    rerender(
      <Blog handleLike={likeBlog} blog={blog} currentUser={currentUser} />,
    );

    const user = userEvent.setup();
    const viewButton = screen.getByText("view");
    await user.click(viewButton);

    const likeButton = screen.getByText("like");
    await user.click(likeButton);
    await user.click(likeButton);

    expect(likeBlog.mock.calls).toHaveLength(2);
  });
});
