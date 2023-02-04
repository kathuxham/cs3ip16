<template>
  <LoadingScreen v-if="isLoading"></LoadingScreen>
  <div class="record-window">
    <div class="heading">
      <div class="title-container">
          <div class="title">
            <mdicon :size="48" class="icon icon-centered report-icon" name="bookMultipleOutline"></mdicon>
            <div class="record-text">
              <div class="record-title">{{ currentModule.moduleTitle }}</div>
              <div class="record-subtitle">{{ currentModule.moduleCode }}</div>
            </div>
        </div>
      </div>
      <span class="icon-centered">
        <a style="color: rgb(170, 170, 170)" href="#">
          <mdicon :size="36" class="record-icon" name="pencil"></mdicon>
        </a>
      </span>
      <span class="icon-centered">
        <a style="color: rgb(170, 170, 170)" href="/modules">
          <mdicon :size="36" class="record-icon" name="close"></mdicon>
        </a>
      </span>
    </div>
    <div class="main-page">
      <div class="select-page">
        <div class="sidebox active" >{{ $t("modules.modules") }}</div>
      </div>
      <div class="record">
        <div class="container">
          <h2>{{ $t("modules.moduleInfo") }}</h2>
          <div class="data-heading">{{ $t("modules.moduleTitle") }}</div>
          <div>{{ currentModule.moduleTitle }}</div>
          <div class="data-heading">{{ $t("modules.moduleCode") }}</div>
          <div>{{ currentModule.moduleCode }}</div>
          <div class="data-heading">{{ $t("modules.moduleLevel") }}</div>
          <div>{{ currentModule.moduleLevel }}</div>
          <div class="data-heading">{{ $t("modules.numberOfCredits") }}</div>
          <div>{{ currentModule.numberOfCredits }}</div>
          <div class="data-heading">{{ $t("modules.termsTaught") }}</div>
          <div>{{ currentModule.termsTaught }}</div>
          <div class="data-heading">{{ $t("modules.currentAsOf") }}</div>
          <div>{{ currentModule.currentAsOf }}</div>
          <div class="data-heading">{{ $t("modules.contactHours") }}</div>
          <div>{{ currentModule.contactHours }}</div>
        </div>
        <div class="container">
          <h2>Staff</h2>
          <div class="data-heading">Module Convenors</div>
          <div>test</div>
        </div>
        
      </div>
    </div>
    
  </div>
</template>
  
  <script lang="ts">
  import { Vue, Options } from "vue-class-component";
  import ModuleDataService from "@/services/ModuleDataService";
  import type Module from "@/types/Module";
  import '../RecordWindow/RecordWindow.scss'
  import LoadingScreen from "../LoadingScreen/LoadingScreen.vue";

  @Options({
  components: {
    LoadingScreen,
  }})


  export default class ModulesList extends Vue {
    public currentModule = {} as Module;
    public isLoading: boolean = false;

    getModule(id: string) {
      this.isLoading = true;
        ModuleDataService.get(id)
        .then(response => {
          this.currentModule = response.data;
          console.log(response.data);
          this.isLoading = false;
        })
        .catch(e => {
          console.log(e);
        });
    }

    updateModule() {
      if (this.currentModule.moduleId) {
      ModuleDataService.update(this.currentModule.moduleId, this.currentModule)
        .then(response => {
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  }

    mounted() {
      var routeId = this.$route.params.id;
      console.log(routeId.toString());
      this.getModule(routeId.toString());
    }
    

  }
  </script>
  
  <style scoped>
  .list {
    text-align: left;
    max-width: 750px;
    margin: auto;
  }
  </style>