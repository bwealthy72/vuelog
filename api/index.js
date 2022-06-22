import * as notion from "./utils/notion";

const databaseId = process.env.NOTION_DATABASE_ID;

const app = require("express")();

app.get("/posts", async (req, res) => {
  const data = await notion.queryDatabase(
    databaseId,
    req.query.pageSize,
    req.query.hasMore,
    req.query.startCursor,
    req.query.category
  );
  res.json(data);
});

app.get("/post", async (req, res) => {
  const data = await notion.retrievePage(req.query.id);
  res.json(data);
});

module.exports = app;
