let isRequesting = false;

export const state = () => ({
  posts: [],
  post: {},
  pageSize: 10,
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
    if (isRequesting) return;
    isRequesting = true;
    const data = await this.$axios.$get("/api/posts", {
      params: {
        category,
        pageSize: state.pageSize,
      },
    });

    commit("setPosts", data);
    commit("setCategory", category);
    isRequesting = false;
  },
  async addPosts({ state, commit }) {
    if (isRequesting) return;
    isRequesting = true;
    const data = await this.$axios.$get("/api/posts/next", {
      params: {
        category: state.category,
        pageSize: state.pageSize,
      },
    });

    commit("addPosts", data);

    const done = data.length == 0;
    isRequesting = false;
    return done;
  },

  async getPost({ commit }, id) {
    if (isRequesting) return;
    isRequesting = true;
    const data = await this.$axios.$get("/api/post", {
      params: {
        id,
      },
    });
    commit("setPost", data);
    commit("setPostId", id);
    isRequesting = false;
  },

  async getCategories({ commit }, id) {
    if (isRequesting) return;
    isRequesting = true;
    const data = await this.$axios.$get("/api/categories");

    commit("setCategories", data);
    isRequesting = false;
  },

  async getMusics({ commit }, id) {
    if (isRequesting) return;
    isRequesting = true;
    const data = await this.$axios.$get("/api/musics");

    commit("setMusics", data);
    isRequesting = false;
  },
};
