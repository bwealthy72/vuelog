<template>
  <div class="container">
    <img v-if="$device.isSafari" class="bg" src="~/assets/images/bg.png" />
    <video v-else autoplay muted loop class="bg">
      <source src="~/assets/images/bg.webm" type="video/webm" />
    </video>

    <DesktopDock />
    <DesktopHeader />
    <Nuxt />

    <Loading :progress="loading.progress" v-if="!loading.isDone" />
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["loading"]),
  },
  beforeCreate() {
    this.$store.dispatch("loadingStart");
  },
};
</script>
