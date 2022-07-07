import { MongoClient } from "mongodb";

// class Collection {
//   constructor(col) {
//     this._col = col;
//   }

//   async getPosts(category, pageSize) {
//     const cursor = await this._col
//       .find(category ? { category: { $eq: category } } : null)
//       .project({ body: 0 })
//       .limit(pageSize);

//     this.currPage = 0;
//     this.pageSize = pageSize;
//     this.category = category;

//     const result = await cursor.toArray();
//     await cursor.close();

//     return result;
//   }

//   async addPosts() {
//     const cursor = await this.collection
//       .find(this.category ? { category: { $eq: this.category } } : null)
//       .project({ body: 0, _id: 0 })
//       .skip(++this.currPage * this.pageNum)
//       .limit(this.pageNum);

//     const result = await cursor.toArray();
//     await cursor.close();

//     return result;
//   }

//   async getPost(id) {
//     const result = await this.collection.findOne({ id });
//     return result;
//   }

//   async getCategories() {
//     const cursor = await this.collection.find().project({ _id: 0 });
//     const result = await cursor.toArray();
//     await cursor.close();

//     return result;
//   }

//   async getMusics() {
//     const cursor = await this.collection.find().project({ _id: 0 });
//     const result = await cursor.toArray();
//     await cursor.close();

//     return result;
//   }
// }

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
    } finally {
      this.disconnect();
    }
    return result;
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
