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

    <Loading :progress="progress" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      progress: 0,
    };
  },
  mounted() {
    const timer = setInterval(() => {
      if (this.progress < 90) {
        this.progress += 1;
        clearInterval(this.timer);
      }
    }, 500);

    window.onNuxtReady(() => {
      this.progress = 100;
      clearInterval(this.timer);
      setTimeout(() => {
        this.$store.commit("loadingEnd");
      }, 500);
    });
  },
};
</script>
