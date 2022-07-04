export const state = () => ({
  loading: true,
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

    if (this.$device.isDesktop) {
      commit("window/setBoundary", {
        top: this.$getScssLength("headerHeight"),
        left:
          this.$getScssLength("dockWidth") +
          this.$getScssLength("dockPad") * 2 +
          this.$getScssLength("dockMarginLeft"),
      });
    }
  },
};
