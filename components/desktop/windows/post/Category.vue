<template>
  <aside class="post-category">
    <h3 class="post-category__title">Category</h3>
    <nav class="post-category__list"></nav>
  </aside>
</template>

<script>
export default {
  async fetch() {
    await this.$store.dispatch("notion/getCategories");
  },
};
</script>
