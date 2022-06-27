<template>
  <main class="post-wrapper">
    <Category />
    <List />
    <Content />
    <div v-html="$store.state.notion.post.body"></div>
  </main>
</template>

<script>
import Category from "~/components/desktop/windows/post/Category";
import List from "~/components/desktop/windows/post/List";
import Content from "~/components/desktop/windows/post/Content";
export default {
  components: { Category, List, Content },
};
// import { mapState } from "vuex";
// export default {
//   computed: {
//     ...mapState("notion", ["posts", "post"]),
//   },

//   methods: {
//     async getPost(id) {
//       await this.$store.dispatch("notion/getPost", id);
//     },
//     async addPosts() {
//       await this.$store.dispatch("notion/addPosts");
//     },
//     async fetchPosts(category) {
//       await this.$store.dispatch("notion/fetchPosts", category);
//     },
//   },
// };
</script>
