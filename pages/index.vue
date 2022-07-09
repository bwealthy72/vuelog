<template>
  <div>
    <DesktopWindowList v-if="$device.isDesktop" />
    <MobileAppList v-else />
  </div>
</template>

<script>
export default {
  mounted() {
    this.$store.dispatch("loadingEnd");
  },
};
</script>
