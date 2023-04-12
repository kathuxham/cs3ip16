<template>  
    <!-- <LoadingScreen v-if="isLoading"></LoadingScreen> -->
    <div class="record-window">
        <div class="heading">
            <div class="title-container icon-centered">
                <div class="title">
                    <mdicon :size="48" class="icon icon-centered home-icon" name="notebookMultiple"></mdicon>
                    <div class="record-text">
                        <div class="record-title">{{ $t("menu.overviewDash") + " - " + (currentYear - 1) + "/" + currentYear }}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="home-page">
            <div class="home-window">
                <div class="stacked-container">
                    <div class="container" style="height: 39vh">
                        <div class="chart-header">
                            <h2>{{ $t("menu.homeOne")}}</h2>
                            <select class="select-box" v-model="filteredYearOneModule">
                                <option v-for="option in yearOneModules" :value="option['id']">{{option['moduleCode']}}</option>
                            </select>
                        </div>
                        <LoadingChart v-if="isLoadingOne"></LoadingChart>
                        <div class="no-data" v-if="filteredYearOneModule != '' && yearOneChartData.length == 0">
                            {{ $t("menu.moduleUnavailable")}}
                        </div>
                        <div v-for="mod in yearOneModules" v-if="yearOneChartData.length != 0">
                            <BarChart
                                v-if="showChartOne && filteredYearOneModule == mod.id"
                                :importedData="yearOneChartData" 
                                :xAxis="'assessment'" 
                                :yAxis="'average'"
                                :xAxisTitle="'Assessment'"
                                :yAxisTitle="'Average Mark'"
                                :idName="'currentYearOne'"
                                :chartName="'Current Year Averages'"
                                :source="'dashboard'">
                            </BarChart>
                        </div>
                    </div>
                    <div class="container" style="height: 39vh">
                        <div class="chart-header">
                            <h2>{{ $t("menu.homeThree")}}</h2>
                            <select class="select-box" v-model="filteredYearThreeModule">
                                <option v-for="option in yearThreeModules" :value="option['id']">{{option['moduleCode']}}</option>
                            </select>
                        </div>
                        <LoadingChart v-if="isLoadingThree"></LoadingChart>
                        <div class="no-data" v-if="filteredYearThreeModule != '' && yearThreeChartData.length == 0">
                            {{ $t("menu.moduleUnavailable")}}
                        </div>
                        <div v-for="mod in yearThreeModules" v-if="yearThreeChartData.length != 0">
                            <BarChart
                                v-if="showChartThree && filteredYearThreeModule == mod.id"
                                :importedData="yearThreeChartData" 
                                :xAxis="'assessment'" 
                                :yAxis="'average'"
                                :xAxisTitle="'Assessment'"
                                :yAxisTitle="'Average Mark'"
                                :idName="'currentYearThree'"
                                :chartName="'Current Year Averages'"
                                :source="'dashboard'">
                            </BarChart>
                        </div>
                    </div>
                </div>
                <div class="stacked-container">
                    <div class="container" style="height: 39vh">
                        <div class="chart-header">
                            <h2>{{ $t("menu.homeTwo")}}</h2>
                            <select class="select-box" v-model="filteredYearTwoModule">
                                <option v-for="option in yearTwoModules" :value="option['id']">{{option['moduleCode']}}</option>
                            </select>
                        </div>
                        <LoadingChart v-if="isLoadingTwo"></LoadingChart>
                        <div class="no-data" v-if="filteredYearTwoModule != '' && yearTwoChartData.length == 0">
                            {{ $t("menu.moduleUnavailable")}}
                        </div>
                        <div v-for="mod in yearTwoModules">
                            <BarChart
                                v-if="showChartTwo && filteredYearTwoModule == mod.id && yearTwoChartData.length != 0"
                                :importedData="yearTwoChartData" 
                                :xAxis="'assessment'" 
                                :yAxis="'average'"
                                :xAxisTitle="'Assessment'"
                                :yAxisTitle="'Average Mark'"
                                :idName="'currentYearTwo'"
                                :chartName="'Current Year Averages'"
                                :source="'dashboard'">
                            </BarChart>
                        </div>
                    </div>
                    <div class="container" style="height: 39vh">
                        <h2>{{ $t("menu.moduleCompletion")}}</h2>
                        <div class="data-heading" v-if="!isLoadingOne">{{ $t("menu.homeOneBar") }}</div>
                        <LoadingBar v-if="isLoadingOne"></LoadingBar>
                        <div class="no-data-pie" v-if="filteredYearOneModule != '' && yearOneChartData.length == 0">
                            {{ $t("menu.moduleUnavailable")}}
                        </div>
                        <div v-for="mod in yearOneModules" v-if="yearOneChartData.length != 0">
                            <ProgressBar
                                v-if="showChartOne && filteredYearOneModule == mod.id"
                                :importedData="yearOneWeightData" 
                                :percentComplete="yearOneComplete"
                                :idName="'currentYearOnePie'">
                            </ProgressBar>
                        </div>
                        <div class="data-heading" v-if="!isLoadingTwo">{{ $t("menu.homeTwoBar") }}</div>
                        <LoadingBar v-if="isLoadingTwo"></LoadingBar>
                        <div class="no-data-pie" v-if="filteredYearTwoModule != '' && yearTwoChartData.length == 0">
                            {{ $t("menu.moduleUnavailable")}}
                        </div>
                        <div v-for="mod in yearTwoModules">
                            <ProgressBar
                                v-if="showChartTwo && filteredYearTwoModule == mod.id && yearTwoChartData.length != 0"
                                :importedData="yearTwoWeightData" 
                                :percentComplete="yearTwoComplete"
                                :idName="'currentYearTwoPie'">
                            </ProgressBar>
                        </div>
                        <div class="data-heading" v-if="!isLoadingThree">{{ $t("menu.homeThreeBar") }}</div>
                        <LoadingBar v-if="isLoadingThree"></LoadingBar>
                        <div class="no-data-pie" v-if="filteredYearThreeModule != '' && yearThreeChartData.length == 0">
                            {{ $t("menu.moduleUnavailable")}}
                        </div>
                        <div v-for="mod in yearThreeModules" v-if="yearThreeChartData.length != 0">
                            <ProgressBar
                                v-if="showChartThree && filteredYearThreeModule == mod.id && yearThreeChartData.length != 0"
                                :importedData="yearThreeWeightData" 
                                :percentComplete="yearThreeComplete"
                                :idName="'currentYearThreePie'">
                            </ProgressBar>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import './HomeWindow.scss'
import LoadingScreen from '../WindowSetup/LoadingScreen/LoadingScreen.vue';
import LoadingChart from '../WindowSetup/LoadingScreen/LoadingChart.vue';
import LoadingBar from '../WindowSetup/LoadingScreen/LoadingBar.vue';
import '@mdi/js';
import ProgressBar from '../Charts/ProgressBar.vue';
import AssessmentMarksDataService from '@/services/AssessmentMarksDataService';
import AssessmentDataService from '@/services/AssessmentDataService';
import ModuleDataService from '@/services/ModuleDataService';
import Assessment from '@/types/Assessment';
import Module from '@/types/Module';
import { Watch } from 'vue-property-decorator';
import * as am4core from "@amcharts/amcharts4/core";
import BarChart from '../Charts/BarChart.vue';

@Options({
  components: {
    LoadingScreen,
    LoadingChart,
    LoadingBar,
    ProgressBar,
    BarChart
  }
})

export default class HomeWindow extends Vue {

    public assessmentMarks: any[] = [];
    public currentAssessment = {} as Assessment;
    public assessments: any[] = [];
    public modules: Module[] = [];
    public levelOneAssessments: Assessment[] = [];
    public levelTwoAssessments: Assessment[] = [];
    public levelThreeAssessments: Assessment[] = [];

    public isLoadingOne: boolean = false;
    public isLoadingTwo: boolean = false;
    public isLoadingThree: boolean = false;

    public averageAssessmentMarksYearOne: string[] = [];
    public averageAssessmentMarksYearTwo: string[] = [];
    public averageAssessmentMarksYearThree: string[] = [];
    
    public filteredYearOneModule: string = "";
    public filteredYearTwoModule: string = "";
    public filteredYearThreeModule: string = "";

    public yearOneChartData: any[] = [];
    public yearTwoChartData: any[] = [];
    public yearThreeChartData: any[] = [];

    public currentYear = 0;

    public averageMarkThisYear: string = "";

    public showChartOne: boolean = true;
    public showChartTwo: boolean = true;
    public showChartThree: boolean = true;

    public yearOneModules: Module[] = [];
    public yearTwoModules: Module[] = [];
    public yearThreeModules: Module[] = [];

    public yearOneWeightData: any[] = [];
    public yearTwoWeightData: any[] = [];
    public yearThreeWeightData: any[] = [];
    public yearOneWeighting: number[] = [];
    public yearTwoWeighting: number[] = [];
    public yearThreeWeighting: number[] = [];
    public yearOneComplete: number = 0;
    public yearTwoComplete: number = 0;
    public yearThreeComplete: number = 0;

    getModules() {
        ModuleDataService.getAll()
        .then(response => {
            this.modules = response.data;
            this.yearOneModules = this.modules.filter((module) => {
                var included = (module.moduleLevel == "1");
                return included;
            });
            this.filteredYearOneModule = this.yearOneModules[0].id;
            this.yearTwoModules = this.modules.filter((module) => {
                var included = (module.moduleLevel == "2");
                return included;
            });
            this.filteredYearTwoModule = this.yearTwoModules[0].id;
            this.yearThreeModules = this.modules.filter((module) => {
                var included = (module.moduleLevel == "3");
                return included;
            });
            this.filteredYearThreeModule = this.yearThreeModules[0].id;
        })  
        .catch(e => {
        console.log(e);
        });
    }

    @Watch('filteredYearOneModule')
    filterYearOneMarks() {
        this.showChartOne = false;
        this.isLoadingOne = true;
        this.getAssessments(this.filteredYearOneModule, 1);
    }

    @Watch('filteredYearTwoModule')
    filterYearTwoMarks() {
        this.showChartTwo = false;
        this.isLoadingTwo = true;
        this.getAssessments(this.filteredYearTwoModule, 2);
    }

    @Watch('filteredYearThreeModule')
    filterYearThreeMarks() {
        this.showChartThree = false;
        this.isLoadingThree = true;
        this.getAssessments(this.filteredYearThreeModule, 3);
    }

    getAssessments(id: string, level: number) {
        AssessmentDataService.getAssessmentsByModule(id)
            .then(async response => {
                this.assessments = response.data;
                this.getAssessmentMarks(this.assessments, level);
                await new Promise(f => setTimeout(f, 3000)); 
                this.yearOneComplete = this.getCompleted(this.yearOneWeighting);
                this.yearTwoComplete = this.getCompleted(this.yearTwoWeighting);
                this.yearThreeComplete = this.getCompleted(this.yearThreeWeighting);
            })
            .catch(e => {
                console.log(e);
            })
    }

    getAssessmentMarks(assessments: Assessment[], level: number) {
        var weightCounter = 0;
        if (level == 1) {
            this.averageAssessmentMarksYearOne = [];
            this.yearOneChartData = [];
            this.yearOneWeighting = [];
            this.yearOneWeightData = [];
        } else if (level == 2) {
            this.averageAssessmentMarksYearTwo = [];
            this.yearTwoChartData = [];
            this.yearTwoWeighting = [];
            this.yearTwoWeightData = [];
        } else if (level == 3) {
            this.averageAssessmentMarksYearThree = [];
            this.yearThreeChartData = [];
            this.yearThreeWeighting = [];
            this.yearThreeWeightData = [];
        }
        for (let assessment of assessments) {
            if (assessment.id) {
                AssessmentMarksDataService.getByAssessment(assessment.id)
                .then(async response => {
                    var marks = [];
                    var currentYearOneMarks = [];
                    var currentYearTwoMarks = [];
                    var currentYearThreeMarks = [];
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
                            if (mark.assessmentLevel == 1) {
                                currentYearOneMarks.push(mark.assessmentMark);
                            } else if (mark.assessmentLevel == 2) {
                                currentYearTwoMarks.push(mark.assessmentMark);
                            } else if (mark.assessmentLevel == 3) {
                                currentYearThreeMarks.push(mark.assessmentMark);
                            }
                        }
                    }
                    if (currentYearOneMarks.length != 0) {
                        this.averageAssessmentMarksYearOne = this.getAverageMarks(currentYearOneMarks, this.averageAssessmentMarksYearOne);
                        this.averageMarkThisYear = this.getAverageMark(currentYearOneMarks);
                        this.yearOneWeighting.push(assessment.assessmentWeight);
                        this.yearOneWeightData.push({
                            "category": "",
                            "assessment": assessment.assessmentCode,
                            "from": weightCounter,
                            "to": weightCounter + assessment.assessmentWeight,
                            "weighting": assessment.assessmentWeight,
                            "fill": am4core.color("#104547"),
                        });
                        weightCounter += assessment.assessmentWeight;
                    }
                    if (currentYearTwoMarks.length != 0) {
                        this.averageAssessmentMarksYearTwo = this.getAverageMarks(currentYearTwoMarks, this.averageAssessmentMarksYearTwo);
                        this.averageMarkThisYear = this.getAverageMark(currentYearTwoMarks);
                        this.yearTwoWeighting.push(assessment.assessmentWeight);
                        this.yearTwoWeightData.push({
                            "category": "",
                            "assessment": assessment.assessmentCode,
                            "from": weightCounter,
                            "to": weightCounter + assessment.assessmentWeight,
                            "weighting": assessment.assessmentWeight,
                            "fill": am4core.color("#104547"),
                        });
                        weightCounter += assessment.assessmentWeight;
                    }
                    if (currentYearThreeMarks.length != 0) {
                        this.averageAssessmentMarksYearThree = this.getAverageMarks(currentYearThreeMarks, this.averageAssessmentMarksYearThree);
                        this.averageMarkThisYear = this.getAverageMark(currentYearThreeMarks);
                        this.yearThreeWeighting.push(assessment.assessmentWeight);
                        this.yearThreeWeightData.push({
                            "category": "",
                            "assessment": assessment.assessmentCode,
                            "from": weightCounter,
                            "to": weightCounter + assessment.assessmentWeight,
                            "weighting": assessment.assessmentWeight,
                            "fill": am4core.color("#104547"),
                        });
                        weightCounter += assessment.assessmentWeight;
                    }

                    if (level == 1) {
                        for (let average in this.averageAssessmentMarksYearOne) {
                            this.yearOneChartData.push({
                                "assessment": this.assessments[average].assessmentCode,
                                "average": this.averageAssessmentMarksYearOne[average],
                            })
                        }
                    }
                    if (level == 2) {
                        for (let average in this.averageAssessmentMarksYearTwo) {
                            this.yearTwoChartData.push({
                                "assessment": this.assessments[average].assessmentCode,
                                "average": this.averageAssessmentMarksYearTwo[average],
                            })
                        }
                    }
                    if (level == 3) {
                        for (let average in this.averageAssessmentMarksYearThree) {
                            this.yearThreeChartData.push({
                                "assessment": this.assessments[average].assessmentCode,
                                "average": this.averageAssessmentMarksYearThree[average],
                            })
                        }
                    }
                    await new Promise(f => setTimeout(f, 3000)); 
                    this.showChartOne = true;
                    this.showChartTwo = true;
                    this.showChartThree = true;
                    this.isLoadingOne = false;
                    this.isLoadingTwo = false;
                    this.isLoadingThree = false;
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

        getCompleted(marks: any) {
            var sum = marks.reduce((a: number, b: number): number => a + b);
            return sum;
        }
  
    mounted(){
        this.getModules();
    }

    created() {
        this.currentYear = new Date().getFullYear();
    }

}
</script>