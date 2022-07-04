<template>
  <header class="desktop-header">
    <img
      class="desktop-header__logo"
      src="@/assets/images/ico-apple.svg"
      alt="logo"
    />
    <p class="desktop-header__title">{{ title }}</p>
    <DesktopHeaderIconList />
    <p class="desktop-header__clock">{{ datetime }}</p>
  </header>
</template>

<script>
export default {
  data() {
    return {
      title: "My VueLog",
      datetime: null,
    };
  },
  methods: {
    getTime() {
      return this.$moment(new Date()).format("MMM Do (ddd) A hh:mm");
    },
  },
  created() {
    this.datetime = this.getTime();
    setInterval(() => {
      this.datetime = this.getTime();
    }, 60 * 1000);
  },
};
</script>
