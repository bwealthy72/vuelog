<template>
  <div class="container">
    <DesktopDock />
    <DesktopHeader />
    <Nuxt />
  </div>
</template>

<script>
export default {
  mounted() {
    this.$nextTick(() => {
      this.$store.commit("loadingEnd");
    });
  },
};
</script>
