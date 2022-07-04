<template>
  <aside class="post-list" :style="{ width: listWidth + 'px' }">
    <header class="post-list__header"></header>
    <nav class="post-list__body" ref="body">
      <template v-if="posts">
        <button
          class="item"
          v-for="p of posts"
          :key="p.id"
          :class="{ active: p.id == postId }"
          @click="changePost(p.id)"
        >
          <div class="item__text">
            <strong class="category">{{ p.oriCategory }}</strong>
            <h3 class="title">{{ p.title }}</h3>
            <strong class="created">{{
              $moment(p.createdAt).fromNow()
            }}</strong>
            <p class="desc">{{ p.description }}</p>
          </div>
          <div class="item__image" v-if="p.cover">
            <img :src="p.cover" alt="cover" />
          </div>
        </button>

        <infinite-loading
          @infinite="infiniteHandler"
          spinner="spiral"
          v-if="turnOnInfinite"
          :identifier="identifierId"
        >
          <div slot="no-more"></div>
          <div slot="no-results"></div>
        </infinite-loading>
      </template>
      <div class="loader-wrapper" v-else>
        <div class="loader"></div>
      </div>
    </nav>
  </aside>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      turnOnInfinite: false,
      identifierId: 0,
    };
  },
  computed: {
    ...mapState("notion", ["postId", "posts", "category"]),
    ...mapState("window", ["listWidth"]),
  },
  watch: {
    category(v) {
      this.identifierId = v;
      this.$refs.body.scrollTo(0, 0); // If this isn't here, infinite scroll run many times.
    },
  },
  methods: {
    infiniteHandler($state) {
      this.$store.dispatch("notion/addPosts").then((done) => {
        if (done) {
          $state.complete();
        } else {
          $state.loaded();
        }
      });
    },

    async changePost(id) {
      if (id != this.postId) {
        await this.$store.dispatch("notion/getPost", id);
      }
    },
  },

  mounted() {
    // 미리 켜지면 client와 server-side render가 다르다는 에러가 나옴
    this.turnOnInfinite = true;
  },
};
</script>

<style></style>
