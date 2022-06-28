<template>
  <aside class="post-category">
    <h3 class="post-category__title">Category</h3>
    <nav class="post-category__list">
      <button class="item" v-for="c of this.categories" :key="c.category">
        <img
          class="item__img"
          :src="
            require(`~/assets/images/desktop/windows/post/${c.category}.png`)
          "
          alt=""
        />
        <span class="item__category">{{ c.category }}</span>
        <span class="item__count">{{ c.count }}</span>
      </button>
    </nav>
  </aside>
</template>

<script>
import { mapState } from "vuex";
export default {
  async fetch() {
    await this.$store.dispatch("notion/getCategories");
  },
  computed: {
    ...mapState("notion", ["categories"]),
  },
};
</script>
