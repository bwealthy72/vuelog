<template>
  <nav class="site-dock">
    <div class="site-dock__item" v-for="app of apps" :key="app.name">
      <img :style="{ width: app.width }" :src="app.img" :alt="app.name" />
      <p class="site-dock__name" v-show="app.active">{{ app.name }}</p>
    </div>
  </nav>
</template>

<script>
const defaultWidth = 40;
export default {
  data() {
    return {
      apps: [
        {
          name: "Post",
          img: require(`~/assets/images/dock/Post.png`),
          width: defaultWidth,
          active: false,
        },
      ],
      aniID: null,
    };
  },
  methods: {
    updateWidth() {
      // 기존 애니메이션 제거
      window.cancelAnimationFrame(this.aniID);
      this.aniID = null;

      // 다시 애니메이션 추가
      this.aniID = window.requestAnimationFrame(() => {
        this.updateWidth();
      });
    },
  },
};
</script>

<style></style>
