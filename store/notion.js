export const state = () => ({
  posts: [],
  post: {},
  pageSize: 7,
  category: "",
  postId: "",
  categories: [],
  musics: [],
});

export const mutations = {
  setPost(state, post) {
    state.post = post;
  },
  setPosts(state, posts) {
    state.posts = posts;
  },
  addPosts(state, posts) {
    state.posts = state.posts.concat(posts);
  },
  setCategory(state, category) {
    state.category = category;
  },
  setCategories(state, categories) {
    state.categories = categories;
  },
  setMusics(state, musics) {
    state.musics = musics;
  },
  setPostId(state, id) {
    state.postId = id;
  },
};

export const actions = {
  async getPosts({ state, commit }, category) {
    const data = await this.$axios.$get("/api/posts", {
      params: {
        category,
        pageSize: state.pageSize,
      },
    });

    commit("setPosts", data);
    commit("setCategory", category);
  },
  async addPosts({ state, commit }) {
    const data = await this.$axios.$get("/api/posts/next", {
      params: {
        category: state.category,
        pageSize: state.pageSize,
      },
    });

    commit("addPosts", data);

    const done = data.length == 0;
    return done;
  },

  async getPost({ commit }, id) {
    const data = await this.$axios.$get("/api/post", {
      params: {
        id,
      },
    });

    commit("setPost", data);
    commit("setPostId", id);
  },

  async getCategories({ commit }, id) {
    const data = await this.$axios.$get("/api/categories");

    commit("setCategories", data);
  },

  async getMusics({ commit }, id) {
    const data = await this.$axios.$get("/api/musics");

    commit("setMusics", data);
  },
};
