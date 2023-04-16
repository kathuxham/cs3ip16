<template>
  <LoadingScreen v-if="isLoading"></LoadingScreen>
  <div class="record-window">
    <div class="heading">
      <div class="title-container">
          <div class="title">
            <mdicon :size="48" class="icon icon-centered report-icon" name="account"></mdicon>
            <div class="record-text">
              <div class="record-title">{{ currentIndividual.firstName + " " + currentIndividual.lastName }}</div>
              <div class="record-subtitle">{{ currentStaffMember.position + " (" + currentStaffMember.staffNumber + ")" }}</div>
            </div>
        </div>
      </div>
      <!-- <span class="icon-centered">
        <a style="color: rgb(170, 170, 170)" href="#">
          <mdicon :size="36" class="record-icon" name="pencil"></mdicon>
        </a>
      </span> -->
      <span class="icon-centered">
        <a style="color: rgb(170, 170, 170)" href="/staffMembers">
          <mdicon :size="36" class="record-icon" name="close"></mdicon>
        </a>
      </span>
    </div>
    <div class="main-page">
      <div class="select-page">
        <div class="sidebox" :class="{active: personalDataVisible}" @click="setActive('personalData')">{{ $t("records.personalData") }}</div>
        <div class="sidebox" :class="{active: modulesVisible}" @click="setActive('modules')">{{ $t("records.modules") }}</div>
        <div class="sidebox" :class="{active: tutorGroupVisible}" @click="setActive('tutorGroup')">{{ $t("records.tutorGroup") }}</div>
        <div class="sidebox" :class="{active: communicationVisible}" @click="setActive('communication')">{{ $t("records.communication") }}</div>
      </div>
      <div v-if="personalDataVisible" class="record">
        <div class="container">
          <h2>{{ $t("records.personalData") }}</h2>
          <div class="data-heading">{{ $t("records.fullName") }}</div>
          <div>{{ currentIndividual.firstName + " " + currentIndividual.lastName }}</div>
          <div class="data-heading">{{ $t("staffMembers.preferredName") }}</div>
          <div>{{ currentIndividual.preferredName }}</div>
          <div class="data-heading">{{ $t("staffMembers.pronouns") }}</div>
          <div>{{ currentIndividual.pronouns }}</div>
          <div class="data-heading">{{ $t("staffMembers.dateOfBirth") }}</div>
          <div>{{ formatDates(currentIndividual.dateOfBirth) }}</div>
        </div>
        <div class="container">
          <h2>{{ $t("records.staffInfo") }}</h2>
          <div class="data-heading">{{ $t("staffMembers.position") }}</div>
          <div>{{ currentStaffMember.position }}</div>
          <div class="data-heading">{{ $t("staffMembers.staffNumber") }}</div>
          <div>{{ currentStaffMember.staffNumber }}</div>
          <div class="data-heading">{{ $t("students.universityEmailAddress") }}</div>
            <div>{{ currentIndividual.universityEmailAddress }}</div>
        </div>
      </div>
      <div v-if="modulesVisible" class="record">
        <div class="full-width-container">
          <h2>{{ $t("modules.modules") }}</h2>
          <RecordTable 
            :columns="moduleHeaders" 
            :fields="modules" 
            :entity="'modules'"
            >
          </RecordTable>
          <div class="table-count">{{modules.length}} results</div>
        </div>
      </div>
      <div v-if="tutorGroupVisible" class="record">
        <div class="full-width-container">
          <h2>{{ $t("records.tutorGroup") }}</h2>
          <RecordTable 
            :columns="jointHeaders" 
            :fields="tutees" 
            :entity="'students'"
            :joinedColumns="tuteeIndHeaders"
            :joinedFields="tuteeInds"
            >
          </RecordTable>
          <div class="table-count">{{tutees.length}} results</div>
        </div>
      </div>
      <div v-if="communicationVisible" class="record">
          <div class="long-container">
            <div class="container">
              <div style="display: block">
                <h2>{{ $t("address.addresses") }}</h2>
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
          </div>
      </div>
    </div>
    
  </div>
</template>
  
  <script lang="ts">
  import { Vue, Options } from "vue-class-component";
  import IndividualDataService from "@/services/IndividualDataService";
  import type Individual from "@/types/Individual";
  import StaffMember from "@/types/StaffMember";
  import StaffDataService from "@/services/StaffDataService";
  import Address from "@/types/Address";
  import AddressDataService from "@/services/AddressDataService";
  import Module from "@/types/Module";
  import '../RecordWindow/RecordWindow.scss'
  import LoadingScreen from "../WindowSetup/LoadingScreen/LoadingScreen.vue";
  import RecordTable from "../Tables/RecordTable.vue";
  import moment from 'moment';
import Student from "@/types/Student";

  @Options({
  components: {
    LoadingScreen,
    RecordTable,
  }})


  export default class StaffMembersList extends Vue {
    public personalDataVisible: boolean = true;
    public tutorGroupVisible: boolean = false;
    public modulesVisible: boolean = false;
    public communicationVisible: boolean = false;
    public isLoading: boolean = false;

    public currentStaffMember = {} as StaffMember;
    public currentIndividual = {} as Individual;
    public currentHomeAddress = {} as Address;
    public modules: Module[] = [];
    public moduleHeaders: string[] = [];
    public tutees: Student[] = [];
    public tuteeHeaders: string[] = [];
    public tuteeInds: Individual[] = [];
    public tuteeIndHeaders: string[] = [];
    public currentTuteeInd = {} as Individual;
    public jointHeaders: string[] = [];

    getStaff(id: string) {
      this.isLoading = true;
      StaffDataService.get(id)
        .then(response => {
          this.currentStaffMember = response.data;
          this.modules = this.currentStaffMember.staffConvenor;
          this.moduleHeaders = ["moduleCode", "moduleTitle", "moduleLevel", "numberOfCredits", "termsTaught"];
          this.tutees = this.currentStaffMember.academicTutor;
          this.tuteeHeaders = Object.keys(this.currentStaffMember.academicTutor[0]).filter((title, index) => {
            var included = (title == "studentNumber") || (title == "programme");
            return included;
          });
          for (let tutee of this.tutees) {
            IndividualDataService.get(tutee.individualId)
            .then(response => {
              this.currentIndividual = response.data;
              tutee.individual = this.currentIndividual;
              this.tuteeIndHeaders = ["firstName", "lastName", "universityEmailAddress"];
              this.tuteeInds = this.tuteeInds.concat(this.currentIndividual);              
            })
            .catch(e => {
              console.log(e);
            });
          };
          this.jointHeaders = ["studentNumber", "firstName", "lastName", "programme", "universityEmailAddress"];
          IndividualDataService.get(this.currentStaffMember.individualId)
          .then(response => {
            this.currentIndividual = response.data;
          })
          .catch(e => {
            console.log(e);
          })
          AddressDataService.getHome(this.currentStaffMember.individualId)
          .then(response => {
            this.currentHomeAddress = response.data[0];
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

    formatDates(date: Date) {
      return moment(String(date)).format('DD/MM/YYYY');
    }

    updateStaff() {
      if (this.currentStaffMember.staffConvenor) {
        StaffDataService.update(this.currentStaffMember.staffNumber, this.currentStaffMember)
        .then(response => {
        })
        .catch(e => {
          console.log(e);
        });
    }
  }

  getModules() {
    
  }

    mounted() {
      var routeId = this.$route.params.id;
      routeId = routeId.toString();
        this.getStaff(routeId);
    }

    setActive(activeWindow: string) {
      this.personalDataVisible  = false;
      this.modulesVisible = false;
      this.tutorGroupVisible = false;
      this.communicationVisible = false;
      if (activeWindow == "personalData") {
        this.personalDataVisible  = true;
      } else if (activeWindow == "tutorGroup") {
        this.tutorGroupVisible  = true;
      } else if (activeWindow == "modules") {
        this.modulesVisible = true;
      } else if (activeWindow == "communication") {
        this.communicationVisible = true;
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