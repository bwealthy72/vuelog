let isRequesting = false;

export const state = () => ({
  posts: [],
  post: {},
  pageSize: 10,
  category: "",
  postId: "",
  categories: [],
  musics: [],

  turnOnInfinite: false, // 미리 켜지면 스크롤이 여러번 실행되서 에러가 나옴
  // 미리 켜지면 client와 server-side render가 다르다는 에러가 나옴
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
  setTurnOnInfinite(state, bool) {
    state.turnOnInfinite = bool;
  },
};

export const actions = {
  async getPosts({ state, commit }, category) {
    if (isRequesting) return;
    isRequesting = true;
    commit("setPosts", null);
    commit("setCategory", category);

    const data = await this.$axios.$get("/api/posts", {
      params: {
        category,
        pageSize: state.pageSize,
      },
    });

    commit("setPosts", data);
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
    commit("setPost", null);
    commit("setPostId", id);

    const data = await this.$axios.$get("/api/post", {
      params: {
        id,
      },
    });
    commit("setPost", data);
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
