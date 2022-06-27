<template>
  <section class="window-list">
    <template v-for="(w, name) in windows">
      <DesktopWindow v-if="w.opened" v-show="w.opened && !w.minimized">
        <component :is="name" />
      </DesktopWindow>
    </template>
  </section>
</template>

<script>
import Post from "@/components/desktop/windows/Post";
import { mapState } from "vuex";
export default {
  components: {
    Post,
  },
  computed: {
    ...mapState("window", ["windows"]),
  },
};
</script>

<style></style>
