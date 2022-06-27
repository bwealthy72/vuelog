<template>
  <div class="window-btn">
    <button class="window-btn__item" @click="$emit('close')">
      <img
        class="main"
        src="~/assets/images/desktop/windows/mac-close-btn.png"
        alt="close-btn"
      />
      <img
        class="hover"
        src="~/assets/images/desktop/windows/mac-close-btn_active.png"
        alt="close-btn"
      />
    </button>
    <button class="window-btn__item" @click="$emit('minimize')">
      <img
        class="main"
        src="~/assets/images/desktop/windows/mac-min-btn.png"
        alt="minimize-btn"
      />
      <img
        class="hover"
        src="~/assets/images/desktop/windows/mac-min-btn_active.png"
        alt="minimize-btn"
      />
    </button>
    <button class="window-btn__item" @click="$emit('maximize')">
      <img
        class="main"
        src="~/assets/images/desktop/windows/mac-max-btn.png"
        alt="maximize-btn"
      />
      <img
        class="hover"
        src="~/assets/images/desktop/windows/mac-max-btn_active.png"
        alt="maximize-btn"
      />
    </button>
  </div>
</template>

<style lang="scss" scoped>
.window-btn {
  position: absolute;
  top: 1.8rem;
  left: 1.8rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 5.5rem;

  &:hover {
    .main {
      display: none;
    }

    .hover {
      display: block;
    }
  }

  &__item {
    width: 1.2rem;
    height: 1.2rem;
    display: flex;
    background-size: contain;
    cursor: default;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }

    .hover {
      display: none;
    }
  }
}
</style>
