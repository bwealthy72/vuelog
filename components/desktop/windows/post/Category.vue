<template>
  <aside class="post-category" :style="{ width: categoryWidth + 'px' }">
    <h3 class="post-category__title">Category</h3>
    <nav class="post-category__list">
      <button
        class="item"
        v-for="c of categories"
        :key="c.category"
        :class="{ active: c.category === category }"
        @click="changeCategory(c.category)"
      >
        <img
          class="item__img"
          :src="
            require(`~/assets/images/desktop/windows/post/${c.oriCategory}.png`)
          "
          alt=""
        />
        <span class="item__category">{{ c.oriCategory }}</span>
        <span class="item__count">{{ c.count }}</span>
      </button>
    </nav>
  </aside>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState("notion", ["categories", "category", "pageSize", "posts"]),
    ...mapState("window", ["categoryWidth", "listWidth"]),
  },
  methods: {
    async changeCategory(category) {
      if (this.listWidth <= 10) {
        this.$store.commit("window/setListWidth", 350);
      }
      await this.$store.dispatch("notion/getPosts", category);
      await this.$store.dispatch(
        "notion/getPost",
        this.$store.state.notion.posts[0].id
      );
    },
  },
};
</script>
