<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import './HomeWindow.scss'
import LoadingScreen from '../WindowSetup/LoadingScreen/LoadingScreen.vue';
import '@mdi/js';

@Options({
  components: {
    LoadingScreen
  }
})

export default class HomeWindow extends Vue {

  public isLoading: boolean = true;

  mounted(){
    
  }

}
</script>

<template>  
  <LoadingScreen v-if="isLoading"></LoadingScreen>
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