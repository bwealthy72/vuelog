<template>
  <aside class="post-list-wrapper">
    <header class="header"></header>
    <div class="post-list" v-for="post of posts" :key="post.id">
      <strong class="post-list__category">{{ post.oriCategory }}</strong>
      <h3 class="post-list__title">{{ post.title }}</h3>
      <strong class="post-list__created">{{ post.createdAt }}</strong>
      <p class="post-list__desc">{{ post.description }}</p>
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
