<template>
  <article class="post-content" v-html="post.body"></article>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState("notion", ["post"]),
  },
  // async fetch() {
  //   await this.$store.dispatch(
  //     "notion/getPost",
  //     this.$store.state.notion.posts[0].id
  //   );
  // },
};
</script>

<style></style>
