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
        <div class="full-width-container">
            <h2>{{ $t("assessmentmarks.assessmentmarks") }}</h2>
            <div style="display: flex;">
                <div class="average-student" 
                    @click="setActiveChart('prevPrevYear')"
                    :class="{'selected-year': previousPreviousYearActive}"
                    v-if="averageMarkPreviousPreviousYear != ''">
                    <div class="data-heading">{{ $t("assessmentmarks.averageMarkFrom") + (currentYear - 2) }}</div>
                    <div class="average">{{ averageMarkPreviousPreviousYear}}</div>
                </div>
                <div class="average-student" 
                    @click="setActiveChart('prevYear')"
                    :class="{'selected-year': previousYearActive}"
                    v-if="averageMarkPreviousYear != ''">
                    <div class="data-heading">{{ $t("assessmentmarks.averageMarkFrom") + (currentYear - 1) }}</div>
                    <div class="average">{{ averageMarkPreviousYear}}</div>
                </div>
                <div class="average-student" 
                    @click="setActiveChart('currYear')"
                    :class="{'selected-year': currentYearActive}"
                    v-if="averageMarkThisYear != ''">
                    <div class="data-heading">{{ $t("assessmentmarks.averageMarkFrom") + currentYear }}</div>
                    <div class="average">{{ averageMarkThisYear}}</div>
                </div>
                <div class="average-student"
                    @click="setActiveChart('allYears')"
                    :class="{'selected-year': allMarksActive}">
                    <div class="data-heading">{{ $t("assessmentmarks.averageMarkOverall") }}</div>
                    <div class="average"><b>{{ averageMark }}</b></div>
                </div>
            </div>
            <div class="spacer"></div>
            <PieChart 
                class="average-breakdown"
                v-if="previousPreviousYearActive"
                :importedData="previousPreviousYearChartData"
                :xAxis="'grade'"
                :yAxis="'count'"
                :idName="'chartDivOne'"
                :chartName="'Distribution of grades in ' + (currentYear - 2).toString()">
            </PieChart>
            <PieChart 
                class="average-breakdown"
                v-if="previousYearActive"
                :importedData="previousYearChartData"
                :xAxis="'grade'"
                :yAxis="'count'"
                :idName="'chartDivTwo'"
                :chartName="'Distribution of grades in ' + (currentYear - 1).toString()">
            </PieChart>
            <PieChart 
                class="average-breakdown"
                v-if="currentYearActive"
                :importedData="currentYearChartData"
                :xAxis="'grade'"
                :yAxis="'count'"
                :idName="'chartDivThree'"
                :chartName="'Distribution of grades in ' + currentYear.toString()">
            </PieChart>
            <PieChart
                class="average-breakdown" 
                v-if="allMarksActive"
                :importedData="allYearsChartData"
                :xAxis="'grade'"
                :yAxis="'count'"
                :idName="'chartDivFour'"
                :chartName="'Distribution of grades in ' + (currentYear - 2).toString() + '-' + currentYear.toString()">
            </PieChart>
            <select style="margin-bottom: 15px;" v-model="filteredYear">
                <option disabled value="">{{ $t("modules.moduleLevelFilter") }}</option>
                <option :value="0">All</option>
                <option v-if="averageMarkPreviousPreviousYear != '0'" :value="(currentYear - 2)">{{ (currentYear - 2) }}</option>
                <option v-if="averageMarkPreviousYear != '0'" :value="(currentYear - 1)">{{ (currentYear - 1) }}</option>
                <option v-if="averageMarkThisYear != '0'" :value="currentYear">{{ currentYear }}</option>
            </select>
          <RecordTable 
            :columns="assessmentMarkHeaders" 
            :fields="filteredAssessmentMarks" 
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
    import { Watch } from "vue-property-decorator/lib/decorators/Watch";
    import LineGraph from "../Charts/LineGraph.vue"
    import BarChart from "../Charts/BarChart.vue";
    import PieChart from "../Charts/PieChart.vue";

    @Options({
    components: {
        LoadingScreen,
        RecordTable,
        LineGraph,
        BarChart,
        PieChart
    }})


    export default class AssessmentsList extends Vue {
        public assessmentDataVisible: boolean = true;
        public assessmentMarksVisible: boolean = false;
        public currentAssessment = {} as Assessment;
        public currentModule = {} as Module;
        public currentModuleAssessments: Assessment[] = [];
        public currentModuleAssessmentMarks: AssessmentMark[] = [];
        public filteredAssessmentMarks: AssessmentMark[] = [];
        public assessmentMarkHeaders: string[] = [];
        public marks: number[] = [];
        public averageMark: string = "";
        public averageMarkThisYear: string = "";
        public averageMarkPreviousYear: string = "";
        public averageMarkPreviousPreviousYear: string = "";
        public isLoading: boolean = false;

        public currentYear: number = 0;
        public filteredYear: number = 0;

        public currentYearChartData: any[] = [];
        public previousYearChartData: any[] = [];
        public previousPreviousYearChartData: any[] = [];
        public allYearsChartData: any[] = [];
        public currentYearActive: boolean = false;
        public previousYearActive: boolean = false;
        public previousPreviousYearActive: boolean = false;
        public allMarksActive: boolean = true;

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
                this.filteredAssessmentMarks = this.currentModuleAssessmentMarks;
                this.assessmentMarkHeaders = ["assessmentMark", "assessmentGrade", "assessmentStatus", "assessmentState", "assessmentDate"];
                var currentYearMarks = [];
                var previousYearMarks = [];
                var previousPreviousYearMarks = [];
                var gradeCounterCurrentYear = [0, 0, 0, 0];
                var gradeCounterPreviousYear = [0, 0, 0, 0];
                var gradeCounterPreviousPreviousYear = [0, 0, 0, 0];
                var gradeCounterAllYears = [0, 0, 0, 0];
                for (let mark of response.data) {
                    this.marks.push(mark.assessmentMark);
                    this.incrementGradeCounter(mark.assessmentGrade, gradeCounterAllYears);
                    if (mark.assessmentDate.includes(this.currentYear)) {
                        currentYearMarks.push(mark.assessmentMark);
                        this.incrementGradeCounter(mark.assessmentGrade, gradeCounterCurrentYear);
                    } else if (mark.assessmentDate.includes(this.currentYear - 1)) {
                        previousYearMarks.push(mark.assessmentMark);
                        this.incrementGradeCounter(mark.assessmentGrade, gradeCounterPreviousYear);
                    } else if (mark.assessmentDate.includes(this.currentYear - 2)) {
                        previousPreviousYearMarks.push(mark.assessmentMark);
                        this.incrementGradeCounter(mark.assessmentGrade, gradeCounterPreviousPreviousYear);
                    }
                }
                this.averageMark = this.getAverageMark(this.marks);
                if (currentYearMarks.length != 0) {
                    this.averageMarkThisYear = this.getAverageMark(currentYearMarks);
                }
                if (previousYearMarks.length != 0) {
                    this.averageMarkPreviousYear = this.getAverageMark(previousYearMarks);
                }    
                if (previousPreviousYearMarks.length != 0) {
                    this.averageMarkPreviousPreviousYear = this.getAverageMark(previousPreviousYearMarks);
                }
                this.currentYearChartData = [{
                    "grade": "A",
                    "count": gradeCounterCurrentYear[0]
                }, {
                    "grade": "B",
                    "count": gradeCounterCurrentYear[1]
                }, {
                    "grade": "C",
                    "count": gradeCounterCurrentYear[2]
                }, {
                    "grade": "D",
                    "count": gradeCounterCurrentYear[3]
                }];
                this.previousYearChartData = [{
                    "grade": "A",
                    "count": gradeCounterPreviousYear[0]
                }, {
                    "grade": "B",
                    "count": gradeCounterPreviousYear[1]
                }, {
                    "grade": "C",
                    "count": gradeCounterPreviousYear[2]
                }, {
                    "grade": "D",
                    "count": gradeCounterPreviousYear[3]
                }];
                this.previousPreviousYearChartData = [{
                    "grade": "A",
                    "count": gradeCounterPreviousPreviousYear[0]
                }, {
                    "grade": "B",
                    "count": gradeCounterPreviousPreviousYear[1]
                }, {
                    "grade": "C",
                    "count": gradeCounterPreviousPreviousYear[2]
                }, {
                    "grade": "D",
                    "count": gradeCounterPreviousPreviousYear[3]
                }];
                this.allYearsChartData = [{
                    "grade": "A",
                    "count": gradeCounterAllYears[0]
                }, {
                    "grade": "B",
                    "count": gradeCounterAllYears[1]
                }, {
                    "grade": "C",
                    "count": gradeCounterAllYears[2]
                }, {
                    "grade": "D",
                    "count": gradeCounterAllYears[3]
                }];
            })
            .catch(e => {
            console.log(e);
            })
        }

        incrementGradeCounter(grade: string, counter: any[]) {
            if (grade == "A") {
                counter[0]++;
            } else if (grade == "B") {
                counter[1]++;
            } else if (grade == "C") {
                counter[2]++;
            } else if (grade == "D") {
                counter[3]++;
            }
        }

        getAverageMark(marks: any) {
            var sum = marks.reduce((a: number, b: number): number => a + b);
            var averageMark = sum / marks.length;
            return averageMark.toFixed(1);
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

        @Watch('filteredYear')
        filterMarks() {
            this.filteredAssessmentMarks = this.currentModuleAssessmentMarks.filter((assessment) => {
                var included = ((this.filteredYear == 0) || (assessment.assessmentDate.toString().includes(this.filteredYear.toString())));
                return included;
            });
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

        setActiveChart(activeChart: string) {
            this.currentYearActive = false;
            this.previousYearActive = false;
            this.previousPreviousYearActive = false;
            this.allMarksActive = false;
            if (activeChart == "prevPrevYear") {
                this.previousPreviousYearActive  = true;
            } else if (activeChart == "prevYear") {
                this.previousYearActive  = true;
            } else if (activeChart == "currYear") {
                this.currentYearActive  = true;
            } else if (activeChart == "allYears") {
                this.allMarksActive  = true;
            }
        }

        mounted() {
            var routeId = this.$route.params.id;
            routeId = routeId.toString();
            this.getAssessment(routeId);
            this.getAssessmentMarks(routeId);
        }

        created() {
            this.currentYear = new Date().getFullYear();
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