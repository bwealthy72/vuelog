<template>
  <main class="post-content">
    <header class="post-content__header"></header>
    <p class="post-content__category">{{ post.oriCategory }}</p>
    <h1 class="post-content__title">{{ post.title }}</h1>
    <p class="post-content__created">{{ post.created }}</p>

    <article class="post-content__body" v-html="post.body"></article>
  </main>
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
