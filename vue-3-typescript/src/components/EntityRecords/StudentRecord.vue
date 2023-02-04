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
        <div style="display: flex">
          <div class="container">
            <h2>{{ $t("records.personalData") }}</h2>
            <div class="data-heading">{{ $t("records.fullName") }}</div>
            <div>{{ currentIndividual.firstName + " " + currentIndividual.lastName }}</div>
            <div class="data-heading">{{ $t("students.preferredName") }}</div>
            <div>{{ currentIndividual.preferredName }}</div>
            <div class="data-heading">{{ $t("students.pronouns") }}</div>
            <div>{{ currentIndividual.pronouns }}</div>
            <div class="data-heading">{{ $t("students.dateOfBirth") }}</div>
            <div>{{ currentIndividual.dateOfBirth }}</div>
            <div class="data-heading">{{ $t("students.personalEmailAddress") }}</div>
            <div>{{ currentIndividual.personalEmailAddress }}</div>
          </div>
        </div>
        <div>
          <div class="container">
            <h2>{{ $t("records.studentInfo") }}</h2>
            <div class="data-heading">{{ $t("students.studentNumber") }}</div>
            <div>{{ currentStudent.studentNumber }}</div>
            <div class="data-heading">{{ $t("students.studentUsername") }}</div>
            <div>{{ currentStudent.studentUsername }}</div>
            <div class="data-heading">{{ $t("students.universityEmailAddress") }}</div>
            <div>{{ currentIndividual.universityEmailAddress }}</div>
          </div>
          <div class="container">
            <h2>{{ $t("records.programmeInfo") }}</h2>
            <div class="data-heading">{{ $t("students.programme") }}</div>
            <div>{{ currentStudent.programme }}</div>
            <div class="data-heading">{{ $t("records.academicTutor") }}</div>
            <div>test</div>
          </div>
        </div>
        
      </div>
      <div v-if="programmeVisible" class="record">
        <div class="container">
          <h2>{{ $t("records.programmeInfo") }}</h2>
          <div class="data-heading">{{ $t("students.programme") }}</div>
          <div>{{ currentStudent.programme }}</div>
          <div class="data-heading">{{ $t("records.academicTutor") }}</div>
          <div>test</div>
        </div>
        <div class="container">
          <h2>{{ $t("records.programmeInfo") }}</h2>
          <div class="data-heading">{{ $t("students.programme") }}</div>
          <div>{{ currentStudent.programme }}</div>
          <div class="data-heading">{{ $t("records.academicTutor") }}</div>
          <div>test</div>
        </div>
      </div>
      <div v-if="modulesVisible" class="record">
        <div class="container">
          <h2>{{ $t("records.personalData") }}</h2>
          <div class="data-heading">{{ $t("records.fullName") }}</div>
          <div>{{ currentIndividual.firstName, currentIndividual.lastName }}</div>
        </div>
      </div>
      <div v-if="marksAndFeedbackVisible" class="record">
        <div class="container">
          <h2>{{ $t("records.personalData") }}</h2>
          <div class="data-heading">{{ $t("records.fullName") }}</div>
          <div>{{ currentIndividual.firstName, currentIndividual.lastName }}</div>
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
              <div class="data-heading">{{ $t("address.termTimeAddress") }}</div>
              <div>{{ currentTermTimeAddress.addressLine1 }}</div>
              <div>{{ currentTermTimeAddress.addressLine2 }}</div>
              <div>{{ currentTermTimeAddress.addressLine3 }}</div>
              <div>{{ currentTermTimeAddress.townCity }}</div>
              <div>{{ currentTermTimeAddress.region }}</div>
              <div>{{ currentTermTimeAddress.postCode }}</div>
              <div>{{ currentTermTimeAddress.country }}</div>
              <div class="data-heading">{{ $t("address.homeAddress") }}</div>
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
  import LoadingScreen from "../LoadingScreen/LoadingScreen.vue";
  import '../RecordWindow/RecordWindow.scss'
  import CommunicationWindow from "../RecordContainers/CommunicationWindow.vue";

  @Options({
  components: {
    LoadingScreen,
    CommunicationWindow,
  }})

  export default class StudentsList extends Vue {
    public personalDataVisible: boolean = true;
    public programmeVisible: boolean = false;
    public modulesVisible: boolean = false;
    public marksAndFeedbackVisible: boolean = false;
    public examinationsVisible: boolean = false;
    public communicationVisible: boolean = false;
    public isLoading: boolean = false;
    public entity: string = "Student";

    public currentStudent = {} as Student;
    public currentIndividual = {} as Individual;
    public currentHomeAddress = {} as Address;
    public currentTermTimeAddress = {} as Address;

    getStudent(id: string) {
      this.isLoading = true;
      StudentDataService.get(id)
        .then(response => {
          this.currentStudent = response.data;
          console.log(response.data);
            IndividualDataService.get(this.currentStudent.individualId)
            .then(response => {
              this.currentIndividual = response.data;
              console.log(response.data);
              this.isLoading = false;
            })
            .catch(e => {
              console.log(e);
            })
          }
          )
        .catch(e => {
          console.log(e);
        });
    }

    loadAddresses() {
      this.isLoading = true;
      this.getHomeAddress(this.currentStudent.individualId);
      this.getTermTimeAddress(this.currentStudent.studentId);
      this.isLoading = false;
    }

    getHomeAddress(id: string) {
      AddressDataService.getHome(id)
        .then(response => {
          this.currentHomeAddress = response.data[0];
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        })
    }

    getTermTimeAddress(id: string) {
      AddressDataService.getTermTime(id)
        .then(response => {
          this.currentTermTimeAddress = response.data[0];
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        })
    }

    updateStudent() {
      if (this.currentStudent.studentId) {
        StudentDataService.update(this.currentStudent.studentId, this.currentStudent)
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
        this.getStudent(routeId.toString());
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
      } else if (activeWindow == "modules") {
        this.modulesVisible = true;
      } else if (activeWindow == "marksAndFeedback") {
        this.marksAndFeedbackVisible = true;
      } else if (activeWindow == "examinations") {
        this.examinationsVisible = true;
      } else if (activeWindow == "communication") {
        this.communicationVisible = true;
        this.loadAddresses();
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