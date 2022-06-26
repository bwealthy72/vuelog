<template>
  <div class="header-icon">
    <button
      class="header-icon__menu"
      @mousedown.stop="activate"
      :class="{ active: activated }"
    >
      <slot name="icon"></slot>
    </button>
    <section class="header-icon__body" v-show="activated" @mousedown.stop="">
      <slot name="body"></slot>
    </section>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapState("header", ["activatedItem"]),
    activated() {
      return this.activatedItem == this.name;
    },
  },
  methods: {
    activate() {
      // store에 저장해서 현재 띄운 header icon 저장
      this.$store.dispatch("header/toggle", this.name);
    },
  },
};
</script>
