<template>
  <div>
    <li v-for="p of postList" :key="p.id" @click="getPost(p.id)">
      {{ p.properties.title.title[0].text.content }}
    </li>
    <div>
      <button @click="fetchPosts('HTML')">fetch html</button>
      <button @click="fetchPosts('CSS')">fetch CSS</button>
      <button @click="addPosts()">more</button>
    </div>
    <div v-html="post.body"></div>
    <h2>
      <del
        ><i><u>Heading</u></i></del
      >
    </h2>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState("notion", ["postList", "post"]),
  },

  methods: {
    async getPost(id) {
      await this.$store.dispatch("notion/getPost", id);
    },
    async addPosts() {
      await this.$store.dispatch("notion/addPosts");
    },
    async fetchPosts(category) {
      await this.$store.dispatch("notion/fetchPosts", category);
    },
  },

  async fetch() {
    await this.fetchPosts("HTML");
  },
};
</script>
