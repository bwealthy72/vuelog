<template>
  <div class="error">
    <!-- <img src="error__img" alt="error-image" />
    <h1 class="error__code">{{ $route.params.code }}</h1>
    <p class="error__msg">{{ msg }}</p> -->

    <NuxtLink to="/">Home으로 갈래!</NuxtLink>
  </div>
</template>

<script>
export default {
  computed: {
    msg() {
      let result = "";
      switch (this.$route.params.code) {
        case "429":
          result =
            "너무 많이 클릭하시거나 새로고침 하신 거 같아요! 잠시 뒤에 접속해주세요!";
      }
      return result;
    },
  },
};
</script>
