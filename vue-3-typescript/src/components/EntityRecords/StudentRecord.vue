<template>
  <LoadingScreen v-if="isLoading"></LoadingScreen>
  <div class="record-window">
    <div class="heading">
      <div class="title-container">
          <div class="title">
            <mdicon :size="48" class="icon icon-centered report-icon" name="accountSchool"></mdicon>
            <div class="record-text">
              <div class="record-title">{{ currentIndividual.firstName + " " + currentIndividual.lastName }}</div>
              <div class="record-subtitle">{{ currentStudent.studentNumber }}</div>
            </div>
        </div>
      </div>
      <span class="icon-centered">
        <a style="color: rgb(170, 170, 170)" href="#">
          <mdicon :size="36" class="record-icon" name="pencil"></mdicon>
        </a>
      </span>
      <span class="icon-centered">
        <a style="color: rgb(170, 170, 170)" href="/students">
          <mdicon :size="36" class="record-icon" name="close"></mdicon>
        </a>
      </span>
    </div>
    <div class="main-page">
      <div class="select-page">
        <div class="sidebox" :class="{active: personalDataVisible}" @click="setActive('personalData')">{{ $t("records.personalData") }}</div>
        <div class="sidebox" :class="{active: programmeVisible}" @click="setActive('programme')">{{ $t("records.programme") }}</div>
        <div class="sidebox" :class="{active: modulesVisible}" @click="setActive('modules')">{{ $t("records.modules") }}</div>
        <div class="sidebox" :class="{active: marksAndFeedbackVisible}" @click="setActive('marksAndFeedback')">{{ $t("records.marksAndFeedback") }}</div>
        <div class="sidebox" :class="{active: examinationsVisible}" @click="setActive('examinations')">{{ $t("records.examinations") }}</div>
        <div class="sidebox" :class="{active: communicationVisible}" @click="setActive('communication')">{{ $t("records.communication") }}</div>
      </div>
      <div v-if="personalDataVisible" class="record">
        <div class="stacked-container">
          <div class="container">
            <h2>{{ $t("records.personalData") }}</h2>
            <div class="data-heading">{{ $t("records.fullName") }}</div>
            <div>{{ currentIndividual.firstName + " " + currentIndividual.lastName }}</div>
            <div class="data-heading">{{ $t("students.preferredName") }}</div>
            <div>{{ currentIndividual.preferredName }}</div>
            <div class="data-heading">{{ $t("students.pronouns") }}</div>
            <div>{{ currentIndividual.pronouns }}</div>
            <div class="data-heading">{{ $t("students.dateOfBirth") }}</div>
            <div>{{ formatDates(currentIndividual.dateOfBirth) }}</div>
            <div class="data-heading">{{ $t("students.personalEmailAddress") }}</div>
            <div>{{ currentIndividual.personalEmailAddress }}</div>
          </div>
          <div class="container">
            <h2>{{ $t("studentsPersonalDetails.studentsPersonalDetails") }}</h2>
            <div class="data-heading">{{ $t("studentsPersonalDetails.nationality") }}</div>
            <div>{{ currentPersonalDetails.nationality }}</div>
            <div class="data-heading">{{ $t("studentsPersonalDetails.domicile") }}</div>
            <div>{{ currentPersonalDetails.domicile }}</div>
            <div class="data-heading">{{ $t("studentsPersonalDetails.countryOfBirth") }}</div>
            <div>{{ currentPersonalDetails.countryOfBirth }}</div>
            <div class="data-heading">{{ $t("studentsPersonalDetails.ethnicity") }}</div>
            <div>{{ currentPersonalDetails.ethnicity }}</div>
            
          </div>
        </div>
        <div class="stacked-container">
          <div class="container">
            <h2>{{ $t("records.studentInfo") }}</h2>
            <div class="data-heading">{{ $t("students.studentNumber") }}</div>
            <div>{{ currentStudent.studentNumber }}</div>
            <div class="data-heading">{{ $t("students.studentUsername") }}</div>
            <div>{{ currentStudent.studentUsername }}</div>
            <div class="data-heading">{{ $t("students.universityEmailAddress") }}</div>
            <div>{{ currentIndividual.universityEmailAddress }}</div>
            <div class="data-heading">{{ $t("studentsPersonalDetails.feeStatus") }}</div>
            <div>{{ currentPersonalDetails.feeStatus }}</div>
            <div class="data-heading">{{ $t("studentsPersonalDetails.disability") }}</div>
            <div>{{ currentPersonalDetails.disability }}</div>
            <div class="data-heading">{{ $t("studentsPersonalDetails.parentalResponsibility") }}?</div>
            <div>{{ currentPersonalDetails.parentalResponsibility ? $t("records.yes") : $t("records.no") }}</div>
          </div>
          <div class="container">
            <h2>{{ $t("records.programmeInfo") }}</h2>
            <div class="data-heading">{{ $t("students.programme") }}</div>
            <div>{{ currentStudent.programme }}</div>
            <div class="data-heading">{{ $t("records.currentYear") }}</div>
            <div>{{ currentYearOfStudy }}</div>
            <div class="data-heading">{{ $t("records.academicTutor") }}</div>
            <router-link v-if="tutor.staffMemberId" :to="'/staffMembers/' + tutor.staffMemberId">
              {{ tutorIndividual.firstName + " " + tutorIndividual.lastName }}
            </router-link>
          </div>
        </div>
        
      </div>
      <div v-if="programmeVisible" class="record">
        <div class="container">
          <h2>{{ $t("records.programmeInfo") }}</h2>
            <div class="data-heading">{{ $t("students.programme") }}</div>
            <div>{{ currentStudent.programme }}</div>
            <div class="data-heading">{{ $t("students.qualification") }}</div>
            <div>{{ currentStudent.qualification }}</div>
            <div class="data-heading">{{ $t("students.department") }}</div>
            <div>{{ currentStudent.department }}</div>
            <div class="data-heading">{{ $t("students.startDate") }}</div>
            <div>{{ formatDates(currentStudent.startDate) }}</div>
            <div class="data-heading">{{ $t("students.expectedEndDate") }}</div>
            <div>{{ formatDates(currentStudent.expectedEndDate) }}</div>
            <div class="data-heading">{{ $t("records.academicTutor") }}</div>
            <router-link v-if="tutor.staffMemberId" :to="'/staffMembers/' + tutor.staffMemberId">
              {{ tutorIndividual.firstName + " " + tutorIndividual.lastName }}
            </router-link>
        </div>
        <div class="container">
          <h2>{{ $t("enrolment.enrolmentStatus") }}</h2>
          <div class="address">
            <span><mdicon :size="36" class="record-icon" :name="currentEnrolmentStatus.enrolmentComplete ? 'checkbox-marked-circle' : 'checkbox-blank-circle-outline'"></mdicon></span>
            <span style="font-size: 26px">{{ currentEnrolmentStatus.enrolmentComplete ? $t("enrolment.enrolmentComplete") : $t("enrolment.enrolmentIncomplete") }}</span>
          </div>
          <div class="address enrolment">
            <span><mdicon :size="24" class="record-icon" :name="currentEnrolmentStatus.stage1 ? 'checkbox-marked-circle-outline' : 'checkbox-blank-circle-outline'"></mdicon></span>
            <span>{{ $t("enrolment.stage1") }}</span>
          </div>
          <div class="enrolment">
            <span><mdicon :size="24" class="record-icon" :name="currentEnrolmentStatus.stage2 ? 'checkbox-marked-circle-outline' : 'checkbox-blank-circle-outline'"></mdicon></span>
            <span>{{ $t("enrolment.stage2") }}</span>
          </div>
          <div class="enrolment">
            <span><mdicon :size="24" class="record-icon" :name="currentEnrolmentStatus.stage3 ? 'checkbox-marked-circle-outline' : 'checkbox-blank-circle-outline'"></mdicon></span>
            <span>{{ $t("enrolment.stage3") }}</span>
          </div>
          <div class="enrolment">
            <span><mdicon :size="24" class="record-icon" :name="currentEnrolmentStatus.stage4 ? 'checkbox-marked-circle-outline' : 'checkbox-blank-circle-outline'"></mdicon></span>
            <span>{{ $t("enrolment.stage4") }}</span>
          </div>
        </div>
      </div>
      <div v-if="modulesVisible" class="record">
        <div class="container">
          <h2>{{ $t("modules.modules") }}</h2>
          <RecordTable 
            :columns="moduleHeaders" 
            :fields="modules" 
            :entity="'modules'"
            >
          </RecordTable>
        </div>
      </div>
      <div v-if="marksAndFeedbackVisible" class="record">
        <div class="container">
          <h2>{{ $t("assessmentmarks.assessmentmarks") }}</h2>
          <div style="display: flex;">
            <div class="average-student">
              <div class="data-heading">{{ $t("assessmentmarks.yearOneAverage") }}</div>
              <div class="average">{{ yearOneAverage }}</div>
            </div>
            <div class="average-student" v-if="yearTwoAverage != '0'">
              <div class="data-heading">{{ $t("assessmentmarks.yearTwoAverage") }}</div>
              <div class="average">{{ yearTwoAverage }}</div>
            </div>
            <div class="average-student" v-if="yearThreeAverage != '0'">
              <div class="data-heading">{{ $t("assessmentmarks.yearThreeAverage") }}</div>
              <div class="average">{{ yearThreeAverage }}</div>
            </div>
            <div class="average-student" v-if="yearFourAverage != '0'">
              <div class="data-heading">{{ $t("assessmentmarks.yearFourAverage") }}</div>
              <div class="average">{{ yearFourAverage }}</div>
            </div>
          </div>
          <RecordTable 
            :columns="jointHeaders" 
            :fields="currentAssessmentMarks" 
            :entity="'assessmentmarks'"
            :joinedColumns="assessmentHeaders"
            :joinedFields="assessments"
            >
          </RecordTable>
        </div>
      </div>
      <div v-if="examinationsVisible" class="record">
        <div class="container">
          <h2>{{ $t("records.personalData") }}</h2>
          <div class="data-heading">{{ $t("records.fullName") }}</div>
          <div>{{ currentIndividual.firstName, currentIndividual.lastName }}</div>
        </div>
      </div>
      <div v-if="communicationVisible" class="record">
        <!-- <CommunicationWindow
          :currentStudent="currentStudent"
          :currentIndividual="currentIndividual"
          :entity="entity"
        ></CommunicationWindow> -->
        <div class="long-container">
          <div class="container">
            <div style="display: block">
              <h2>{{ $t("address.addresses") }}</h2>
              <div class="data-heading address">{{ $t("address.termTimeAddress") }}</div>
              <div>{{ currentTermTimeAddress.addressLine1 }}</div>
              <div>{{ currentTermTimeAddress.addressLine2 }}</div>
              <div>{{ currentTermTimeAddress.addressLine3 }}</div>
              <div>{{ currentTermTimeAddress.townCity }}</div>
              <div>{{ currentTermTimeAddress.region }}</div>
              <div>{{ currentTermTimeAddress.postCode }}</div>
              <div>{{ currentTermTimeAddress.country }}</div>
              <div class="data-heading address">{{ $t("address.homeAddress") }}</div>
              <div>{{ currentHomeAddress.addressLine1 }}</div>
              <div>{{ currentHomeAddress.addressLine2 }}</div>
              <div>{{ currentHomeAddress.addressLine3 }}</div>
              <div>{{ currentHomeAddress.townCity }}</div>
              <div>{{ currentHomeAddress.region }}</div>
              <div>{{ currentHomeAddress.postCode }}</div>
              <div>{{ currentHomeAddress.country }}</div>
            </div>
          </div>
        </div>
        <div class="stacked-container">
          <div class="container">
            <div style="display: block">
              <h2>{{ $t("records.email") }}</h2>
              <div class="data-heading">{{ $t("students.personalEmailAddress") }}</div>
              <div>{{ currentIndividual.personalEmailAddress }}</div>
              <div class="data-heading">{{ $t("students.universityEmailAddress") }}</div>
              <div>{{ currentIndividual.universityEmailAddress }}</div>
            </div>
          </div>
          <div class="container">
            <div style="display: block">
              <h2>{{ $t("records.phone") }}</h2>
              <div class="data-heading">{{ $t("students.contactPhoneNumber") }}</div>
              <div>{{ currentIndividual.contactPhoneNumber }}</div>
              <div class="data-heading">{{ $t("students.homePhoneNumber") }}</div>
              <div>{{ currentIndividual.homePhoneNumber }}</div>
              <div class="data-heading">{{ $t("students.mobilePhoneNumber") }}</div>
              <div>{{ currentIndividual.mobilePhoneNumber }}</div>
            </div>
          </div>
          <div class="container">
            <div style="display: block">
              <h2>{{ $t("emergencyContact.emergencyContact") }}</h2>
              <div class="data-heading">{{ $t("emergencyContact.fullName") }}</div>
              <div>{{ currentStudent.programme }}</div>
              <div class="data-heading">{{ $t("emergencyContact.relationship") }}</div>
              <div>relationship</div>
              <div class="data-heading">{{ $t("emergencyContact.telephoneNumber") }}</div>
              <div>number</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>
  
<script lang="ts">
    import { Vue, Options } from "vue-class-component";
    import StudentDataService from "@/services/StudentDataService";
    import type Student from "@/types/Student";
    import IndividualDataService from "@/services/IndividualDataService";
    import type Individual from "@/types/Individual";
    import AddressDataService from "@/services/AddressDataService";
    import type Address from "@/types/Address";
    import PersonalDetailDataService from "@/services/StudentPersonalDetailDataService";
    import StudentPersonalDetails from "@/types/StudentPersonalDetails";
    import EnrolmentDataService from "@/services/EnrolmentDataService";
    import Enrolment from "@/types/Enrolment";
    import Module from "@/types/Module";
    import LoadingScreen from "../WindowSetup/LoadingScreen/LoadingScreen.vue";
    import '../RecordWindow/RecordWindow.scss'
    import CommunicationWindow from "../RecordContainers/CommunicationWindow.vue";
    import moment from 'moment';
    import StaffMember from "@/types/StaffMember";
    import RecordTable from "../RecordsTable/RecordTable.vue";
    import AssessmentMarksDataService from "@/services/AssessmentMarksDataService";
    import AssessmentMark from "@/types/AssessmentMark";
    import AssessmentDataService from "@/services/AssessmentDataService";
    import Assessment from "@/types/Assessment";
    import ModuleDataService from "@/services/ModuleDataService";

    @Options({
    components: {
        LoadingScreen,
        CommunicationWindow,
        RecordTable,
    }})

    export default class StudentsList extends Vue {
    public personalDataVisible: boolean = true;
    public programmeVisible: boolean = false;
    public modulesVisible: boolean = false;
    public marksAndFeedbackVisible: boolean = false;
    public examinationsVisible: boolean = false;
    public communicationVisible: boolean = false;

    public isLoading: boolean = false;
    public addressesLoaded: boolean = false;
    public enrolmentLoaded: boolean = false;

    public currentStudent = {} as Student;
    public currentIndividual = {} as Individual;
    public currentHomeAddress = {} as Address;
    public currentTermTimeAddress = {} as Address;
    public currentEnrolmentStatus = {} as Enrolment;
    public currentPersonalDetails = {} as StudentPersonalDetails;
    public modules: Module[] = [];
    public moduleHeaders: string[] = [];
    public currentYearOfStudy: number = 0;

    public currentAssessmentMarks: AssessmentMark[] = [];
    public assessmentMarkHeaders: string[] = [];
    public currentAssessment = {} as Assessment;
    public assessmentHeaders: string[] = [];
    public assessments: Assessment[] = [];
    public jointHeaders: string[] = [];
    
    public yearOneAverage: string = "0";
    public yearTwoAverage: string = "0";
    public yearThreeAverage: string = "0";
    public yearFourAverage: string = "0";

    public tutor = {} as StaffMember;
    public tutorIndividual = {} as Individual;

    getStudent(id: string) {
        this.isLoading = true;
        StudentDataService.get(id)
            .then(response => {
            this.currentStudent = response.data;
            this.modules = this.currentStudent.moduleStu;
            this.moduleHeaders = ["moduleCode", "moduleTitle", "moduleLevel", "numberOfCredits", "termsTaught"];
            var maxYear = 1 ;
            for(var i = 0; i < this.modules.length; i++){
                if(parseInt(this.modules[i].moduleLevel) > maxYear){
                    maxYear = parseInt(this.modules[i].moduleLevel);
                } 
            }
            this.currentYearOfStudy = maxYear;
            IndividualDataService.get(this.currentStudent.individualId)
            .then(response => {
                this.currentIndividual = response.data;
            })
            .catch(e => {
                console.log(e);
            })
            PersonalDetailDataService.get(this.currentStudent.studentId)
            .then(response => {
                this.currentPersonalDetails = response.data[0];
            })
            .catch(e => {
                console.log(e);
            })
            this.tutor = this.currentStudent.academicTutee[0];
            IndividualDataService.get(this.currentStudent.academicTutee[0].individualId)
            .then(response => {
                this.tutorIndividual = response.data;
            })
            .catch(e => {
                console.log(e);
            })
            }
            )
            .catch(e => {
            console.log(e);
            });
            this.isLoading = false;
    }

    loadAddresses() {
        this.isLoading = true;
        this.getHomeAddress(this.currentStudent.individualId);
        this.getTermTimeAddress(this.currentStudent.studentId);
        this.isLoading = false;
        this.addressesLoaded = true;
    }

    loadEnrolmentStatus() {
        this.isLoading = true;
        EnrolmentDataService.get(this.currentStudent.studentId)
        .then(response => {
                this.currentEnrolmentStatus = response.data[0];
                })
                .catch(e => {
                console.log(e);
                })
        this.isLoading = false;
        this.enrolmentLoaded = true;
    }

    getHomeAddress(id: string) {
        AddressDataService.getHome(id)
            .then(response => {
            this.currentHomeAddress = response.data[0];
            })
            .catch(e => {
            console.log(e);
            })
    }

    getTermTimeAddress(id: string) {
        AddressDataService.getTermTime(id)
            .then(response => {
            this.currentTermTimeAddress = response.data[0];
            })
            .catch(e => {
            console.log(e);
            })
    }
    
    formatDates(date: Date) {
        return moment(String(date)).format('DD/MM/YYYY');
    }

    getAssessmentMarks(id: string) {
        this.isLoading = true;
        AssessmentMarksDataService.getByStudent(id)
            .then(response => {
            this.currentAssessmentMarks = response.data;
            this.assessmentMarkHeaders = ["assessmentMark", "assessmentGrade", "assessmentStatus", "assessmentState", "assessmentDate", "assessmentLevel"];
            for (let mark of this.currentAssessmentMarks) {
                AssessmentDataService.get(mark.assessmentId)
                .then(response => {
                this.currentAssessment = response.data;
                mark.assessment = this.currentAssessment;
                this.assessmentHeaders = ["assessmentCode", "assessmentDetail", "assessmentWeight"];
                this.assessments = this.assessments.concat(this.currentAssessment);
                this.jointHeaders = ["assessmentCode", "assessmentDetail", "assessmentMark", "assessmentGrade", "assessmentWeight", "assessmentStatus", "assessmentState", "assessmentDate", "assessmentLevel"];
                ModuleDataService.get(mark.assessment.moduleId)
                .then(response => {
                    mark.assessment.module = response.data;
                })
                .catch(e => {
                console.log(e);
                });
                })
                .catch(e => {
                console.log(e);
                });
            };
            })
            .catch(e => {
            console.log(e);
            })
            this.isLoading = false;
    }

    getAverageMarks() {
        var yearOneModules: string[] = [];
        var yearTwoModules: string[] = [];
        var yearThreeModules: string[] = [];
        var yearFourModules: string[] = [];
        var yearOneMarks: AssessmentMark[] = [];
        var yearTwoMarks: AssessmentMark[] = [];
        var yearThreeMarks: AssessmentMark[] = [];
        var yearFourMarks: AssessmentMark[] = [];
        for (let mark of this.currentAssessmentMarks) {
            if (mark.assessmentLevel == 1) {
            if (yearOneModules.indexOf(mark.assessment.moduleId) === -1) yearOneModules.push(mark.assessment.moduleId);
            yearOneMarks.push(mark);
            }
            else if (mark.assessmentLevel == 2) {
            if (yearTwoModules.indexOf(mark.assessment.moduleId) === -1) yearTwoModules.push(mark.assessment.moduleId);
            yearTwoMarks.push(mark);
            }
            else if (mark.assessmentLevel == 3) {
            if (yearThreeModules.indexOf(mark.assessment.moduleId) === -1) yearThreeModules.push(mark.assessment.moduleId);
            yearThreeMarks.push(mark);
            }
            else if (mark.assessmentLevel == 4) {
            if (yearFourModules.indexOf(mark.assessment.moduleId) === -1) yearFourModules.push(mark.assessment.moduleId);
            yearFourMarks.push(mark);
            }
        }
        if (yearOneModules.length != 0) {
            this.yearOneAverage = this.getYearlyAverage(yearOneModules, yearOneMarks).toFixed(1);
        }
        if (yearTwoModules.length != 0) {
            this.yearTwoAverage = this.getYearlyAverage(yearTwoModules, yearTwoMarks).toFixed(1);
        }
        if (yearThreeModules.length != 0) {
            this.yearThreeAverage = this.getYearlyAverage(yearThreeModules, yearThreeMarks).toFixed(1);
        }
        if (yearFourModules.length != 0) {
            this.yearFourAverage = this.getYearlyAverage(yearFourModules, yearFourMarks).toFixed(1);
        }

    }

    getYearlyAverage(modules: string[], marks: AssessmentMark[]) {
        var moduleAverages: number[] = [];
        var moduleWeighting: number = 0;
        var markValues: number[] = [];
        for (let module of modules) {
            markValues = [];
            for (let mark of marks) {
                if (mark.assessment.moduleId == module) {
                    moduleWeighting = mark.assessment.module.numberOfCredits;
                    markValues.push(mark.assessmentMark * (mark.assessment.assessmentWeight / 100));
                }
            }
            var sum = markValues.reduce((a: number, b: number): number => a + b);
            moduleAverages = moduleAverages.concat(sum / (120 / moduleWeighting));
        }
        return moduleAverages.reduce((a: number, b: number): number => a + b);
    }

    updateStudent() {
        if (this.currentStudent.studentId) {
            StudentDataService.update(this.currentStudent.studentId, this.currentStudent)
            .then(response => {
            })
            .catch(e => {
                console.log(e);
            });
    }
  }

    mounted() {
        var routeId = this.$route.params.id;
        routeId = routeId.toString();
        this.getStudent(routeId);
        this.getAssessmentMarks(routeId);
    }

    setActive(activeWindow: string) {
        this.personalDataVisible  = false;
        this.programmeVisible  = false;
        this.modulesVisible = false;
        this.marksAndFeedbackVisible = false;
        this.examinationsVisible = false;
        this.communicationVisible = false;
        if (activeWindow == "personalData") {
            this.personalDataVisible  = true;
        } else if (activeWindow == "programme") {
            this.programmeVisible  = true;
            if (this.enrolmentLoaded == false) {
            this.loadEnrolmentStatus();
            }
        } else if (activeWindow == "modules") {
            this.modulesVisible = true;
        } else if (activeWindow == "marksAndFeedback") {
            this.marksAndFeedbackVisible = true;
            this.getAverageMarks();
        } else if (activeWindow == "examinations") {
            this.examinationsVisible = true;
        } else if (activeWindow == "communication") {
            this.communicationVisible = true;
            if (this.addressesLoaded == false) {
            this.loadAddresses();
            }
        }
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