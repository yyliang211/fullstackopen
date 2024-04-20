const _ = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((accum, blog) => {
    return accum + blog.likes;
  }, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }

  let mostLikedBlog = blogs[0];
  blogs.forEach((blog) => {
    if (blog.likes > mostLikedBlog.likes) {
      mostLikedBlog = blog;
    }
  });
  return mostLikedBlog;
};

const mostBlogs = (blogs) => {
  const numBlogs = _.countBy(blogs, (blog) => blog.author);

  let currMaxBlogCount = 0;
  let currAuthor = "";
  for (const [key, value] of Object.entries(numBlogs)) {
    if (value > currMaxBlogCount) {
      currAuthor = key;
      currMaxBlogCount = value;
    }
  }
  return { author: currAuthor, blogs: currMaxBlogCount };
};

const mostLikes = (blogs) => {
  const authorToLikesMap = {};
  let currAuthor = "";
  let currMaxLikes = 0;
  blogs.forEach(({ author, likes }) => {
    if (authorToLikesMap[author] == null) {
      authorToLikesMap[author] = likes;
    } else {
      authorToLikesMap[author] += likes;
    }

    if (authorToLikesMap[author] > currMaxLikes) {
      currAuthor = author;
      currMaxLikes = authorToLikesMap[author];
    }
  });

  return { author: currAuthor, likes: currMaxLikes };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
