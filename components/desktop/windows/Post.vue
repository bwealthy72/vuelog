<template>
  <main
    class="post-wrapper"
    @mousedown="mouseDownHandler"
    @mousemove="mouseMoveHandler"
    @mouseup="mouseUpHandler"
    :style="{ cursor }"
  >
    <Category />
    <List :class="{ hide: listWidth < 50 }" />
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
        }
      } else if (this.resizeMode === "list") {
        const width = e.clientX - rect.left - this.categoryWidth;
        if (width >= 50) {
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

  beforeCreate() {
    const params = this.$route.params || {};
    let category = params ? params.category : "";
    let postId = params ? params.id : null;
    if (!category) category = "";

    const self = this;
    this.$store.dispatch("notion/fetch", { category, postId }).then(() => {
      self.$store.dispatch("loadingEnd");
    });

    // if (params && params.id) {
    //   this.$store.dispatch("notion/getPost", params.id).then(() => {
    //     this.$set(this, "contentDone", true);
    //   });
    // }

    // // TODO: fetch API 만들어서 끝나면 로딩 끝 이런 느낌을 만들자....

    // // this.$store.dispatch("notion/getCategories").then(() => {
    // //   this.$set(this, "categoryDone", true);
    // // });
    // this.$store.dispatch("notion/getPosts", category).then(() => {
    //   this.$set(this, "listDone", true);

    //   if (!params.id) {
    //     this.$store
    //       .dispatch("notion/getPost", this.$store.state.notion.posts[0].id)
    //       .then(() => {
    //         this.$set(this, "contentDone", true);
    //       });
    //   }
    // });
  },
};
</script>
