<template>
  <div>
    <DesktopWindowList v-if="$device.isDesktop" />
    <MobileAppList v-else />
  </div>
</template>
