<template>
  <section class="window">
    <div class="window__header">
      <WindowBtns
        @close="close"
        @minimize="minimize"
        @maximize="maximize"
      ></WindowBtns>
    </div>
    <div class="window__body">
      <slot></slot>
    </div>
  </section>
</template>

<script>
import WindowBtns from "~/components/desktop/WindowBtns.vue";
export default {
  components: { WindowBtns },
  props: {
    width: {
      type: Number,
      require: true,
    },
    height: {
      type: Number,
      require: true,
    },
    name: {
      type: String,
      required: true,
    },
    zIndex: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      x: 0,
      y: 0,
      w: this.width,
      h: this.height,

      boundary: {
        top: 0,
        left: 0,
      },
    };
  },
  computed: {
    style() {
      return {
        left: this.x + "px",
        top: this.y + "px",
        width: this.w + "px",
        height: this.h + "px",
        zIndex: this.zIndex,
      };
    },
  },
};
</script>

<style></style>
