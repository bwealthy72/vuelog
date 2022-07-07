export const state = () => ({
  posts: [],
  post: {},
  currPage: 0,
  pageSize: 7, // Infinite Scroll에서 에러가 나지 않기 위해 창의 세로 크기보다 많도록 해야함.
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
  setCurrPage(state, page) {
    state.currPage = page;
  },
};

export const actions = {
  async fetch({ state, commit }, { category, id }) {
    const result = await this.$axios.$get("/api/fetch", {
      params: {
        category,
        pageSize: state.pageSize,
        currPage: 0,
        id,
      },
    });
    commit("setCategory", category);
    commit("setPostId", id ? id : result.posts[0].id);
    commit("setPosts", result.posts);
    commit("setPost", result.post);
    commit("setCategories", result.categories);
  },
  async getPosts({ state, commit }, category) {
    commit("setPosts", []);
    commit("setCategory", category);

    const result = await this.$axios.$get("/api/posts", {
      params: {
        category,
        pageSize: state.pageSize,
        currPage: 0,
      },
    });
    commit("setPosts", result.data);
  },
  async addPosts({ state, commit }) {
    const result = await this.$axios.$get("/api/posts", {
      params: {
        category: state.category,
        pageSize: state.pageSize,
        currPage: state.currPage + 1,
      },
    });

    commit("setCurrPage", state.currPage + 1);
    commit("addPosts", result.data);

    return result.hasMore;
  },

  async getPost({ commit }, id) {
    commit("setPost", null);
    commit("setPostId", id);

    commit(
      "setPost",
      await this.$axios.$get("/api/post", {
        params: {
          id,
        },
      })
    );
  },

  async getCategories({ commit }) {
    commit("setCategories", await this.$axios.$get("/api/categories"));
  },

  async getMusics({ commit }, id) {
    commit("setMusics", await this.$axios.$get("/api/musics"));
  },
};
