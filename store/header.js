export const state = () => ({
  activatedItem: "musicPlayer",
});

export const mutations = {
  setActivatedItem(state, item) {
    state.activatedItem = item;
  },
};

export const actions = {
  deactivate({ commit }) {
    commit("setActivatedItem", null);
  },
  toggle({ state, commit }, item) {
    if (state.activatedItem === item) {
      commit("setActivatedItem", null);
    } else {
      commit("setActivatedItem", item);
    }
  },
};
