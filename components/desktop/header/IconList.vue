<template>
  <div class="header-icon-list">
    <DesktopHeaderIcon v-for="(icon, name) in icons" :key="name" :name="name">
      <img :src="icon.img" slot="icon" />
      <component :is="icon.component" slot="body"></component>
    </DesktopHeaderIcon>
  </div>
</template>

<script>
import MusicPlayer from "~/components/desktop/header/icons/MusicPlayer.vue";
import { mapState } from "vuex";
export default {
  data() {
    return {
      icons: {
        musicPlayer: {
          img: require("~/assets/images/audio/music.png"),
          component: "MusicPlayer",
        },
      },
    };
  },
  computed: {
    ...mapState("header", ["activatedItem"]),
  },
  methods: {
    deactivateHeaderIcon() {
      if (this.activatedItem) {
        this.$store.dispatch("header/deactivate");
      }
    },
  },
  mounted() {
    window.addEventListener("mousedown", this.deactivateHeaderIcon);
  },
  beforeDestroy() {
    window.removeEventListener("mousedown", this.deactivateHeaderIcon);
  },
  components: { MusicPlayer },
};
</script>
