<template>
  <LoadingScreen v-if="isLoading"></LoadingScreen>
  <div class="report-window">
    <div class="heading">
      <div class="title-container icon-centered">
          <div class="title">
            <mdicon :size="48" class="icon icon-centered report-icon" name="account"></mdicon>
            <div class="record-text">
              <div class="record-title">{{ $t("staffMembers.staffMembers") }}</div>
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
            :columns="jointHeaders" 
            :fields="filteredStaffMembers" 
            :entity="'staffMembers'"
            :joinedColumns="individualHeaders"
            :joinedFields="individuals"
            >
          </RecordTable>

        </div>
    </div>
  </div>
  </template>
  
  <script lang="ts">
  import { Vue, Options } from "vue-class-component";
  import StaffDataService from "@/services/StaffDataService";
  import type StaffMember from "@/types/StaffMember";
  import IndividualDataService from "@/services/IndividualDataService";
  import type Individual from "@/types/Individual";
  import RecordTable from "../RecordsTable/RecordTable.vue";
  import LoadingScreen from "../WindowSetup/LoadingScreen/LoadingScreen.vue";
  import '../ReportWindow/ReportWindow.scss'

  @Options({
  components: {
    RecordTable,
    LoadingScreen,
  }
})

  export default class StaffMembersList extends Vue {
    public staffMembers: StaffMember[] = [];
    public filteredStaffMembers: StaffMember[] = [];
    public currentStaffMembers = {} as StaffMember;
    public individuals: Individual[] = [];
    public currentIndividual = {} as Individual;
    public currentIndex: number = -1;
    public title: string = "";
    public staffMemberHeaders: string[] = [];
    public individualHeaders: string[] = [];
    public jointHeaders: string[] = [];
    public isLoading: boolean = false;
  
    retrieveStaffMembers() {
      this.isLoading = true;
      StaffDataService.getAll()
        .then((response) => {
          this.staffMembers = response.data;
          this.filteredStaffMembers = this.staffMembers;
          this.staffMemberHeaders = ["staffNumber", "position"];
          for (let staff of this.staffMembers) {
            IndividualDataService.get(staff.individualId)
            .then(response => {
              this.currentIndividual = response.data;
              staff.individual = this.currentIndividual;
              this.individualHeaders = ["firstName", "lastName", "universityEmailAddress"];
              this.individuals = this.individuals.concat(this.currentIndividual);
              this.jointHeaders = ["staffNumber", "firstName", "lastName", "position", "universityEmailAddress"];
            })
            .catch(e => {
              console.log(e);
            });
          };
        })
        .catch((e) => {
          console.log(e);
        });
        this.isLoading = false;
    }
  
    refreshList() {
      this.retrieveStaffMembers();
      this.currentStaffMembers = {} as StaffMember;
      this.currentIndex = -1;
    }
  
    setActiveStaffMember(staffMember: StaffMember, index: number) {
      this.currentStaffMembers = staffMember;
      this.currentIndex = index;
    }
  
    searchTitle() {
        this.filteredStaffMembers = this.staffMembers.filter((staff) => {
            var name = staff.individual.firstName + " " + staff.individual.lastName;
            var included = name.toLowerCase().includes(this.title.toLowerCase());
            return included;
        });
    }
  
    mounted() {
      this.retrieveStaffMembers();
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