import { Article } from "../src/blog";

describe("Article in a blog", () => {
  let article;
  const author = "Pablo Escobar";
  const commentText = "Amazing article !!!";
  beforeEach(() => {
    article = new Article(
      "Lorem Ipsum",
      "consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore"
    );
  });

  test("should add comment", () => {
    article.addComment(commentText, author);

    expect(article.getComments()).toHaveLength(1);

    const comment = article.getComments().at(0);
    expect(comment.text).toBe(commentText);
    expect(comment.author).toBe(author);
  });

  test("should add a comment in an Article with an other comment", () => {
    article.addComment(commentText, author);
    article.addComment("Faites mieux !", "Melenchon");

    expect(article.getComments().length).toBeGreaterThan(1);

    const newComment = article.getComments().at(1);

    expect(newComment.text).toEqual("Faites mieux !");
    expect(newComment.author).toEqual("Melenchon");
  });

  test("should throw an error when adding existing comment", () => {
    article.addComment(commentText, author);

    expect(() => {
      article.addComment(commentText, author);
    }).toThrow("Comment already exists");
  });
});
