import { Db } from "mongodb";
import mongo from "./utils/mongo";

const app = require("express")();

app.get("/posts", async (req, res) => {
  await mongo.connect("notion", "posts");

  const posts = await mongo.getPosts(
    req.query.category,
    parseInt(req.query.pageSize)
  );

  await mongo.disconnect();

  res.json(posts);
});

app.get("/posts/next", async (req, res) => {
  await mongo.connect("notion", "posts");

  const posts = await mongo.addPosts();
  await mongo.disconnect();
  res.json(posts);
});

app.get("/post", async (req, res) => {
  await mongo.connect("notion", "posts");

  const post = await mongo.getPost(req.query.id);
  await mongo.disconnect();
  res.json(post);
});

app.get("/categories", async (req, res) => {
  await mongo.connect("notion", "categories");

  const categories = await mongo.getCategories();
  mongo.disconnect();
  res.json(categories);
});

app.get("/musics", async (req, res) => {
  await mongo.connect("notion", "musics");

  const musics = await mongo.getMusics();
  mongo.disconnect();
  res.json(musics);
});

module.exports = app;
