<template>
    <div class="loading">
      <mdicon :size="48" class="icon icon-centered loading-icon mdi-spin" name="loading"></mdicon>
    </div>
    
</template>
  
  <script lang="ts">
  import { Vue } from "vue-class-component";


  export default class LoadingScreen extends Vue {
   
  }
  </script>
  
  <style scoped>
  .loading {
    width: 88vw;
    background-color: #F4F4F4;
    height: 100%;
    position: fixed;
    text-align: center;
    line-height: 85vh;
  }

  .loading-icon {
    color: gray;
  }
  </style>