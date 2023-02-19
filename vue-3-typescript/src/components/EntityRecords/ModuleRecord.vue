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
        <div class="sidebox" :class="{active: moduleDataVisible}" @click="setActive('moduleData')">{{ $t("modules.module") }}</div>
        <div class="sidebox" :class="{active: assessmentsVisible}" @click="setActive('assessments')">{{ $t("assessments.assessments") }}</div>
        <div class="sidebox" :class="{active: assessmentMarksVisible}" @click="setActive('assessmentMarks')">{{ $t("assessmentmarks.assessmentmarks") }}</div>
      </div>
      <div v-if="moduleDataVisible" class="record">
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
          <h2>{{ $t("records.staffInfo") }}</h2>
          <div class="data-heading">{{ $t("records.moduleConvenor") }}</div>
          <router-link v-if="moduleConvenor.staffMemberId" :to="'/staffMembers/' + moduleConvenor.staffMemberId">
            {{ moduleConvenorIndividual.firstName + " " + moduleConvenorIndividual.lastName }}
          </router-link>

        </div>

        
      </div>
      <div v-if="assessmentsVisible" class="record">
        
        <div class="container">
          <h2>{{ $t("assessments.assessments") }}</h2>
          <RecordTable 
            :columns="assessmentHeaders" 
            :fields="currentModuleAssessments" 
            :entity="'assessments'"
            >
          </RecordTable>
        </div>
        
      </div>
      <div v-if="assessmentMarksVisible" class="record">
        
        <div class="container">
          <h2>{{ $t("assessments.assessments") }}</h2>
          <MarkBoard 
            :assessments="currentModuleAssessments"
            :assessmentMarks="averageAssessmentMarks"
            >
          </MarkBoard>
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
  import type StaffMember from "@/types/StaffMember";
  import IndividualDataService from "@/services/IndividualDataService";
  import Individual from "@/types/Individual";
  import AssessmentMark from "@/types/AssessmentMark";
  import AssessmentMarksDataService from "@/services/AssessmentMarksDataService";
  import '../RecordWindow/RecordWindow.scss'
  import LoadingScreen from "../WindowSetup/LoadingScreen/LoadingScreen.vue";
  import RecordTable from "../RecordsTable/RecordTable.vue";
  import MarkBoard from "../Dashboards/MarkBoard.vue";

  @Options({
  components: {
    LoadingScreen,
    RecordTable,
    MarkBoard
  }})


  export default class ModulesList extends Vue {
    public moduleDataVisible: boolean = true;
    public assessmentsVisible: boolean = false;
    public assessmentMarksVisible: boolean = false;

    public currentModule = {} as Module;
    public currentModuleAssessments: Assessment[] = [];
    public currentModuleAssessmentMarks: AssessmentMark[] = [];
    public assessmentHeaders: string[] = [];
    public averageAssessmentMarks: string[] = [];

    public moduleConvenor = {} as StaffMember;
    public moduleConvenorIndividual = {} as Individual;
    
    public isLoading: boolean = false;
    public routeId: string | string[] = "";

    getModule(id: string) {
      this.isLoading = true;
        ModuleDataService.get(id)
        .then(response => {
          this.currentModule = response.data;
            this.moduleConvenor = this.currentModule.moduleConvenor[0];
            IndividualDataService.get(this.currentModule.moduleConvenor[0].individualId)
            .then(response => {
              this.moduleConvenorIndividual = response.data;
            })
            .catch(e => {
              console.log(e);
            })
        })
        .catch(e => {
          console.log(e);
        });
        this.isLoading = false;
    }

    getAssessments(id: string) {
      AssessmentDataService.getAssessmentsByModule(id)
            .then(response => {
              this.currentModuleAssessments = response.data;
              this.assessmentHeaders = ["assessmentCode", "assessmentDetail", "assessmentType", "assessmentWeight"];
              this.getAssessmentMarks(this.currentModuleAssessments);
            })
            .catch(e => {
              console.log(e);
            })
    }

    getAssessmentMarks(assessments: Assessment[]) {
      for (let assessment of assessments) {
        if (assessment.id) {
          AssessmentMarksDataService.getByAssessment(assessment.id)
          .then(response => {
            var marks = [];
            for (let mark of response.data) {
              marks.push(mark.assessmentMark);
            }
            var sum = marks.reduce((a: number, b: number): number => a + b);
            var averageMark = sum / marks.length;
            this.averageAssessmentMarks.push(averageMark.toFixed(1));
          })
          .catch(e => {
            console.log(e);
          })
        }
      }
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

  setActive(activeWindow: string) {
      this.moduleDataVisible  = false;
      this.assessmentsVisible = false;
      this.assessmentMarksVisible = false;
      if (activeWindow == "moduleData") {
        this.moduleDataVisible  = true;
      } else if (activeWindow == "assessments") {
        this.assessmentsVisible  = true;
      }
      else if (activeWindow == "assessmentMarks") {
        this.assessmentMarksVisible  = true;
      }
    }

    mounted() {
      this.routeId = this.$route.params.id;
      this.routeId = this.routeId.toString();
      this.getModule(this.routeId);
      this.getAssessments(this.routeId);
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