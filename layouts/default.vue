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

    <Loading />
  </div>
</template>

<script>
export default {
  mounted() {
    window.onNuxtReady(() => {
      this.$store.commit("loadingEnd");
      console.log("nuxt ready");
    });
  },
};
</script>
