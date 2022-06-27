export const state = () => ({
  // Mac window들에 대한 정보를 담고있다.
  windows: {
    Post: {
      opened: true,
      minimized: true,
      x: -1,
      y: -1,
      width: 1080,
      height: 700,
      zIndex: 0,
    },
  },
  windowIdx: 1,
  focusedWindow: "Post",
});
