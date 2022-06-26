<template>
  <div
    class="slider"
    @mousedown="startControl"
    :style="{ height, borderRadius }"
  >
    <div class="slider__img" @click="toMin">
      <slot name="preImg"></slot>
    </div>
    <div class="slider__bar" ref="bar" :style="{ borderRadius }">
      <div
        class="currbar"
        :style="{ width: value + '%', borderRadius }"
        :class="{ active: updating }"
      ></div>
      <div
        class="currdot"
        :style="{
          left: value + '%',
          width: size * 3 + 'px',
          height: size * 3 + 'px',
        }"
        :class="{ active: updating }"
      ></div>
    </div>

    <div class="slider__img" @click="toMax">
      <slot name="suImg"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      required: true,
    },
    min: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 100,
    },
    size: {
      type: Number,
      default: 4,
    },
  },
  data() {
    return {
      timer: null, // for throttling
      updating: false,
    };
  },
  computed: {
    height() {
      return this.size + "px";
    },
    borderRadius() {
      return this.size + "px";
    },
  },
  methods: {
    toMin() {
      this.$emit("input", this.min);
    },
    toMax() {
      this.$emit("input", this.max);
    },
    update(e) {
      const rect = this.$refs.bar.getBoundingClientRect();
      let x = e.clientX;

      let newVal = 0;

      if (x < rect.left) {
        newVal = this.min;
      } else if (rect.right < e.clientX) {
        newVal = this.max;
      } else {
        newVal =
          ((x - rect.left) / rect.width) * (this.max - this.min) + this.min;
      }
      this.$emit("input", newVal);
    },
    startControl(e) {
      window.addEventListener("mousemove", this.moveControl);
      window.addEventListener("mouseup", this.endControl);
      this.updating = true;

      this.update(e);
    },
    moveControl(e) {
      if (!this.timer) {
        this.timer = setTimeout(() => {
          this.timer = null;

          this.update(e);
        }, 10);
      }
    },
    endControl() {
      this.updating = false;
      window.removeEventListener("mousemove", this.moveControl);
      window.removeEventListener("mouseup", this.endControl);
    },
  },
  beforeDestroy() {
    this.endControl();
  },
};
</script>

<style lang="scss" scoped>
.slider {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;

  &__bar {
    position: relative;
    height: 100%;
    width: 100%;
    background-color: darkgray;

    .currbar {
      height: 100%;
      background-color: white;
      &.active {
        background-color: rgb(255, 113, 93);
      }
    }
    .currdot {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border-radius: 50%;
      background-color: white;
      &.active {
        background-color: rgb(255, 113, 93);
      }
    }
  }

  &__img {
    height: 500%;
    display: flex;
    align-items: center;
    filter: brightness(0.7);

    &:first-of-type {
      > * {
        margin-right: 1rem;
      }
    }

    &:last-of-type {
      > * {
        margin-left: 1rem;
      }
    }

    &:active {
      filter: brightness(1);
    }
    img {
      height: 100%;
    }
  }
}
</style>
