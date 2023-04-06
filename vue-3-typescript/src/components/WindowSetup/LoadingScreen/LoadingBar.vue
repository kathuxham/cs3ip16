<template>
    <div class="loading-bar">
      <mdicon :size="48" class="icon icon-centered loading-icon mdi-spin" name="loading"></mdicon>
    </div>
    
</template>
  
  <script lang="ts">
  import { Vue } from "vue-class-component";


  export default class LoadingScreen extends Vue {
   
  }
  </script>
  
  <style scoped>
  .loading-bar {
    width: 42%;
    height: 42%;
    position: fixed;
    text-align: center;
    line-height: 200px;
  }

  .loading-icon {
    color: gray;
  }
  </style>