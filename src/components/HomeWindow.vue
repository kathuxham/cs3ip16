<script setup lang="ts">


</script>

<template>
  <div class="record-window">
    
    <div class="main-page">
      <div class="record">
        <div class="container">
          <div class="data-heading">test</div>
          <div>test</div>
        </div>
        <div class="container">
          <div class="data-heading">test</div>
          <div>test</div>
        </div>
        
      </div>
    </div>
    
  </div>
</template>

<style scoped>

.record-window {
  width: 100%;
  background-color: #F4F4F4;
  height: 100%;
  /* display: flex; */
}

.main-page {
  display: flex;
}

.record {
  display: flex;
  background-color: #F4F4F4;
  width: 100%;
  flex-wrap: row wrap;
}

.container {
  flex-grow: 1;
  padding: 16px;
  margin: 10px;
  background-color: white;
  min-width: 400px;
  border-radius: 10px;
}

.data-heading{
  color: rgb(170, 170, 170);
}

</style>
