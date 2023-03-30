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
                <div class="full-width-container">
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
                <div class="full-width-container">
                    <h2>{{ $t("assessmentmarks.assessmentmarks") }}</h2>
                    <div style="display: flex;" class="marks">
                        <div class="average-student" 
                            @click="setActiveChart('prevPrevYear')"
                            :class="{'selected-year': previousPreviousYearActive}"
                            v-if="averageMarkPreviousPreviousYear != ''">
                            <div class="data-heading">{{ (currentYear - 2) }}</div>
                            <div class="average">{{ averageMarkPreviousPreviousYear}}</div>
                        </div>
                        <div class="average-student" 
                            @click="setActiveChart('prevYear')"
                            :class="{'selected-year': previousYearActive}"
                            v-if="averageMarkPreviousYear != ''">
                            <div class="data-heading">{{ (currentYear - 1) }}</div>
                            <div class="average">{{ averageMarkPreviousYear}}</div>
                        </div>
                        <div class="average-student" 
                            @click="setActiveChart('currYear')"
                            :class="{'selected-year': currentYearActive}"
                            v-if="averageMarkThisYear != ''">
                            <div class="data-heading">{{ currentYear }}</div>
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
                    <BarChart
                        v-if="allMarksActive"
                        class="average-breakdown" 
                        :importedData="allYearsChartData" 
                        :xAxis="'assessment'" 
                        :yAxis="'average'"
                        :xAxisTitle="'Assessment'"
                        :yAxisTitle="'Average Mark'"
                        :idName="'chartDivOne'"
                        :chartName="'Average marks by assessment in ' + (currentYear - 2).toString() + '-' + currentYear.toString()">>
                    </BarChart>
                    <BarChart 
                        class="average-breakdown"
                        v-if="previousPreviousYearActive"
                        :importedData="previousPreviousYearChartData" 
                        :xAxis="'assessment'" 
                        :yAxis="'average'"
                        :xAxisTitle="'Assessment'"
                        :yAxisTitle="'Average Mark'"
                        :idName="'chartDivTwo'"
                        :chartName="'Average marks by assessment in ' + (currentYear - 2).toString()">
                    </BarChart>
                    <BarChart 
                        class="average-breakdown" 
                        v-if="previousYearActive"
                        :importedData="previousYearChartData" 
                        :xAxis="'assessment'" 
                        :yAxis="'average'"
                        :xAxisTitle="'Assessment'"
                        :yAxisTitle="'Average Mark'"
                        :idName="'chartDivThree'"
                        :chartName="'Average marks by assessment in ' + (currentYear - 1).toString()">>
                    </BarChart>
                    <BarChart 
                        class="average-breakdown"
                        v-if="currentYearActive"
                        :importedData="currentYearChartData" 
                        :xAxis="'assessment'" 
                        :yAxis="'average'"
                        :xAxisTitle="'Assessment'"
                        :yAxisTitle="'Average Mark'"
                        :idName="'chartDivFour'"
                        :chartName="'Average marks by assessment in ' + currentYear.toString()">>
                    </BarChart>
                    <MarkBoard 
                        :assessments="currentModuleAssessments"
                        :assessmentMarks="averageAssessmentMarks"
                        :assessmentMarksThisYear="averageAssessmentMarksThisYear"
                        :assessmentMarksPreviousYear="averageAssessmentMarksPreviousYear"
                        :assessmentMarksPreviousPreviousYear="averageAssessmentMarksPreviousPreviousYear"
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
    import BarChart from "../Charts/BarChart.vue";

    @Options({
    components: {
        LoadingScreen,
        RecordTable,
        MarkBoard,
        BarChart
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
        public averageAssessmentMarksThisYear: string[] = [];
        public averageAssessmentMarksPreviousYear: string[] = [];
        public averageAssessmentMarksPreviousPreviousYear: string[] = [];

        public moduleConvenor = {} as StaffMember;
        public moduleConvenorIndividual = {} as Individual;
        
        public isLoading: boolean = false;
        public routeId: string | string[] = "";

        public averageMark: string = "";
        public averageMarkThisYear: string = "";
        public averageMarkPreviousYear: string = "";
        public averageMarkPreviousPreviousYear: string = "";

        public currentYearChartData: any[] = [];
        public previousYearChartData: any[] = [];
        public previousPreviousYearChartData: any[] = [];
        public allYearsChartData: any[] = [];
        public currentYearActive: boolean = false;
        public previousYearActive: boolean = false;
        public previousPreviousYearActive: boolean = false;
        public allMarksActive: boolean = true;

        public currentYear = 0;
        public filteredYear: number = 0;

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
                    var currentYearMarks = [];
                    var previousYearMarks = [];
                    var previousPreviousYearMarks = [];
                    for (let mark of response.data) {
                        if (assessment.id) {
                            AssessmentDataService.get(assessment.id)
                            .then(response => {
                                mark.assessment = response.data;
                            })
                            .catch(e => {
                            console.log(e);
                            })
                        }
                        marks.push(mark.assessmentMark);
                        if (mark.assessmentDate.includes(this.currentYear)) {
                            currentYearMarks.push(mark.assessmentMark);
                        } else if (mark.assessmentDate.includes(this.currentYear - 1)) {
                            previousYearMarks.push(mark.assessmentMark);
                        } else if (mark.assessmentDate.includes(this.currentYear - 2)) {
                            previousPreviousYearMarks.push(mark.assessmentMark);
                        }
                    }
                    this.averageAssessmentMarks = this.getAverageMarks(marks, this.averageAssessmentMarks);
                    this.averageMark = this.getAverageMark(marks);
                    if (currentYearMarks.length != 0) {
                        this.averageAssessmentMarksThisYear = this.getAverageMarks(currentYearMarks, this.averageAssessmentMarksThisYear);
                        this.averageMarkThisYear = this.getAverageMark(currentYearMarks);
                    }
                    if (previousYearMarks.length != 0) {
                        this.averageAssessmentMarksPreviousYear = this.getAverageMarks(previousYearMarks, this.averageAssessmentMarksPreviousYear);
                        this.averageMarkPreviousYear = this.getAverageMark(previousYearMarks);
                    }    
                    if (previousPreviousYearMarks.length != 0) {
                        this.averageAssessmentMarksPreviousPreviousYear = this.getAverageMarks(previousPreviousYearMarks, this.averageAssessmentMarksPreviousPreviousYear);
                        this.averageMarkPreviousPreviousYear = this.getAverageMark(previousPreviousYearMarks);
                    }

                    for (let average in this.averageAssessmentMarks) {
                        this.allYearsChartData.push({
                            "assessment": this.currentModuleAssessments[average].assessmentCode,
                            "average": this.averageAssessmentMarks[average]
                        })
                    }
                    for (let average in this.averageAssessmentMarksThisYear) {
                        this.currentYearChartData.push({
                            "assessment": this.currentModuleAssessments[average].assessmentCode,
                            "average": this.averageAssessmentMarksThisYear[average]
                        })
                    }
                    for (let average in this.averageAssessmentMarksPreviousYear) {
                        this.previousYearChartData.push({
                            "assessment": this.currentModuleAssessments[average].assessmentCode,
                            "average": this.averageAssessmentMarksPreviousYear[average]
                        })
                    }
                    for (let average in this.averageAssessmentMarksPreviousPreviousYear) {
                        this.previousPreviousYearChartData.push({
                            "assessment": this.currentModuleAssessments[average].assessmentCode,
                            "average": this.averageAssessmentMarksPreviousPreviousYear[average]
                        })
                    }
                })
                .catch(e => {
                    console.log(e);
                })
                }
            }
        }

        getAverageMarks(marks: any, averageMarks: string[]) {
            var sum = marks.reduce((a: number, b: number): number => a + b);
            var averageMark = sum / marks.length;
            averageMarks.push(averageMark.toFixed(1));
            return averageMarks;
        }

        getAverageMark(marks: any) {
            var sum = marks.reduce((a: number, b: number): number => a + b);
            var averageMark = sum / marks.length;
            return averageMark.toFixed(1);
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
            } else if (activeWindow == "assessmentMarks") {
                this.assessmentMarksVisible  = true;
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
        this.routeId = this.$route.params.id;
        this.routeId = this.routeId.toString();
        this.getModule(this.routeId);
        this.getAssessments(this.routeId);
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