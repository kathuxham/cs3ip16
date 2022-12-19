<script setup lang="ts">
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
    <span class="detailButton"><a href="#"><mdicon :size="36" class="icon" name="accountDetails"></mdicon></a></span>
  </div>
</template>

<style scoped>

.navbar {
  display: flex;
  background-color: #296B64;
  overflow: hidden;
}
  .logo {
    margin: 20px;
  }

  .detailButton {
    margin: auto;
    margin-right: 0;
    height: 48px;
  }

  .icon{
    margin-right: 10px;
    color: #ffffff;
    width: 48px;
  }
</style>
