<template>
  <div>
    <DesktopWindowList v-if="$device.isDesktop" />
    <MobileAppList v-else />
  </div>
</template>

<script>
export default {
  middleware: cacheControl({
    "max-age": 60,
    "stale-when-revalidate": 5,
  }),
};
</script>
