<template>
  <DesktopWindowList />
</template>

<script>
export default {
  middleware: cacheControl({
    "max-age": 60,
    "stale-when-revalidate": 5,
  }),
};
</script>
