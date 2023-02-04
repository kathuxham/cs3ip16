<template>
  <LoadingScreen v-if="isLoading"></LoadingScreen>
  <div class="record-window">
    <div class="heading">
      <div class="title-container">
          <div class="title">
            <mdicon :size="48" class="icon icon-centered report-icon" name="account"></mdicon>
            <div class="record-text">
              <div class="record-title">{{ currentIndividual.firstName + " " + currentIndividual.lastName }}</div>
              <div class="record-subtitle">{{ currentStaffMember.position }}</div>
            </div>
        </div>
      </div>
      <span class="icon-centered">
        <a style="color: rgb(170, 170, 170)" href="#">
          <mdicon :size="36" class="record-icon" name="pencil"></mdicon>
        </a>
      </span>
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
        <!-- <h1>{{ $t("records.personalData") }}</h1> -->
        <div class="container">
          <h2>{{ $t("records.personalData") }}</h2>
          <div class="data-heading">{{ $t("records.fullName") }}</div>
          <div>{{ currentIndividual.firstName + " " + currentIndividual.lastName }}</div>
          <div class="data-heading">{{ $t("staffMembers.preferredName") }}</div>
          <div>{{ currentIndividual.preferredName }}</div>
          <div class="data-heading">{{ $t("staffMembers.pronouns") }}</div>
          <div>{{ currentIndividual.pronouns }}</div>
          <div class="data-heading">{{ $t("staffMembers.dateOfBirth") }}</div>
          <div>{{ currentIndividual.dateOfBirth }}</div>
        </div>
        <div class="container">
          <h2>{{ $t("records.staffInfo") }}</h2>
          <div class="data-heading">{{ $t("staffMembers.position") }}</div>
          <div>{{ currentStaffMember.position }}</div>
          <div class="data-heading">{{ $t("staffMembers.staffNumber") }}</div>
          <div>{{ currentStaffMember.staffNumber }}</div>
        </div>
      </div>
      <div v-if="modulesVisible" class="record">
        <!-- <h1>{{ $t("records.modules") }}</h1> -->
        <div class="container">
          <h2>{{ $t("records.modules") }}</h2>
          <div class="data-heading">{{ $t("records.fullName") }}</div>
          <div>{{ currentIndividual.firstName, currentIndividual.lastName }}</div>
        </div>
      </div>
      <div v-if="tutorGroupVisible" class="record">
        <!-- <h1>{{ $t("records.marksAndFeedback") }}</h1> -->
        <div class="container">
          <h2>{{ $t("records.tutorGroup") }}</h2>
          <div class="data-heading">{{ $t("records.fullName") }}</div>
          <div>{{ currentIndividual.firstName, currentIndividual.lastName }}</div>
        </div>
      </div>
      <div v-if="communicationVisible" class="record">
        <!-- <CommunicationWindow
          :currentStaffMember="currentStaffMember"
          :currentIndividual="currentIndividual"
          :entity="entity"
          ></CommunicationWindow> -->
          <div class="container">
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
          <div class="container">
            <h2>{{ $t("records.email") }}</h2>
            <div class="data-heading">{{ $t("students.personalEmailAddress") }}</div>
            <div>{{ currentIndividual.personalEmailAddress }}</div>
            <div class="data-heading">{{ $t("students.universityEmailAddress") }}</div>
            <div>{{ currentIndividual.universityEmailAddress }}</div>
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
  import '../RecordWindow/RecordWindow.scss'
  import LoadingScreen from "../LoadingScreen/LoadingScreen.vue";
  import CommunicationWindow from "../RecordContainers/CommunicationWindow.vue";
  import PersonalDataWindow from "../RecordContainers/PersonalDataWindow.vue";

  @Options({
  components: {
    LoadingScreen,
    CommunicationWindow,
  }})


  export default class StaffMembersList extends Vue {
    public personalDataVisible: boolean = true;
    public tutorGroupVisible: boolean = false;
    public modulesVisible: boolean = false;
    public communicationVisible: boolean = false;
    public isLoading: boolean = false;
    public entity: string = "StaffMember"

    public currentStaffMember = {} as StaffMember;
    public currentIndividual = {} as Individual;
    public currentHomeAddress = {} as Address;

    getStaff(id: string) {
      this.isLoading = true;
      StaffDataService.get(id)
        .then(response => {
          this.currentStaffMember = response.data;
          console.log(response.data);
            IndividualDataService.get(this.currentStaffMember.individualId)
            .then(response => {
              this.currentIndividual = response.data;
              console.log(response.data);
            })
            .catch(e => {
              console.log(e);
            })
            console.log("this.currentStaffMember.individualId ", this.currentStaffMember.individualId);
            AddressDataService.getHome(this.currentStaffMember.individualId)
            .then(response => {
              this.currentHomeAddress = response.data[0];
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

    updateStaff() {
      if (this.currentStaffMember.staffNumber) {
        StaffDataService.update(this.currentStaffMember.staffNumber, this.currentStaffMember)
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
        this.getStaff(routeId.toString());
        // this.getIndividual(this.currentStaffMember.individualId);
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