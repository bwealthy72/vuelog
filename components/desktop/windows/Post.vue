<template>
  <main
    class="post-wrapper"
    @mousedown="mouseDownHandler"
    @mousemove="mouseMoveHandler"
    @mouseup="mouseUpHandler"
    :style="{ cursor }"
  >
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
  data() {
    return {
      resizeMode: null,
      cursor: "inherit",
    };
  },
  components: { Category, List, Content },
  computed: {
    ...mapState("notion", ["posts", "post"]),
    ...mapState("window", ["categoryWidth", "listWidth"]),
  },
  methods: {
    mouseDownHandler(e) {
      this.resizeMode = this.getMouseMode(e);
    },
    mouseMoveHandler(e) {
      const rect = this.$el.getBoundingClientRect();
      if (this.resizeMode === "category") {
        const width = e.clientX - rect.left;
        if (width >= 150) {
          this.$store.commit("window/setCategoryWidth", width);
        }
      } else if (this.resizeMode === "list") {
        const width = e.clientX - rect.left - this.categoryWidth;
        if (width >= 200) {
          this.$store.commit("window/setListWidth", width);
        }
      } else {
        const mode = this.getMouseMode(e);
        if (mode == "category" || mode == "list") {
          this.cursor = "col-resize";
        } else {
          this.cursor = "inherit";
        }
      }
    },
    mouseUpHandler(e) {
      this.cursor = null;
      this.resizeMode = null;
    },
    getMouseMode(e) {
      const x = e.clientX;
      const rect = this.$el.getBoundingClientRect();

      let result;
      if (Math.abs(rect.left + this.categoryWidth - x) < 5) {
        result = "category";
      } else if (
        Math.abs(rect.left + this.categoryWidth + this.listWidth - x) < 5
      ) {
        result = "list";
      }
      return result;
    },
  },

  async fetch() {
    // let category = this.$route.params.category;
    // if (!category) category = "";
    // await this.$store.dispatch("notion/getCategories");
    // await this.$store.dispatch("notion/getPosts", category);
    // if (this.$route.params.id) {
    //   await this.$store.dispatch("notion/getPost", this.$route.params.id);
    // } else {
    //   await this.$store.dispatch(
    //     "notion/getPost",
    //     this.$store.state.notion.posts[0].id
    //   );
    // }
  },
};
</script>
