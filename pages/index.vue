<template>
  <div>
    <DesktopWindowList v-if="$device.isDesktop" />
    <MobileAppList v-else />
  </div>
</template>

<script>
export default {
  beforeCreate() {
    this.$store.commit("window/setOpened", { name: "Post", opened: false });
  },
  mounted() {
    this.$store.dispatch("loadingEnd");
  },
};
</script>
