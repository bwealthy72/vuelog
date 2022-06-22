export const state = () => ({
  postList: [],
  post: {},
  startCursor: null,
  hasMore: false,
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
  setStartCursor(state, nextCursor) {
    state.startCursor = nextCursor;
  },
  setHasMore(state, hasMore) {
    state.hasMore = hasMore;
  },
  setCategory(state, category) {
    state.category = category;
  },
};

export const actions = {
  async fetchPosts({ commit }, category) {
    const res = await this.$axios.get("/api/posts", {
      params: {
        pageSize: 3,
        category,
      },
    });

    commit("setPostList", res.data.results);
    commit("setHasMore", res.data.has_more);
    commit("setStartCursor", res.data.next_cursor);
    commit("setCategory", category);
  },
  async addPosts({ state, commit }) {
    // 더이상 부를게 없다면 종료
    if (!state.hasMore) return;

    const res = await this.$axios.get("/api/posts", {
      params: {
        pageSize: 3,
        startCursor: state.startCursor,
        hasMore: state.hasMore,
        category: state.category,
      },
    });

    commit("addPostList", res.data.results);
    commit("setHasMore", res.data.has_more);
    commit("setStartCursor", res.data.next_cursor);
  },

  async getPost({ commit }, id) {
    const res = await this.$axios.get("/api/post", {
      params: {
        id,
      },
    });

    if (res.status == 200) {
      commit("setPost", res.data);
    }
  },
};
