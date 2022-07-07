import rateLimit from "express-rate-limit";
import { NotionDB } from "./utils/mongo";

// TODO: CORS 적용하기
const app = require("express")();
const limiter = rateLimit({
  windowMs: 5 * 1000, // 5초마다 리셋
  max: 12,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);
app.get("/posts", async (req, res) => {
  const db = new NotionDB();

  const result = await db.getPosts(
    req.query.category,
    parseInt(req.query.pageSize),
    parseInt(req.query.currPage)
  );

  res.json(result);
});

app.get("/post", async (req, res) => {
  const db = new NotionDB();
  const result = await db.getPost(req.query.id);

  res.json(result);
});

app.get("/categories", async (req, res) => {
  const db = new NotionDB();
  const result = await db.getCategories();

  res.json(result);
});

app.get("/musics", async (req, res) => {
  const db = new NotionDB();
  const result = await db.getMusics();

  res.json(result);
});

module.exports = app;
