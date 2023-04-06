<template>
  <div class="report-window">
    <div class="heading">
      <div class="title-container icon-centered">
          <div class="title">
            <mdicon :size="48" class="icon icon-centered report-icon" name="bookMultipleOutline"></mdicon>
            <div class="record-text">
              <div class="record-title">{{ $t("individuals.individuals") }}</div>
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
            >
              Search
            </button>
          </div>
          
          <RecordTable 
            :fields="individualHeaders" 
            :filteredList="individuals" 
            :entity="entity"
            >
          </RecordTable>

        </div>
    </div>
  </div>
  </template>
  
  <script lang="ts">
  import { Vue, Options } from "vue-class-component";
  import IndividualDataService from "@/services/IndividualDataService";
  import type Individual from "@/types/Individual";
  import RecordTable from "../Tables/RecordTable.vue";
  import '../ReportWindow/ReportWindow.scss'

  @Options({
  components: {
    RecordTable,
  }
})

  export default class IndividualsList extends Vue {
    public individuals: Individual[] = [];
    public currentIndividual = {} as Individual;
    public currentIndex: number = -1;
    public title: string = "";
    public individualHeaders: string[] = [];
    public entity: string = "individuals";
  
    retrieveIndividuals() {
      IndividualDataService.getAll()
        .then((response) => {
          this.individuals = response.data;
          this.individualHeaders = Object.keys(this.individuals[0]).filter((title, index) => {
            var excluded = (title == "id") || (title == "dateOfBirth") 
              || (title == "middleName") || (title == "contactPhoneNumber")
              || (title == "homePhoneNumber") || (title == "mobilePhoneNumber")
              || (title == "studentOrStaff") || (title == "personalEmailAddress")
              || (title == "createdAt") || (title == "updatedAt");
            return !excluded;
          });
        })
        .catch((e) => {
          console.log(e);
        });
    }
  
    refreshList() {
      this.retrieveIndividuals();
      this.currentIndividual = {} as Individual;
      this.currentIndex = -1;
    }
  
    setActiveIndividual(individual: Individual, index: number) {
      this.currentIndividual = individual;
      this.currentIndex = index;
    }
  
    mounted() {
      this.retrieveIndividuals();
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