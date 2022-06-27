<template>
  <article class="post-content"></article>
</template>

<script>
export default {
  async fetch() {
    await this.$store.dispatch(
      "notion/getPost",
      this.$store.state.notion.posts[0].pid
    );
  },
};
</script>

<style></style>
