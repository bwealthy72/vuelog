export default ({ route, $device, store }) => {
  let layout = "default";

  // home에서는 아무것도 띄우지 않는다.
  if (route.path === "/") {
    store.commit("window/setOpened", { name: "Post", opened: false });
  }

  if (route.params && route.params.code) {
    layout = "errorLayout"; // error 는 reserved되어 있어서 그런지 먹히지 않음(자동으로 default로 바뀜)
    // ssr에서는 error.vue가 먹히지 않음
  } else if ($device.isMobileOrTablet) {
    layout = "mobile";
  }

  route.matched[0].components.default.options.layout = layout;
};
