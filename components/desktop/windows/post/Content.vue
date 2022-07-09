<template>
  <main
    class="post-content"
    :style="{ width: `calc(100% - ${categoryWidth}px - ${listWidth}px)` }"
  >
    <header class="post-content__header"></header>
    <article class="post-content__body">
      <template v-if="post">
        <div class="post-info">
          <img class="post-info__image" :src="post.cover" v-if="post.cover" />
          <div class="post-info__text">
            <strong class="category">{{ post.oriCategory }}</strong>
            <h1 class="title">{{ post.title }}</h1>
            <p class="created">
              {{ $moment(post.created).format("LL") }}
            </p>
          </div>
        </div>
        <div class="content" v-html="post.body"></div>
      </template>
      <div v-else class="loader-wrapper">
        <div class="loader"></div>
      </div>
    </article>
  </main>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState("notion", ["post"]),
    ...mapState("window", ["categoryWidth", "listWidth"]),
  },
};
</script>
