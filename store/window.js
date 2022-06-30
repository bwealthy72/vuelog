export const state = () => ({
  boundary: {
    top: 0,
    left: 0,
  },

  // Mac window들에 대한 정보를 담고있다.
  windows: {
    Post: {
      opened: true,
      minimized: false,
      x: 0,
      y: 0,
      w: 1080,
      h: 700,
      zIndex: 0,
    },
  },
});

export const mutations = {
  setBoundary(state, { top, left }) {
    state.boundary.top = top;
    state.boundary.left = left;

    for (const name in state.windows) {
      state.windows[name].x = left;
      state.windows[name].y = top;
    }
  },
  setOpened(state, { name, opened }) {
    state.windows[name].opened = opened;
  },
  setMinimized(state, { name, minimized }) {
    state.windows[name].minimized = minimized;
  },
  setRect(state, { name, x, y, h, w }) {
    state.windows[name].x = x;
    state.windows[name].y = y;
    state.windows[name].w = w;
    state.windows[name].h = h;
  },
  setPos(state, { name, x, y }) {
    state.windows[name].x = x;
    state.windows[name].y = y;
  },
  setWindowIdx(state, { name, zIndex }) {
    state.windows[name].zIndex = zIndex;
  },
};

export const actions = {
  open({ state, commit }, name) {
    const window = state.windows[name];
    if (!window.opened) {
      commit("setOpened", { name, opened: true });
    } else {
      commit("setMinimized", { name, minimized: false });
    }
  },
  close({ commit }, name) {
    commit("setOpened", { name, opened: false });
  },
  minimize({ commit }, name) {
    commit("setMinimized", { name, minimized: true });
  },
  maximize({ commit }, { name, x, y, h, w }) {
    commit("setRect", { name, x, y, h, w });
  },
  unMaximize({ commit }, { name, x, y, h, w }) {
    commit("setRect", { name, x, y, h, w });
  },
  move({ commit }, { name, x, y }) {
    commit("setPos", { name, x, y });
  },
  focus({ state, commit }, name) {
    let maxZIndex = -1;
    for (const w in state.windows) {
      maxZIndex = Math.max(state.windows[w].zIndex, maxZIndex);
    }

    // 최대 값이 현재 윈도우랑 같으면 바꿀 필요가 없다.
    if (state.windows[name].zIndex != maxZIndex) {
      commit("setWindowIdx", { name, zIndex: ++maxZIndex });
    }
  },
};
