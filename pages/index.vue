<template>
  <div>
    <li v-for="p of postList" :key="p.id" @click="getPost(p.pid)">
      {{ p.title }}
    </li>
    <div>
      <button @click="fetchPosts('HTML')">fetch html</button>
      <button @click="fetchPosts('CSS')">fetch CSS</button>
      <button @click="addPosts('HTML')">HTML more</button>
      <button @click="addPosts('CSS')">CSS more</button>
    </div>
    <div v-html="post.body"></div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState("post", ["postList", "post"]),
  },

  methods: {
    async getPost(id) {
      await this.$store.dispatch("post/getPost", id);
    },
    async addPosts() {
      await this.$store.dispatch("post/addPosts");
    },
    async fetchPosts(category) {
      await this.$store.dispatch("post/fetchPosts", category);
    },
  },

  async asyncData(ctx) {
    await ctx.store.dispatch("post/fetchPosts");
    await ctx.store.dispatch(
      "post/getPost",
      "b0d11475-5d77-41ce-ad5c-0687e18aa9c6"
    );
  },
};
</script>
