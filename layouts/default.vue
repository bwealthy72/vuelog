<template>
  <div class="container">
    <video autoplay muted loop width="100%" class="bg">
      <source src="~/assets/images/bg.webm" type="video/webm" />
    </video>

    <DesktopDock />
    <DesktopHeader />
    <!-- <Nuxt /> -->
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
