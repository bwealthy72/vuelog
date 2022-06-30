<template>
  <main class="post-wrapper">
    <Category />
    <List />
    <Content />
  </main>
</template>

<script>
import Category from "~/components/desktop/windows/post/Category";
import List from "~/components/desktop/windows/post/List";
import Content from "~/components/desktop/windows/post/Content";
import { mapState } from "vuex";

export default {
  components: { Category, List, Content },
  computed: {
    ...mapState("notion", ["posts", "post"]),
  },

  async fetch() {
    let category = this.$route.params.category;
    if (!category) category = "";

    await this.$store.dispatch("notion/getCategories");
    await this.$store.dispatch("notion/getPosts", category);
    if (this.$route.params.id) {
      await this.$store.dispatch("notion/getPost", this.$route.params.id);
    } else {
      await this.$store.dispatch(
        "notion/getPost",
        this.$store.state.notion.posts[0].id
      );
    }
  },
};
</script>
