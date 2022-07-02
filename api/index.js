import mongo from "./utils/mongo";
import rateLimit from "express-rate-limit";

const app = require("express")();

const limiter = rateLimit({
  windowMs: 5 * 1000, // 5초마다 리셋
  max: 12,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);

app.get("/posts", async (req, res) => {
  let result = null;
  try {
    await mongo.connect("notion", "posts");
    result = await mongo.getPosts(
      req.query.category,
      parseInt(req.query.pageSize)
    );
  } finally {
    await mongo.disconnect();
  }
  res.json(result);
});

app.get("/posts/next", async (req, res) => {
  let result = null;
  try {
    await mongo.connect("notion", "posts");
    result = await mongo.addPosts();
  } finally {
    await mongo.disconnect();
  }

  res.json(result);
});

app.get("/post", async (req, res) => {
  let result = null;
  try {
    await mongo.connect("notion", "posts");

    result = await mongo.getPost(req.query.id);
  } finally {
    await mongo.disconnect();
  }
  res.json(result);
});

app.get("/categories", async (req, res) => {
  let result = null;
  try {
    await mongo.connect("notion", "categories");
    result = await mongo.getCategories();
  } finally {
    await mongo.disconnect();
  }
  res.json(result);
});

app.get("/musics", async (req, res) => {
  let result = null;
  try {
    await mongo.connect("notion", "musics");
    result = await mongo.getMusics();
  } finally {
    await mongo.disconnect();
  }
  res.json(result);
});

module.exports = app;
