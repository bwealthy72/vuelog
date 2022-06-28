<template>
  <nav class="site-dock" @mousemove="onMouseMove" @mouseleave="onMouseLeave">
    <button class="site-dock__item" v-for="app of apps" :key="app.name">
      <img
        :style="{ 'min-width': app.width + 'px' }"
        :src="app.img"
        :alt="app.name"
        ref="imgs"
        @mousemove="app.active = true"
        @mouseleave="app.active = false"
        @click="$store.dispatch('window/open', app.name)"
      />
      <p v-show="app.active">{{ app.name }}</p>
    </button>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      apps: [
        {
          name: "Post",
          img: require(`~/assets/images/dock/Post.png`),
          width: 0,
          active: false,
        },
      ],
      aniID: null,
      minWidth: 0,
      speed: 0.06, // 0 ~ 1
      moveTimer: null, // for throttling
      leaveTimer: null, // for
    };
  },
  computed: {
    maxWidth() {
      return this.minWidth * 2;
    },
    step() {
      return (this.maxWidth - this.minWidth) * this.speed;
    },
  },
  methods: {
    updateTo(widths) {
      // 기존 애니메이션 제거
      window.cancelAnimationFrame(this.aniID);
      this.aniID = null;

      let isAllDone = true;
      this.apps.forEach((app, idx) => {
        // 현재 width와 목표 width를 비교해서 부족한 만큼 채운다.
        let newWidth = null;
        if (widths[idx] < app.width) {
          newWidth = Math.max(app.width - this.step, widths[idx]);
        } else if (widths[idx] > app.width) {
          newWidth = Math.min(app.width + this.step, widths[idx]);
        }

        if (newWidth) {
          this.$set(app, "width", newWidth);
          isAllDone = false;
        }
      });

      // 다시 애니메이션 추가
      if (!isAllDone) {
        this.aniID = window.requestAnimationFrame(() => {
          this.updateTo(widths);
        });
      }
    },
    onMouseMove(e) {
      // Dock 안에서의 마우스의 위치를 구한다.
      const dockRect = e.target.getBoundingClientRect();
      const y = e.clientY - dockRect.top;

      const goalWidths = [];
      for (const app of this.$refs.imgs) {
        // 각 app 아이콘에서 중심 위치를 구한다.
        const rect = app.getBoundingClientRect();
        const center = rect.top - dockRect.top + rect.height / 2;

        // 목표크기에서 (거리 / 3) 의 크기를 뺀다.
        // 가까울 수록 목표크기에 가까울 것이다.
        const dist = Math.abs(center - y);
        goalWidths.push(Math.max(this.maxWidth - dist / 2, this.minWidth));
      }

      // 목표 크기에 맞게 아이콘 크기를 변경한다.
      this.updateTo(goalWidths);
    },
    onMouseLeave(e) {
      // 원래 크기로 되돌림
      const goalWidths = [];
      for (const app of this.apps) {
        goalWidths.push(this.minWidth);
      }

      this.updateTo(goalWidths);
    },
  },
  created() {
    this.minWidth = this.$getScssLength("dockWidth");
    for (const app of this.apps) {
      app.width = this.minWidth;
    }
  },
};
</script>
