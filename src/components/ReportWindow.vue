<script setup lang="ts">
</script>

<template>
  <div class="record-window">
    <div class="heading">
      <div class="title-container icon-centered">
          <div class="title">
            <mdicon :size="48" class="icon icon-centered" name="accountSchool"></mdicon>
            <div class="record-text">
              <div class="record-title">Students</div>
            </div>
        </div>
      </div>
      <span class="icon-centered">
        <a style="color: rgb(170, 170, 170)" href="#">
          <mdicon :size="36" class="icon" name="close"></mdicon>
        </a>
      </span>
    </div>
    <div class="main-page">
      <div class="record">
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
.heading {
  height: 70px;
  display: flex;
  background-color: white;
  overflow: hidden;
  border: 1px solid rgb(170, 170, 170);
}

.title-container {
  font-size: 26px;
  flex-grow: 4;
}

.title {
  padding: 0 10px;
  display: flex;
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

.record-text {
  display: flex;
  flex-direction: column;
}

.record-title {
  font-size: 26px;;
}

.record-subtitle {
  font-size: 14px;
}

.sidebar {
  margin: 0;
  padding: 0;
  width: 200px;
  background-color: rgb(255, 255, 255);
  position: fixed;
  height: 100%;
  overflow: auto;
  border: 1px solid rgb(170, 170, 170);
  flex-grow: 1;
}

.sidebar a {
  display: block;
  color: black;
  padding: 16px;
  text-decoration: none;
  border: 1px solid #ebebeb;
}

.sidebar a.active {
  background-color: white;
  color: black;
}

.sidebar a:hover:not(.active) {
  background-color: #ebebeb;
  color: black;
}

div.content {
  margin-left: 200px;
  padding: 1px 16px;
  height: 1000px;
}

@media screen and (max-width: 700px) {
  .sidebar {
    width: 100%;
    height: auto;
    position: relative;
  }
  .sidebar a {float: left;}
  div.content {margin-left: 0;}
}

@media screen and (max-width: 400px) {
  .sidebar a {
    text-align: center;
    float: none;
  }
}

.container {
  flex-grow: 1;
  padding: 16px;
  margin: 10px;
  background-color: white;
  min-width: 400px;
  border-radius: 10px;
}

.icon{
  margin-right: 10px;
  height: 100%;
}

.data-heading{
  color: rgb(170, 170, 170);
}

.icon-centered{
  margin-top: auto;
  margin-bottom: auto;
}
</style>
