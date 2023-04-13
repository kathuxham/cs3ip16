<script setup lang="ts">
import './NavBar.scss';
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
      <RouterLink to="">
        <span class="detailButton"><a href=""><mdicon :size="36" class="icon" name="accountDetails"></mdicon></a></span>
      </RouterLink>
  </div>
</template>
