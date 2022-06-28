import { MongoClient } from "mongodb";

export default {
  // db
  client: null,
  db: null,
  collection: null,

  // notion
  currPage: 0,
  pageNum: 5,
  category: null,

  async connect(db, collection) {
    // Connect to cluster
    this.client = new MongoClient(process.env.MONGODB_URI, {});
    await this.client.connect();
    this.db = this.client.db(db);
    this.collection = this.db.collection(collection);
  },
  async disconnect() {
    await this.client.close();
  },
  async getPosts(category, pageNum) {
    const cursor = await this.collection
      .find(category ? { category: { $eq: category } } : null)
      .project({ body: 0 })
      .limit(pageNum);
    this.currPage = 0;
    this.pageNum = pageNum;
    this.category = category;

    return cursor.toArray();
  },
  async addPosts() {
    const cursor = await this.collection
      .find(this.category ? { category: { $eq: this.category } } : null)
      .project({ body: 0, _id: 0 })
      .skip(++this.currPage * this.pageNum)
      .limit(this.pageNum);

    return cursor.toArray();
  },
  async getPost(pid) {
    return await this.collection.findOne({ pid });
  },
  async getCategories() {
    const cursor = await this.collection.find().project({ _id: 0 });
    return cursor.toArray();
  },
  async getMusics() {
    const cursor = await this.collection.find().project({ _id: 0 });
    return cursor.toArray();
  },
};
