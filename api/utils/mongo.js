import { MongoClient } from "mongodb";

class NotionDB {
  async connect() {
    this.client = new MongoClient(process.env.MONGODB_URI, {});
    await this.client.connect();
    this.db = this.client.db("notion");
  }

  disconnect() {
    this.client.close();
  }

  async run(func) {
    let result = null;
    try {
      await this.connect();
      result = await func();
    } catch (e) {
      console.error("문제 발생", e);
    } finally {
      this.disconnect();
    }
    return result;
  }

  async fetch(category, pageSize, currPage, postId) {
    return await this.run(async () => {
      const postsCol = await this.db.collection("posts");

      let cursor = postsCol
        .find(category ? { category: { $eq: category } } : null)
        .project({ _id: 0, body: 0 })
        .skip(currPage * pageSize)
        .limit(pageSize);

      const posts = await cursor.toArray();
      await cursor.close();

      const id = postId ? postId : posts[0].id;
      const post = await postsCol.findOne({ id });

      cursor = await this.db
        .collection("categories")
        .find()
        .project({ _id: 0 });

      const categories = await cursor.toArray();
      await cursor.close();

      return { posts, post, categories };
    });
  }

  async getPosts(category, pageSize, currPage) {
    return await this.run(async () => {
      const cursor = await this.db
        .collection("posts")
        .find(category ? { category: { $eq: category } } : null)
        .project({ _id: 0, body: 0 })
        .skip(currPage * pageSize)
        .limit(pageSize);

      const data = await cursor.toArray();
      const result = {
        data,
        hasMore: await cursor.hasNext(),
      };
      await cursor.close();
      return result;
    });
  }

  async getPost(id) {
    return await this.run(async () => {
      const result = await this.db.collection("posts").findOne({ id });
      return result;
    });
  }
  async getCategories() {
    return await this.run(async () => {
      const cursor = await this.db
        .collection("categories")
        .find()
        .project({ _id: 0 });

      const result = await cursor.toArray();
      await cursor.close();

      return result;
    });
  }

  async getMusics() {
    return await this.run(async () => {
      const cursor = await this.db
        .collection("musics")
        .find()
        .project({ _id: 0 });
      const result = await cursor.toArray();
      await cursor.close();

      return result;
    });
  }
}

export { NotionDB };
