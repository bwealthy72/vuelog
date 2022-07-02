<template>
  <div class="container">
    <img
      v-if="$device.isSafari"
      class="bg"
      src="~/assets/images/bg.png"
      alt=""
    />
    <video v-else autoplay muted loop class="bg">
      <source src="~/assets/images/bg.webm" type="video/webm" />
    </video>

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
