<template>
  <div class="container">
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

<style></style>
