<template>
  <LoadingScreen v-if="isLoading"></LoadingScreen>
  <div class="record-window">
    <div class="heading">
      <div class="title-container">
          <div class="title">
            <mdicon :size="48" class="icon icon-centered report-icon" name="fileDocumentOutline"></mdicon>
            <div class="record-text">
              <div class="record-title">{{ currentAssessment.assessmentDetail }}</div>
              <div class="record-subtitle">{{ currentAssessment.assessmentCode }}</div>
            </div>
        </div>
      </div>
      <span class="icon-centered">
        <a style="color: rgb(170, 170, 170)" href="#">
          <mdicon :size="36" class="record-icon" name="pencil"></mdicon>
        </a>
      </span>
      <span class="icon-centered">
        <a style="color: rgb(170, 170, 170)" href="/assessments">
          <mdicon :size="36" class="record-icon" name="close"></mdicon>
        </a>
      </span>
    </div>
    <div class="main-page">
      <div class="select-page">
        <div class="sidebox" :class="{active: assessmentDataVisible}" @click="setActive('assessments')">{{ $t("assessments.assessment") }}</div>
        <div class="sidebox" :class="{active: assessmentMarksVisible}" @click="setActive('assessmentMarks')">{{ $t("assessmentmarks.assessmentmarks") }}</div>
      </div>
      <div v-if="assessmentDataVisible" class="record">
        <div class="container">
          <h2>{{ $t("assessments.assessmentInfo") }}</h2>
          <div class="data-heading">{{ $t("assessments.assessmentDetail") }}</div>
          <div>{{ currentAssessment.assessmentDetail }}</div>
          <div class="data-heading">{{ $t("assessments.assessmentCode") }}</div>
          <div>{{ currentAssessment.assessmentCode }}</div>
          <div class="data-heading">{{ $t("assessments.assessmentType") }}</div>
          <div>{{ currentAssessment.assessmentType }}</div>
          <div class="data-heading">{{ $t("assessments.assessmentWeight") }}</div>
          <div>{{ currentAssessment.assessmentWeight }}%</div>
        </div>
        <div class="stacked-container">
          <div class="container">
              <div style="display: block">
                <h2>{{ $t("modules.moduleInfo") }}</h2>
                <div class="data-heading">{{ $t("modules.moduleTitle") }}</div>
                <div>{{ currentModule.moduleTitle }}</div>
                <div class="data-heading">{{ $t("modules.moduleCode") }}</div>
                <div>{{ currentModule.moduleCode }}</div>
              </div>
          </div>
          <div class="container">
            <h2>{{ $t("records.staffInfo") }}</h2>
            <div class="data-heading">Module Convenors</div>
            <div>test</div>
          </div>
        </div>
      </div>
      <div v-if="assessmentMarksVisible" class="record">
        
        <div class="container">
          <h2>{{ $t("assessmentmarks.assessmentmarks") }}</h2>
          <div class="data-heading">{{ $t("assessmentmarks.averageMark") }}</div>
          <div class="average">{{ averageMark }}</div>
          <RecordTable 
            :columns="assessmentMarkHeaders" 
            :fields="currentModuleAssessmentMarks" 
            :entity="'assessmentmarks'"
            >
          </RecordTable>
        </div>
        
      </div>
    </div>
    
  </div>
</template>
  
  <script lang="ts">
  import { Vue, Options } from "vue-class-component";
  import ModuleDataService from "@/services/ModuleDataService";
  import type Module from "@/types/Module";
  import AssessmentDataService from "@/services/AssessmentDataService";
  import type Assessment from "@/types/Assessment";
  import AssessmentMarksDataService from "@/services/AssessmentMarksDataService";
  import AssessmentMark from "@/types/AssessmentMark";
  import '../RecordWindow/RecordWindow.scss'
  import LoadingScreen from "../WindowSetup/LoadingScreen/LoadingScreen.vue";
  import RecordTable from "../RecordsTable/RecordTable.vue";

  @Options({
  components: {
    LoadingScreen,
    RecordTable,
  }})


  export default class AssessmentsList extends Vue {
    public assessmentDataVisible: boolean = true;
    public assessmentMarksVisible: boolean = false;
    public currentAssessment = {} as Assessment;
    public currentModule = {} as Module;
    public currentModuleAssessments: Assessment[] = [];
    public currentModuleAssessmentMarks: AssessmentMark[] = [];
    public assessmentMarkHeaders: string[] = [];
    public marks: number[] = [];
    public averageMark: number = 0;
    public isLoading: boolean = false;

    getAssessment(id: string) {
      this.isLoading = true;
      AssessmentDataService.get(id)
        .then(response => {
          this.currentAssessment = response.data;
          ModuleDataService.get(this.currentAssessment.moduleId)
          .then(response => {
            this.currentModule = response.data;
          })
          .catch(e => {
            console.log(e);
          });
        })
        .catch(e => {
          console.log(e);
        });
        this.isLoading = false;
    }

    getAssessmentMarks(id: string) {
      AssessmentMarksDataService.getByAssessment(id)
        .then(response => {
          this.currentModuleAssessmentMarks = response.data;
          this.assessmentMarkHeaders = ["assessmentMark", "assessmentGrade", "assessmentStatus", "assessmentState", "assessmentDate"];
          this.getAverageMarks();
        })
        .catch(e => {
          console.log(e);
        })
    }

    getAverageMarks() {
      for (let mark of this.currentModuleAssessmentMarks) {
        this.marks = this.marks.concat(mark.assessmentMark);
      }
      var sum = this.marks.reduce((a: number, b: number): number => a + b);
      this.averageMark = sum / this.marks.length;
    }

    updateAssessment() {
      if (this.currentAssessment.assessmentId) {
      AssessmentDataService.update(this.currentAssessment.assessmentId, this.currentAssessment)
        .then(response => {
        })
        .catch(e => {
          console.log(e);
        });
    }
  }

  setActive(activeWindow: string) {
      this.assessmentDataVisible = false;
      this.assessmentMarksVisible = false;
     if (activeWindow == "assessments") {
        this.assessmentDataVisible  = true;
      } else if (activeWindow == "assessmentMarks") {
        this.assessmentMarksVisible = true;
      }
    }

    mounted() {
      var routeId = this.$route.params.id;
      routeId = routeId.toString();
      this.getAssessment(routeId);
      this.getAssessmentMarks(routeId);
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