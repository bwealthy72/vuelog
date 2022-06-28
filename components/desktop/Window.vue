<template>
  <section class="window" :style="style" @dblclick="dblClickHandler">
    <WindowBtns
      @close="close"
      @minimize="minimize"
      @maximize="isMaximized ? unMaximize() : maximize()"
    ></WindowBtns>
    <slot></slot>
  </section>
</template>

<script>
import WindowBtns from "~/components/desktop/WindowBtns.vue";
export default {
  components: { WindowBtns },
  data() {
    return {
      backup: {},
      isMaximized: false,
      timer: null, //
    };
  },
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  computed: {
    boundary() {
      return this.$store.state.window.boundary;
    },
    window() {
      return this.$store.state.window.windows[this.name];
    },
    style() {
      return {
        left: this.window.x + "px",
        top: this.window.y + "px",
        width: this.window.w + "px",
        height: this.window.h + "px",
        zIndex: this.window.zIndex,
      };
    },
  },
  methods: {
    startAni() {
      // 잠시 transition 값을 넣고 해당 값까지 transtion이 되도록 한다.
      this.$el.classList.add("animated");
      if (!this.timer) {
        this.timer = setTimeout(() => {
          this.$el.classList.remove("animated");
          this.timer = null;
        }, 500);
      }
    },
    endAni() {
      this.$el.classList.remove("animated");
    },
    close() {
      this.$store.dispatch("window/close", this.name);
    },
    minimize() {
      this.$store.dispatch("window/minimize", this.name);
    },
    dblClickHandler(e) {
      const headerHeight = this.$getScssLength("windowHeaderHeight");

      if (
        this.window.y < e.clientY &&
        e.clientY < this.window.y + headerHeight
      ) {
        if (this.isMaximized) {
          this.unMaximize();
        } else {
          this.maximize();
        }
      }
    },
    async maximize() {
      if (!this.isMaximized) {
        this.backup = this.$deepCopy(this.window);
        await this.$store.dispatch("window/maximize", {
          name: this.name,
          x: this.boundary.left,
          y: this.boundary.top,
          w: window.innerWidth - this.boundary.left,
          h: window.innerHeight - this.boundary.top,
        });
        this.isMaximized = true;
        this.startAni();
      }
    },
    async unMaximize() {
      if (this.isMaximized) {
        await this.$store.dispatch("window/unMaximize", {
          name: this.name,
          x: this.backup.x,
          y: this.backup.y,
          w: this.backup.w,
          h: this.backup.h,
        });
        this.isMaximized = false;
        this.startAni();
      }
    },
  },
};
</script>
