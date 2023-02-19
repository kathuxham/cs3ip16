<template>
  <LoadingScreen v-if="isLoading"></LoadingScreen>
  <div class="report-window">
    <div class="heading">
      <div class="title-container icon-centered">
          <div class="title">
            <mdicon :size="48" class="icon icon-centered report-icon" name="bookMultipleOutline"></mdicon>
            <div class="record-text">
              <div class="record-title">{{ $t("modules.modules") }}</div>
            </div>
        </div>
      </div>
      <span class="icon-centered">
        <a style="color: rgb(170, 170, 170)" href="#">
          <mdicon :size="36" class="report-icon" name="close"></mdicon>
        </a>
      </span>
    </div>
    <div class="main-page">
        <div class="table-container">
          <div class="input-box">
            <input
            type="text"
            class="form-control"
            placeholder="Search"
            v-model="title"
          />
            <button
              class="btn btn-outline-secondary"
              type="button"
              @click="searchTitle"
            >
              Search
            </button>
          </div>
          
          <RecordTable 
            :columns="jointHeaders" 
            :fields="modules" 
            :entity="entity"
            :secondaryEntity="secondaryEntity"
            :joinedColumns="individualHeaders"
            :joinedFields="moduleConvenors"
            >
          </RecordTable>

        </div>
    </div>
  </div>
  </template>
  
  <script lang="ts">
  import { Vue, Options } from "vue-class-component";
  import ModuleDataService from "@/services/ModuleDataService";
  import type Module from "@/types/Module";
  import IndividualDataService from "@/services/IndividualDataService";
  import Individual from "@/types/Individual";
  import RecordTable from "../RecordsTable/RecordTable.vue";
  import '../ReportWindow/ReportWindow.scss'
  import LoadingScreen from "../WindowSetup/LoadingScreen/LoadingScreen.vue";

  @Options({
  components: {
    RecordTable,
    LoadingScreen,
  }
})

  export default class ModulesList extends Vue {
    public modules: Module[] = [];
    public currentModule = {} as Module;
    public currentIndividual = {} as Individual;
    public moduleConvenors: Individual[] = [];
    public moduleConvenorIndividuals: Individual[] = [];
    public individualHeaders: string[] = [];
    public jointHeaders: string[] = [];
    public currentIndex: number = -1;
    public title: string = "";
    public moduleHeaders: string[] = [];
    public entity: string = "modules";
    public secondaryEntity: string = "moduleConvenors";
    public isLoading: boolean = false;
  
    retrieveModules() {
      this.isLoading = true;
        ModuleDataService.getAll()
        .then((response) => {
          this.modules = response.data;
          this.moduleHeaders = ["moduleCode", "moduleTitle", "moduleLevel", "numberOfCredits", "termsTaught"];
          console.log(response.data);
          for (let convenor of this.modules) {
              IndividualDataService.get(convenor.moduleConvenor[0].individualId)
              .then(response => {
                this.currentIndividual = response.data;
                convenor.moduleConvenorIndividual = this.currentIndividual;
                this.individualHeaders = ["moduleConvenor"];
                this.moduleConvenors = this.moduleConvenors.concat(this.currentIndividual);
              })
              .catch(e => {
                console.log(e);
              })
            }
            this.jointHeaders = ["moduleCode", "moduleTitle", "moduleLevel", "numberOfCredits", "termsTaught", "moduleConvenor"];
        })
        .catch((e) => {
          console.log(e);
        });
        this.isLoading = false;
    }
  
    refreshList() {
      this.retrieveModules();
      this.currentModule = {} as Module;
      this.currentIndex = -1;
    }
  
    setActiveModule(module: Module, index: number) {
      this.currentModule = module;
      this.currentIndex = index;
    }
  
    searchTitle() {
        ModuleDataService.findByTitle(this.title)
        .then((response) => {
          this.modules = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  
    mounted() {
      this.retrieveModules();
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