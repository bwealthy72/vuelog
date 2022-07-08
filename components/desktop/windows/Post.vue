<template>
  <main
    class="post-wrapper"
    @mousedown="mouseDownHandler"
    @mousemove="mouseMoveHandler"
    @mouseup="mouseUpHandler"
    :style="{ cursor }"
  >
    <Category :class="{ small: categoryWidth < 150 }" />
    <List :class="{ hide: listWidth < 100 }" />
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
    ...mapState("notion", ["posts", "post", "fetchDone"]),
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
        } else {
          this.$store.commit("window/setCategoryWidth", 50);
        }
      } else if (this.resizeMode === "list") {
        const width = e.clientX - rect.left - this.categoryWidth;
        if (width >= 100) {
          this.$store.commit("window/setListWidth", width);
        } else {
          this.$store.commit("window/setListWidth", 10);
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

  beforeCreate() {
    const params = this.$route.params || {};
    let category = params ? params.category : "";
    let postId = params ? params.id : null;
    if (!category) category = "";

    const self = this;
    this.$store.dispatch("notion/fetch", { category, postId }).then(() => {
      self.$store.dispatch("loadingEnd");
    });
  },
};
</script>
