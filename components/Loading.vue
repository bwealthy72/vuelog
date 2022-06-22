<template lang="html">
  <div class="loading-page" v-if="loading">
    <img src="~/assets/images/loading.webp" alt="loading" />
    <p>Loading...</p>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["loading"]),
  },
};
</script>

<style scoped>
.loading-page {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(4px);
  background-color: rgba(0, 0, 0, 0.2);
}
.loading-page img {
  width: 60px;
}
.loading-page p {
  font-size: 25px;
  font-weight: bold;
  color: white;
  margin: 5px;
}
</style>
