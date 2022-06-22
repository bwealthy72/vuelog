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
  nuxtServerInit({ commit }) {
    commit("loadingStart");
  },
};
