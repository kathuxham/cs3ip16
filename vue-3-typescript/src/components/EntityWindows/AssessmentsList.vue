<template>
  <LoadingScreen v-if="isLoading"></LoadingScreen>
  <div class="report-window">
    <div class="heading">
      <div class="title-container icon-centered">
          <div class="title">
            <mdicon :size="48" class="icon icon-centered report-icon" name="fileDocumentOutline"></mdicon>
            <div class="record-text">
              <div class="record-title">{{ $t("assessments.assessments") }}</div>
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
            <select v-model="filteredModule">
                <option disabled value="">{{ $t("assessments.assessmentModuleFilter") }}</option>
                <option></option>
                <option v-for="option in modules" :value="option['moduleCode']">{{option['moduleCode']}}</option>
            </select>
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
            :columns="assessmentHeaders" 
            :fields="filteredAssessments" 
            :entity="entity"
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
    import AssessmentDataService from "@/services/AssessmentDataService";
    import Assessment from "@/types/Assessment";
    import RecordTable from "../RecordsTable/RecordTable.vue";
    import '../ReportWindow/ReportWindow.scss'
    import LoadingScreen from "../WindowSetup/LoadingScreen/LoadingScreen.vue";
    import { Watch } from "vue-property-decorator/lib/decorators/Watch";

  @Options({
  components: {
    RecordTable,
    LoadingScreen,
  }
})

  export default class AssessmentsList extends Vue {
    public modules: Module[] = [];
    public currentModule = {} as Module;
    public assessments: Assessment[] = [];
    public filteredAssessments: Assessment[] = [];
    public currentAssessment = {} as Assessment;
    public currentIndex: number = -1;
    public title: string = "";
    public assessmentHeaders: string[] = [];
    public entity: string = "assessments";
    public isLoading: boolean = false;
    public filteredModule: string = "";
  
    retrieveAssessments() {
        this.isLoading = true;
        AssessmentDataService.getAll()
        .then((response) => {
          this.assessments = response.data;
          this.filteredAssessments = this.assessments;
          this.assessmentHeaders = ["assessmentCode", "assessmentDetail", "assessmentType", "assessmentWeight"];
        })
        .catch((e) => {
          console.log(e);
        });
        ModuleDataService.getAll()
        .then((response) => {
            this.modules = response.data;
        })
        .catch((e) => {
          console.log(e);
        });
        this.isLoading = false;
    }
  
    refreshList() {
      this.retrieveAssessments();
      this.currentModule = {} as Module;
      this.currentIndex = -1;
    }
  
    setActiveModule(module: Module, index: number) {
      this.currentModule = module;
      this.currentIndex = index;
    }
  
    searchTitle() {
        this.isLoading = true;
        this.filteredAssessments = this.assessments.filter((assessment) => {
            var included = assessment.assessmentDetail.toLowerCase().includes(this.title.toLowerCase()) 
            || assessment.assessmentCode.toLowerCase().includes(this.title.toLowerCase());
            return included;
        });
        this.isLoading = false;
    }

    @Watch('filteredModule')
    onModuleLevelChange() {
        this.isLoading = true;
        this.filteredAssessments = this.assessments.filter((assessment) => {
            var included = (this.filteredModule == "") 
            || (assessment.assessmentCode.includes(this.filteredModule));
            return included;
        });
        this.isLoading = false;
    }
  
    mounted() {
      this.retrieveAssessments();
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