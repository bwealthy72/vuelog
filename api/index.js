import rateLimit from "express-rate-limit";
import { NotionDB } from "./utils/mongo";

console.log("Server Initializing...");

// TODO: CORS 적용하기
const app = require("express")();
const limiter = rateLimit({
  windowMs: 60 * 1000, // 너무 많은 요청시 60초 기다리고 실행
  max: 15,
  delayMs: 500,
  standardHeaders: true,
  legacyHeaders: false,
  handler(req, res) {
    res.status(this.statusCode).json({
      code: this.statusCode,
      message: "1분에 15번 0.5초씩 요청가능",
    });
  },
});
app.use(limiter);

app.get("/fetch", async (req, res) => {
  const db = new NotionDB();

  const result = await db.fetch(
    req.query.category,
    parseInt(req.query.pageSize),
    parseInt(req.query.currPage),
    req.query.id
  );

  res.json(result);
});

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

console.log("Server Initialized");

module.exports = app;
