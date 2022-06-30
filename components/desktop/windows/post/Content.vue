<template>
  <main class="post-content">
    <header class="post-content__header"></header>
    <nuxt-img
      src="https://s3.us-west-2.amazonaws.com/secure.notion-static.com/e3970e96-9718-407e-884a-4c20f8eddfe3/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220630%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220630T141638Z&X-Amz-Expires=3600&X-Amz-Signature=71cc72664057909ca9d1531ce3ed51d98bde8509c2be4a4f996869feeab5041a&X-Amz-SignedHeaders=host&x-id=GetObject"
    ></nuxt-img>
    <article class="post-content__body">
      <p class="category">{{ post.oriCategory }}</p>
      <h1 class="title">{{ post.title }}</h1>
      <p class="created">
        {{ $moment(post.created).format("LL") }}
      </p>
      <div class="content" v-html="post.body"></div>
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
