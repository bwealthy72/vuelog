<template lang="html">
  <div class="loading-page" v-if="loading">
    <img
      class="loading-page__image"
      src="~/assets/images/ico-apple.svg"
      alt="apple"
    />
    <div class="loading-page__progress">
      <div class="curr-bar" :style="{ width: progress + '%' }"></div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    progress: {
      type: Number,
      required: true,
    },
  },
  computed: {
    ...mapState(["loading"]),
  },
};
</script>

<style lang="scss" scoped>
.loading-page {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0);
  overflow: hidden;

  &__image {
    width: 60px;
    height: 60px;
  }

  &__progress {
    position: relative;
    margin-top: 80px;
    width: 180px;
    height: 5px;
    border-radius: 5px;
    background-color: #474747;

    .curr-bar {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      border-radius: 5px;
      background-color: white;
      transition: width 0.5s;
    }
  }
}
</style>
