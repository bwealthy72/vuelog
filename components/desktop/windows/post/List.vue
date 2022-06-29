<template>
  <aside class="post-list">
    <header class="post-list__header"></header>
    <div class="post-list__item" v-for="post of posts" :key="post.id">
      <strong class="category">{{ post.oriCategory }}</strong>
      <h3 class="title">{{ post.title }}</h3>
      <strong class="created">{{ post.createdAt }}</strong>
      <p class="desc">{{ post.description }}</p>
    </div>
  </aside>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState("notion", ["posts"]),
  },
  // async fetch() {
  //   await this.$store.dispatch("notion/getPosts");
  // },
};
</script>

<style></style>
