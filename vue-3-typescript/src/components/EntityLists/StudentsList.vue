<template>
  <LoadingScreen v-if="isLoading"></LoadingScreen>
  <div class="report-window">
    <div class="heading">
      <div class="title-container icon-centered">
          <div class="title">
            <mdicon :size="48" class="icon icon-centered report-icon" name="accountSchool"></mdicon>
            <div class="record-text">
              <div class="record-title">{{ $t("students.students") }}</div>
            </div>
        </div>
      </div>
      <span class="icon-centered">
        <a style="color: rgb(170, 170, 170)" href="/home">
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
            :fields="filteredStudents" 
            :entity="entity"
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
  import IndividualDataService from "@/services/IndividualDataService";
  import StudentDataService from "@/services/StudentDataService";
  import type Student from "@/types/Student";
  import type Individual from "@/types/Individual";
  import RecordTable from "../Tables/RecordTable.vue";
  import '../ReportWindow/ReportWindow.scss'
  import LoadingScreen from "../WindowSetup/LoadingScreen/LoadingScreen.vue";

  @Options({
  components: {
    RecordTable,
    LoadingScreen,
  }
})

  export default class StudentsList extends Vue {
    public students: Student[] = [];
    public filteredStudents: Student[] = [];
    public currentStudent = {} as Student;
    public individuals: Individual[] = [];
    public currentIndividual = {} as Individual;
    public currentIndex: number = -1;
    public title: string = "";
    public studentHeaders: string[] = [];
    public individualHeaders: string[] = [];
    public jointHeaders: string[] = [];
    public entity: string = "students";
    public isLoading: boolean = false;
  
    retrieveStudents() {
      this.isLoading = true;
      StudentDataService.getAll()
        .then((response) => {
          this.students = response.data;
          this.filteredStudents = this.students;
          this.studentHeaders = ["studentNumber", "programme"];
          for (let student of this.students) {
            IndividualDataService.get(student.individualId)
            .then(response => {
              this.currentIndividual = response.data;
              student.individual = this.currentIndividual;
              this.individualHeaders = ["firstName", "lastName", "universityEmailAddress"];
              this.individuals = this.individuals.concat(this.currentIndividual);              
            })
            .catch(e => {
              console.log(e);
            });
          };
          this.jointHeaders = ["studentNumber", "firstName", "lastName", "programme", "universityEmailAddress"];
        })
        .catch((e) => {
          console.log(e);
        });
        this.isLoading = false;
    }
  
    refreshList() {
      this.retrieveStudents();
      this.currentStudent = {} as Student;
      this.currentIndex = -1;
    }
  
    setActiveStudent(student: Student, index: number) {
      this.currentStudent = student;
      this.currentIndex = index;
    }
  
    searchTitle() {
        this.filteredStudents = this.students.filter((student) => {
            var name = student.individual.firstName + " " + student.individual.lastName;
            var included = name.toLowerCase().includes(this.title.toLowerCase());
            return included;
        });
    }
  
    mounted() {
      this.retrieveStudents();
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