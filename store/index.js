let timer = null;
export const state = () => ({
  loading: {
    isDone: false,
    progress: 0,
  },
});

export const mutations = {
  setLoadingState(state, bool) {
    state.loading.isDone = bool;
  },

  setLoadingProg(state, prog) {
    state.loading.progress = prog;
  },
};

export const actions = {
  async nuxtServerInit({ commit }) {
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
  loadingStart({ state, commit }) {
    timer = setInterval(() => {
      if (state.loading.progress < 90) {
        commit("setLoadingProg", state.loading.progress + 1);
      } else {
        clearInterval(timer);
      }
    }, 500);
  },
  loadingEnd({ commit }) {
    commit("setLoadingProg", 100);
    setTimeout(() => {
      commit("setLoadingState", true);
    }, 500);
  },
};
