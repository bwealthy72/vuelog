<template>
  <aside class="post-list">
    <header class="post-list__header"></header>
    <nav class="post-list__body">
      <button
        class="item"
        v-for="p of posts"
        :key="p.id"
        :class="{ active: p.id == postId }"
        @click="changePost(p.id)"
      >
        <div class="item__text">
          <strong class="category">{{ p.oriCategory }}</strong>
          <h3 class="title">{{ p.title }}</h3>
          <strong class="created">{{ $moment(p.createdAt).fromNow() }}</strong>
          <p class="desc">{{ p.description }}</p>
        </div>
        <div class="item__image" v-if="p.cover">
          <img :src="p.cover" alt="cover" />
        </div>
      </button>

      <infinite-loading
        @infinite="infiniteHandler"
        spinner="spiral"
        :key="category"
      >
        <!-- category라는 key를 줌으로써 바뀌면 다시 렌더링한다. -->
        <div slot="spinner">Loading...</div>
        <div slot="no-more"></div>
      </infinite-loading>
    </nav>
  </aside>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState("notion", ["postId", "posts", "category"]),
  },
  methods: {
    infiniteHandler($state) {
      this.$store.dispatch("notion/addPosts").then((done) => {
        console.log(done);
        if (done) {
          $state.complete();
        } else {
          $state.loaded();
        }
      });
    },
    changePost(id) {
      this.$store.dispatch("notion/getPost", id);
    },
  },
};
</script>

<style></style>
