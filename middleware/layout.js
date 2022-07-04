export default ({ route, $device }) => {
  let layout = "default";

  if ($device.isMobileOrTablet) {
    layout = "mobile";
  }

  route.matched[0].components.default.options.layout = layout;
};
