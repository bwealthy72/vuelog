export const state = () => ({
  loading: false,
});

export const mutations = {
  loadingStart(state) {
    state.loading = true;
  },
  loadingEnd(state) {
    state.loading = false;
  },
};

export const actions = {
  async nuxtServerInit({ commit }) {
    commit("loadingStart");
    commit("window/setBoundary", {
      top: this.$getScssLength("headerHeight"),
      left:
        this.$getScssLength("dockWidth") +
        this.$getScssLength("dockPad") * 2 +
        this.$getScssLength("dockMarginLeft"),
    });
  },
};
