export const state = () => ({
  posts: [],
  post: {},
  pageSize: 10,
  category: "",
  postId: "",
  categories: [],
  musics: [],

  isCategoriesDone: false,
  isPostsDone: false,

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
  doneCategories(state) {
    state.isCategoriesDone;
  },
  donePosts(state) {
    state.isPostsDone;
  },
};

export const actions = {
  async fetchAll({ state, commit, rootState }, { category, postId }) {
    commit("setCategory", category);
    commit("setPostId", postId);

    if (postId) {
      await this.$axios
        .$get("/api/post", {
          params: {
            id: postId,
          },
        })
        .then((post) => {
          commit("setPost", post);
        });
    }
    const categories = await this.$axios.$get("/api/categories");
    commit("setCategories", categories);

    const posts = await this.$axios.$get("/api/posts", {
      params: { category, pageSize: state.pageSize },
    });
    commit("setPosts", posts);

    const post = this.$axios.$get("/api/post", { params: { id: posts[0].id } });
    commit("setPost", post);
  },

  async getPosts({ state, commit }, category) {
    commit("setPosts", null);
    commit("setCategory", category);

    const data = await this.$axios.$get("/api/posts", {
      params: {
        category,
        pageSize: state.pageSize,
      },
    });

    commit("setPosts", data);
    // 일정 이상 적으면 무한 스크롤이 실행됨
    // hasmore 만드는 것도 고려해봐야함
    if (data.length >= state.pageSize) {
      commit("setTurnOnInfinite", true);
    }
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
    commit("setPost", null);
    commit("setPostId", id);

    const data = await this.$axios.$get("/api/post", {
      params: {
        id,
      },
    });
    commit("setPost", data);
  },

  async getCategories({ commit }) {
    const data = await this.$axios.$get("/api/categories");
    commit("setCategories", data);
  },

  async getMusics({ commit }, id) {
    const data = await this.$axios.$get("/api/musics");

    commit("setMusics", data);
  },
};
