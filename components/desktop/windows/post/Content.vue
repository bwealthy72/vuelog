<template>
  <main class="post-content">
    <header class="post-content__header"></header>
    <article class="post-content__body">
      <p class="category">{{ post.oriCategory }}</p>
      <h1 class="title">{{ post.title }}</h1>
      <p class="created">
        {{ $moment(post.created).format("LL") }}
      </p>
      <div class="body" v-html="post.body"></div>
    </article>
  </main>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState("notion", ["post"]),
  },
};
</script>

<style></style>
