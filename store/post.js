export const state = () => ({
  postList: [],
  post: {},
  pageSize: 5,
  category: "",
});

export const mutations = {
  setPost(state, post) {
    state.post = post;
  },
  setPostList(state, postList) {
    state.postList = postList;
  },
  addPostList(state, postList) {
    state.postList = state.postList.concat(postList);
  },
  setCategory(state, category) {
    state.category = category;
  },
};

export const actions = {
  async fetchPosts({ state, commit }, category = "") {
    const data = await this.$axios.$get("/api/posts", {
      params: {
        category,
        pageSize: state.pageSize,
      },
    });

    commit("setPostList", data);
    commit("setCategory", category);
  },
  async addPosts({ state, commit }) {
    const data = await this.$axios.$get("/api/posts/next", {
      params: {
        category: state.category,
        pageSize: state.pageSize,
      },
    });

    commit("addPostList", data);
  },

  async getPost({ commit }, id) {
    const data = await this.$axios.$get("/api/post", {
      params: {
        id,
      },
    });

    commit("setPost", data);
  },
};
