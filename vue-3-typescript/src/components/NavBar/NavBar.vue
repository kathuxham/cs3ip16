<script setup lang="ts">
import './NavBar.scss';
  // defineProps<{
  //   msg: string;
  // }>();
</script>

<template>
  <div class="navbar">
    <span>
      <RouterLink to="/">
        <img
        alt="uor logo"
        class="logo"
        src="@/assets/rdg-device-reverse.png"
        height="40"
        />
      </RouterLink>
    </span>
      <RouterLink to="account">
        <span class="detailButton"><a href="#"><mdicon :size="36" class="icon" name="accountDetails"></mdicon></a></span>
      </RouterLink>
  </div>
</template>

<!-- <style scoped src="./NavBar.scss"></style> -->
