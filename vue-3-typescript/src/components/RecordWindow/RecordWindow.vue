<script setup lang="ts">
  import { Vue } from "vue-class-component";
  import './RecordWindow.scss';
  import '@mdi/js';

  
  // export default class RecordWindow extends Vue {

  // }



</script>

<template>
  <div class="record-window">
    <div class="heading">
      <div class="title-container">
          <div class="title">
            <mdicon :size="48" class="icon icon-centered" name="accountSchool"></mdicon>
            <div class="record-text">
              <div class="record-title">{{ name }}</div>
              <div class="record-subtitle">{{ id }}</div>
            </div>
        </div>
      </div>
      <span class="icon-centered">
        <a style="color: rgb(170, 170, 170)" href="#">
          <mdicon :size="36" class="icon" name="pencil"></mdicon>
        </a>
      </span>
      <span class="icon-centered">
        <a style="color: rgb(170, 170, 170)" href="#">
          <mdicon :size="36" class="icon" name="close"></mdicon>
        </a>
      </span>
    </div>
    <div class="main-page">
      <div class="select-page">
        <a class="active" href="#/personaldata">Personal Data</a>
        <a href="/programme">Programme</a>
        <a href="/modules">Modules</a>
        <a href="/marks">Marks and Feedback</a>
        <a href="/exams">Examinations</a>
        <a href="/communication">Communication</a>
      </div>
      <div class="record">
        <div class="container">
          <h2>Personal data</h2>
          <div class="data-heading">test</div>
          <div>test</div>
        </div>
        <div class="container">
          <h2>Academic tutor</h2>
          <div class="data-heading">test</div>
          <div>test</div>
        </div>
        
      </div>
    </div>
    
  </div>
</template>