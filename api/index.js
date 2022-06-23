import mongo from "./utils/mongo";

const app = require("express")();

app.get("/posts", async (req, res) => {
  await mongo.connect();

  const posts = await mongo.getPosts(
    req.query.category,
    parseInt(req.query.pageSize)
  );

  mongo.disconnect();

  res.json(posts);
});

app.get("/posts/next", async (req, res) => {
  await mongo.connect();

  const posts = await mongo.addPosts();
  mongo.disconnect();
  res.json(posts);
});

app.get("/post", async (req, res) => {
  await mongo.connect();

  const post = await mongo.getPost(req.query.id);
  mongo.disconnect();
  res.json(post);
});

module.exports = app;
